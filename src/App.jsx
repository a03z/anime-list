import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import '../node_modules/reseter.css/css/reseter.min.css'
import './App.css'
import { createApi, createStore } from 'effector'
import axios from 'axios'
import { List } from './components/List/List'
import { Pagination } from './components/Pagination/Pagination'
import { Sort } from './components/Sort/Sort'
import { Genres } from './components/Genres/Genres'
import { Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'

function App() {
    const [list, setList] = useState([])
    let [page, setPage] = useState(1)
    let [sortType, setSortType] = useState('')
    let [genre, setGenre] = useState('')
    let [requestType, setRequestType] = useState('top')

    const getAnimeList = async (subtype, topOrGenre, genreId) => {
        setSortType(subtype)
        setRequestType(topOrGenre)
        setGenre(genreId)
        let genre = genreId ? `/${genreId}` : ''
        const res = await axios.get(
            `https://api.jikan.moe/v3/${requestType}/anime${genre}/${page}${subtype}`
        )
        let resList = res.data.top ? res.data.top : res.data.anime
        setList(resList)
    }

    const scrollToTop = () => {
        if (window.pageYOffset > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const nextPage = () => {
        setPage(++page)
        getAnimeList(sortType, requestType, genre)
        scrollToTop()
    }

    const prevPage = () => {
        setPage(--page)
        getAnimeList(sortType, requestType, genre)
        scrollToTop()
    }

    useEffect(() => {
        getAnimeList(sortType, requestType, genre)
    }, [])

    return (
        <div className="App">
            <Navbar />

            <Sort setRequestType={setRequestType} getAnimeList={getAnimeList} />
            <Route
                path="/genres"
                render={() => (
                    <Genres
                        setRequestType={setRequestType}
                        list={list}
                        setList={setList}
                        getAnimeList={getAnimeList}
                    />
                )}
            />

            <List list={list} prevPage={prevPage} nextPage={nextPage} />
        </div>
    )
}

export default App
