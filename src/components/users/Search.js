import React,{useState,useContext} from 'react';
import githubContext from '../../context/github/githubContext';
import alertContext from '../../context/alert/alertContext'

const Search = () => {
   const contextGithub = useContext(githubContext);
   const Alertcontext = useContext(alertContext);
   const{setAlert}= Alertcontext;
    const [text, setText] =useState(' ');
     const onChange= (e) =>{
        setText(e.target.value);
    }
    const onSubmit= (e)=>{
        e.preventDefault();
        if(text===' '){
            setAlert('Please enter something','light')
        }else{
        contextGithub.searchUsers(text);
         setText(' ');
    }
}
        return (
            <div>
                <form className='form' onSubmit={onSubmit}>
                    <input type='text' name='text' placeholder='Search Users..' value={text} onChange={onChange}/>
                    <input type='submit' value='Search' className='btn btn-dark btn-block' />
                </form>
                 {contextGithub.users.length?(
                <button className='btn btn-light btn-block'onClick={contextGithub.clearUsers} >Clear</button>):null}
            </div>
        )
    }


export default Search