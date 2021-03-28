import React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    // console.log("Nav", props)
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item"><NavLink className="nav-link" to='/'>&#128054; &nbsp; Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to='/students' activeStyle={{fontWeight: "bold", color: "red"}}>Students</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to='/campuses/' activeStyle={{fontWeight: "bold", color: "red"}}>Campuses</NavLink></li>

        </ul>
    )
}

export default Nav
