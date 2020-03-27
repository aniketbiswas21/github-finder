import React,{ Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component{
  state={
    users:[ ],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }
  // async componentDidMount(){
  //  // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   this.setState({loading:true});
  //   const res= await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({users: res.data,
  //   loading: false})
  // }

  //Search for Users
  searchUsers= async text =>{
    this.setState({loading: true});
    const res= await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res);
    this.setState({users: res.data.items,
    loading: false})
  }

  //Get Single Github User
  getUser = async (username) =>{
    this.setState({loading: true});
    const res= await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res);
    this.setState({user: res.data,
    loading: false})
  }
  clearUsers = () =>{
    this.setState({
      users: [ ],
      loading: false
    })
  }
  setAlert =(msg, type) =>{
    this.setState({
      alert: {
        msg: msg,
        type: type
      }
    })
    setTimeout(() => { this.setState({
      alert: null
    })
      
    }, 5000);
  }
  //get user repos
  getUserRepos = async (username) =>{
    this.setState({loading: true});
    const res= await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created=asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res);
    this.setState({repos: res.data,
    loading: false})
  } 
  render(){
    return (
      <Router>
      <div className="App">
        <Navbar title="Github Finder"/>
          <div className="container">  
          <Alert alert={this.state.alert} />
          <Switch>
            <Route exact path='/' render={props =>(
              <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}  showClear={this.state.users.length?true:false} setAlert={this.setAlert} />       
            <Users loading={this.state.loading} users={this.state.users} />
              </Fragment>
            )}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props =>(
              <User {...props} getUser={this.getUser} user={this.state.user} repos={this.state.repos} loading={this.state.loading} getUserRepos={this.getUserRepos} />
            )} />
          </Switch>
            
         </div>    
        </div>
        </Router>
    );
  }
    
}

export default App;
