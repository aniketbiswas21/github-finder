import React from 'react'
// import PropTypes from 'proptypes';

const Navbar= (props) => {
        return (
            <nav className="navbar bg-primary">  
                <h1>
                <i className="fab fa-github"/>
                 {props.title}</h1>
            </nav>
        )
}
//  Navbar.propTypes ={
//         title:PropTypes.string.isRequired
//     };

export default Navbar
