import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../entities/routes/routes'
import s from './navbar.module.scss'

export const Navbar = () => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to={ROUTES.TOP} className={s.pageTitle}>
						Top Anime
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName={s.activeLink} to={ROUTES.GENRES} className={s.navTitle}>
						Genres
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName={s.activeLink} to={ROUTES.SEARCH} className={s.navTitle}>
						Search
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
