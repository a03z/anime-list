import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './navbar.module.scss'

export const Navbar = () => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to='/' className={s.pageTitle}>
						Top Anime
					</NavLink>
				</li>
				<li>
					<NavLink to='/genres' className={s.navTitle}>
						Genres
					</NavLink>
				</li>
				<li>
					<NavLink to='/search' className={s.navTitle}>
						Search
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
