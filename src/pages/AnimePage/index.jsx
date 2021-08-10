import React, { useEffect } from 'react'
import s from './animepage.module.scss'
import { useStore } from 'effector-react'
import { CheckIcon, SpeakerphoneIcon, StopIcon } from '@heroicons/react/solid'
import { Reviews } from './AdditionalComponents/Reviews'
import { useParams } from 'react-router-dom'
import {
	setAnimeId,
	$exactAnime,
	setTitle,
} from '../../entities/store/effector'

export const AnimePage = () => {
	const { animeId } = useParams()
	useEffect(() => {
		setAnimeId(animeId)
	}, [])
	const exactAnime = useStore($exactAnime)

	useEffect(() => {
		setTitle(exactAnime.title)
	}, [])

	return (
		<div className={s.card}>
			<div className={s.img}>
				<img src={exactAnime.image_url} alt='anime image' />
				<div className={s.alternativeTitles}>
					<p>
						<span>English:</span> {exactAnime.title_english}
					</p>
					<p>
						<span>Japanese:</span> {exactAnime.title_japanese}
					</p>
				</div>
			</div>
			<div className={s.description}>
				<a
					href={exactAnime.url}
					target='_blank'
					rel='noreferrer'
					className={s.title}>
					{exactAnime.title}
				</a>
				<div className={s.subtitles}>
					<p className={s.subtitle}>{exactAnime.rating}</p>
					<p className={s.subtitle}>{exactAnime.aired?.string}</p>
				</div>
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
						{exactAnime.status === 'Not yet aired' ? (
							<span>Episodes: Not yet aired</span>
						) : (
							<span>Episodes : {exactAnime.episodes}</span>
						)}
						{exactAnime.status === 'Not yet aired' ? (
							<span>Score: Not yet aired</span>
						) : (
							<span>Score : {exactAnime.score}</span>
						)}
						{exactAnime.status === 'Not yet aired' ? (
							<span>Scored by: Not yet aired</span>
						) : (
							<span>Score : {exactAnime.scored_by}</span>
						)}
						{exactAnime.status === 'Not yet aired' ? (
							<span>Rank: Not yet aired</span>
						) : (
							<span>Rank: {exactAnime.rank}</span>
						)}
						<span>Duration: {exactAnime.duration}</span>
						<span>Popularity: {exactAnime.popularity}</span>
						<span>Premiered: {exactAnime.premiered}</span>
						<span>Members: {exactAnime.members}</span>
						<span>Favorites: {exactAnime.favorites}</span>
					</div>
				</div>
				<div className={s.synopsis}>
					<h3>Synopsis</h3>
					<p>{exactAnime.synopsis}</p>
				</div>

				<Reviews reviews={exactAnime.reviews} />
			</div>
		</div>
	)
}
