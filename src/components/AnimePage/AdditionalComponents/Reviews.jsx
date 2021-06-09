import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { $exactAnimeReviews } from '../../../entities/store/effector'
import s from './reviews.module.scss'

export const Reviews = () => {
	const exactAnimeReviews = useStore($exactAnimeReviews)
	const [shownText, setShownText] = useState(-1)
	return (
		<div className={s.reviewsContainer}>
			<h2 style={{ color: 'white', fontSize: '24px' }}>Reviews</h2>
			{exactAnimeReviews.map(r => {
				return (
					<div className={s.reviewCard} key={r.mal_id}>
						<div className={s.info}>
							<a className={s.avatar} target='_blank' rel='noreferrer' href={r.reviewer.url}>
								<span>{r.reviewer.username}</span>
								<img src={r.reviewer.image_url} alt='' />
							</a>
							<div className={s.scores}>
								<span>Scores:</span>
								<span>Overall: {r.reviewer.scores.overall}/10</span>
								<span>Story: {r.reviewer.scores.story}/10</span>
								<span>Animation: {r.reviewer.scores.animation}/10</span>
								<span>Sound: {r.reviewer.scores.sound}/10</span>
								<span>Character: {r.reviewer.scores.character}/10</span>
								<span>Enjoyment:{r.reviewer.scores.enjoyment}/10</span>
							</div>
						</div>

						{shownText === r.mal_id ? (
							<>
								<p className={s.shownTextBlock}>{`${r.content}`}</p>
								<button
									onClick={() => {
										setShownText(-1)
									}}>
									Hide
								</button>
							</>
						) : (
							<>
								<p className={s.hiddenTextBlock}>{`${r.content}`}</p>
								<button
									onClick={() => {
										setShownText(r.mal_id)
									}}>
									Show more...
								</button>
							</>
						)}
					</div>
				)
			})}
		</div>
	)
}
