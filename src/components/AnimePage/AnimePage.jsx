import React, { useEffect } from 'react'
import s from './animepage.module.scss'
import { useStore } from 'effector-react'
import { useHistory } from 'react-router'
import { $exactAnime, setAnimeId } from '../../entities/store/effector'
import { CheckIcon, SpeakerphoneIcon, StopIcon } from '@heroicons/react/solid'
import { Reviews } from './AdditionalComponents/Reviews'

export const AnimePage = () => {
	const history = useHistory()
	useEffect(() => {
		setAnimeId(history.location.pathname.split('/')[2])
	}, [])
	const exactAnime = useStore($exactAnime)

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
				<a href={exactAnime.url} target='_blank' rel='noreferrer' className={s.title}>
					{exactAnime.title}
				</a>
				<div className={s.subtitles}>
					<p className={s.subtitle}>{exactAnime.rating}</p>
					<p className={s.subtitle}>{exactAnime.aired.string}</p>
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
				<div className={s.synopsis}>
					<h3>Synopsis</h3>
					<p>{exactAnime.synopsis}</p>
				</div>
				<div className={s.related}>
					{exactAnime.related['Adaptation'] && (
						<div className={s.relatedEl}>
							<h4>Adaptation:</h4>
							{exactAnime.related['Adaptation'].map(el => {
								return (
									<a target='_blank' rel='noreferrer' href={el.url} key={el.mal_id}>
										{el.name}
									</a>
								)
							})}
						</div>
					)}
					{exactAnime.related['Alternative setting'] && (
						<div className={s.relatedEl}>
							<h4>Alternative setting:</h4>
							{exactAnime.related['Alternative setting'].map(el => {
								return (
									<a target='_blank' rel='noreferrer' href={el.url} key={el.mal_id}>
										{el.name}
									</a>
								)
							})}
						</div>
					)}
					{exactAnime.related['Sequel'] && (
						<div className={s.relatedEl}>
							<h4>Sequel:</h4>
							{exactAnime.related['Sequel'].map(el => {
								return (
									<a target='_blank' rel='noreferrer' href={el.url} key={el.mal_id}>
										{el.name}
									</a>
								)
							})}
						</div>
					)}
					{exactAnime.related['Other'] && (
						<div className={s.relatedEl}>
							<h4>Other:</h4>
							{exactAnime.related['Other'].map(el => {
								return (
									<a target='_blank' rel='noreferrer' href={el.url} key={el.mal_id}>
										{el.name}
									</a>
								)
							})}
						</div>
					)}
					{exactAnime.related['Alternative version'] && (
						<div className={s.relatedEl}>
							<h4>Alternative version:</h4>
							{exactAnime.related['Alternative version'].map(el => {
								return (
									<a target='_blank' rel='noreferrer' href={el.url} key={el.mal_id}>
										{el.name}
									</a>
								)
							})}
						</div>
					)}
					{exactAnime.related['Summary'] && (
						<div className={s.relatedEl}>
							<h4>Summary:</h4>
							{exactAnime.related['Summary'].map(el => {
								return (
									<a target='_blank' rel='noreferrer' href={el.url} key={el.mal_id}>
										{el.name}
									</a>
								)
							})}
						</div>
					)}
					{exactAnime.related['Spin-off'] && (
						<div className={s.relatedEl}>
							<h4>Spin-off:</h4>
							{exactAnime.related['Spin-off'].map(el => {
								return (
									<a target='_blank' rel='noreferrer' href={el.url} key={el.mal_id}>
										{el.name}
									</a>
								)
							})}
						</div>
					)}
				</div>
				<Reviews reviews={exactAnime.reviews} />
			</div>
		</div>
	)
}
