import React from 'react'
import { Outlet } from 'react-router-dom'
import { List } from '../../pages/List'

export const ListLayout = () => {
	return (
		<>
			<Outlet />
			<List />
		</>
	)
}
