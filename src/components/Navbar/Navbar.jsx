import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/genres">Genres</NavLink>
                </li>
                <li>
                    <NavLink to="/">Main</NavLink>
                </li>
            </ul>
        </nav>
    )
}
