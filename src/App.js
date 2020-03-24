import React,{ Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/Alert';

class App extends Component{
  state={
    users:[ ],
    loading: false,
    alert: null
  }
  // async componentDidMount(){
  //  // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   this.setState({loading:true});
  //   const res= await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({users: res.data,
  //   loading: false})
  // }
  searchUsers= async text =>{
    this.setState({loading: true});
    const res= await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res);
    this.setState({users: res.data.items,
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
  render(){
    return (
      <div className="App">
        <Navbar title="Github Finder"/>
          <div className="container">  
          <Alert alert={this.state.alert} />
            <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}  showClear={this.state.users.length?true:false} setAlert={this.setAlert} />       
            <Users loading={this.state.loading} users={this.state.users} />
         </div>    
        </div>
    );
  }
    
}

export default App;
