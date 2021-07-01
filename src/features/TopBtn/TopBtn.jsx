import React, { useEffect, useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import s from './TopBtn.module.scss'

export const TopBtn = () => {
	const [isBtnShown, setIsBtnShown] = useState(false)

	const trackScroll = () => {
		if (!isBtnShown && window.pageYOffset > 400) {
			setIsBtnShown(true)
		} else if (isBtnShown && window.pageYOffset <= 400) {
			setIsBtnShown(false)
		}
	}

	const backToTop = () => {
		if (window.pageYOffset > 0) {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}
	useEffect(() => {
		window.addEventListener('scroll', trackScroll)
		return () => {
			window.removeEventListener('scroll', trackScroll)
		}
	})
	return (
		<button className={isBtnShown ? `${s.topBtn} ${s.shown}` : `${s.topBtn}`} onClick={backToTop}>
			<ChevronUpIcon />
		</button>
	)
}
