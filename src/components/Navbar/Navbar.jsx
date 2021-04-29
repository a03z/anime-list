import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" className="page-title">
                        Top Anime
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/genres" className="genres-title">
                        Genres
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
