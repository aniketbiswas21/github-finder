import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import githubContext from '../../context/github/githubContext';

const Users= () =>{
    const contextGithub = useContext(githubContext);
    if(contextGithub.loading===true){
       return( <Spinner/>)
    }
    else{
    return(
        <div style={userStyle}>
            {contextGithub.users.map(user=>{
                return(
                    <UserItem key={user.id} user={user}/>
                )
            })}
        </div>
    )
}
}
const userStyle={
    display: 'grid',
    gridTemplateColumns:'repeat(3, 1fr)',
    gridGap: '1rem'
}
export default Users;