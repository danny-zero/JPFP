import React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    console.log("Nav", props)
    return (
        <div id='navbar' className='row'>
            <NavLink to='/students' activeStyle={{fontWeight: "bold", color: "red"}}>Students</NavLink>
            <NavLink to='/campuses' activeStyle={{fontWeight: "bold", color: "red"}}>Campuses</NavLink>
        </div>
    )
}

export default Nav
