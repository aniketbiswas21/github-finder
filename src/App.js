import React,{ useState, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/Alert';
import About from './components/pages/About';
import User from './components/users/User';

const App = () =>{
  const[users,setUsers]=useState([ ]);
  const[user,setUser]=useState({});
  const[loading,setLoading]=useState(false);
  const[alert,setAlert]=useState(null);
  const[repos,setRepos]=useState([]);
  
  // async componentDidMount(){
  //  // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   this.setState({loading:true});
  //   const res= await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({users: res.data,
  //   loading: false})
  // }

  //Search for Users
  const searchUsers= async text =>{
   setLoading(true);
    const res= await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res);
    setUsers(res.data.items);
    setLoading(false);
  }

  //Get Single Github User
 const getUser = async (username) =>{
    setLoading(true);
    const res= await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res);
    setUser(res.data);
    setLoading(false);
  }
  const clearUsers = () =>{
   setUsers([ ]);
   setLoading(false);
  }
 const showAlert =(msg, type) =>{
    setAlert( {
      msg: msg,
      type: type
    })
    }
    setTimeout(() =>setAlert(null), 5000);
  //get user repos
  const getUserRepos = async (username) =>{
    setLoading(true);
    const res= await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created=asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res);
    setRepos(res.data);
    setLoading(false);
  } 
    return (
      <Router>
      <div className="App">
        <Navbar title="Github Finder"/>
          <div className="container">  
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props =>(
              <Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers}  showClear={users.length?true:false} setAlert={showAlert} />       
            <Users loading={loading} users={users} />
              </Fragment>
            )}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props =>(
              <User {...props} getUser={getUser} user={user} repos={repos} loading={loading} getUserRepos={getUserRepos} />
            )} />
          </Switch>
            
         </div>    
        </div>
        </Router>
    );
            }

export default App;
