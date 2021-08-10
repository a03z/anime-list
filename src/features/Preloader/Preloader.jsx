import React from 'react'
import loading from './loading.svg'
import s from './preloader.module.scss'

export const Preloader = () => {
	return <img className={s.loading} src={loading} />
}
