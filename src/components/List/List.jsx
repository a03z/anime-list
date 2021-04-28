import React from 'react'
import './list.css'

export let List = (props) => (
    <div className="container">
        {props.list.map((el) => (
            <a target="_blank" href={el.url} key={el.mal_id} className="card">
                <h2>{el.title}</h2>

                <img src={el.image_url} alt={`${el.title} image`} />
                <div className="card-info">
                    <span className="card-score">Rating: {el.score}</span>
                </div>
            </a>
        ))}
    </div>
)
