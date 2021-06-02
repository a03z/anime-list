/* eslint-disable react/prop-types */
import React from 'react'
import s from './animepage.module.scss'
import { useStore } from 'effector-react'
import { Redirect } from 'react-router'
import { $exactAnime } from '../../store/effector'
import { CheckIcon, SpeakerphoneIcon, StopIcon } from '@heroicons/react/solid'

export const AnimePage = () => {
	let exactAnime = useStore($exactAnime)

	if (exactAnime === {}) {
		return <Redirect to='/' />
	} else {
		return (
			<div className={s.card}>
				<img src={exactAnime.image_url} alt='anime image' />
				<div className={s.description}>
					<a href={exactAnime.url} target='_blank' rel='noreferrer' className={s.title}>
						{exactAnime.title}
					</a>
					<p className={s.subtitle}>{exactAnime.rating}</p>
					{exactAnime.status === 'Finished Airing' ? (
						<div className={`${s.statusBlock} ${s.done}`}>
							<CheckIcon className={s.statusIcon} />
							<p className={s.status}>{exactAnime.status}</p>
						</div>
					) : exactAnime.status === 'Not yet aired' ? (
						<div className={`${s.statusBlock} ${s.upcoming}`}>
							<StopIcon className={s.statusIcon} />
							<p className={s.status}>{exactAnime.status}</p>
						</div>
					) : exactAnime.status === 'Currently Airing' ? (
						<div className={`${s.statusBlock} ${s.airing}`}>
							<SpeakerphoneIcon className={s.statusIcon} />
							<p className={s.status}>{exactAnime.status}</p>
						</div>
					) : (
						''
					)}
					<div className={s.infoContainer}>
						<div className={s.info}>
							{exactAnime.status === 'Not yet aired' ? <span>Episodes: Not yet aired</span> : <span>Episodes : {exactAnime.episodes}</span>}
							{exactAnime.status === 'Not yet aired' ? <span>Score: Not yet aired</span> : <span>Score : {exactAnime.score}</span>}
							{exactAnime.status === 'Not yet aired' ? <span>Scored by: Not yet aired</span> : <span>Score : {exactAnime.scored_by}</span>}
							{exactAnime.status === 'Not yet aired' ? <span>Rank: Not yet aired</span> : <span>Rank: {exactAnime.rank}</span>}
							<span>Duration: {exactAnime.duration}</span>
							<span>Popularity: {exactAnime.popularity}</span>
							<span>Premiered: {exactAnime.premiered}</span>
							<span>Members: {exactAnime.members}</span>
							<span>Favorites: {exactAnime.favorites}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
