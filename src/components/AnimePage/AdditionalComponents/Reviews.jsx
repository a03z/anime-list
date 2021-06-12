import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { $exactAnimeReviews } from '../../../entities/store/effector'
import s from './reviews.module.scss'

export const Reviews = () => {
	const exactAnimeReviews = useStore($exactAnimeReviews)
	const [shownText, setShownText] = useState([])
	const [isReviewsShown, setIsReviewsShown] = useState(false)
	return (
		<div className={isReviewsShown ? `${s.reviewsContainer} ${s.shown}` : `${s.reviewsContainer} ${s.hidden}`}>
			{isReviewsShown ? (
				<span
					onClick={() => {
						setIsReviewsShown(false)
					}}
					className={s.showMore}>
					Hide
				</span>
			) : (
				<span
					onClick={() => {
						setIsReviewsShown(true)
						window.scrollTo({
							top: 400,
							behavior: 'instant',
						})
					}}
					className={s.showMore}>
					Show more
				</span>
			)}
			<h2 style={{ color: 'white', fontSize: '24px' }}>Reviews</h2>
			{exactAnimeReviews.map(r => {
				return (
					<div className={s.reviewCard} key={r.mal_id}>
						<div className={s.info}>
							<a className={s.avatar} target='_blank' rel='noreferrer' href={r.reviewer.url}>
								<span>{r.reviewer.username}</span>
								<div className={s.imgContainer}>
									<img src={r.reviewer.image_url} alt='' />
								</div>
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

						{shownText.some(t => t === r.mal_id) ? (
							<>
								<p className={s.shownTextBlock}>{r.content}</p>
								<button
									onClick={() => {
										const index = shownText.indexOf(r.mal_id)
										if (index > -1) {
											shownText.splice(index, 1)
										}
										if (index > -1) {
											setShownText(shownText.splice(index, 1))
										}
									}}>
									Hide
								</button>
							</>
						) : (
							<>
								<p className={s.hiddenTextBlock}>{r.content}</p>
								<button
									onClick={() => {
										setShownText([...shownText, r.mal_id])
										console.log(shownText)
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
