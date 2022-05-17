import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../entities/routes/routes'
import { titleChanged } from '../../entities/store/effector'
import s from './navbar.module.scss'

export const Navbar = ({ toggleSearch }) => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink
						onClick={() => {
							titleChanged('Anime List | by a03z')
						}}
						to={ROUTES.MAIN_PAGE}
						className={({ isActive }) =>
							isActive
								? `${s.pageTitle} ${s.activeLink}`
								: s.pageTitle
						}>
						Top Anime
					</NavLink>
				</li>
				<li>
					<NavLink
						to={ROUTES.GENRES}
						className={({ isActive }) =>
							isActive
								? `${s.navTitle} ${s.activeLink}`
								: s.navTitle
						}>
						Genres
					</NavLink>
				</li>
				<li>
					<button
						onClick={toggleSearch}
						className={`btn ${s.navTitle} ${s.searchBtn}`}>
						Search
					</button>
				</li>
			</ul>
		</nav>
	)
}
