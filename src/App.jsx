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

    const getAnimeList = async (subtype) => {
        setSortType(subtype)
        const res = await axios.get(
            `https://api.jikan.moe/v3/top/anime/${page}${subtype}`
        )
        setList(res.data.top)
    }

    const nextPage = () => {
        setPage(page++)
        getAnimeList(sortType)
        if (window.pageYOffset > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const prevPage = () => {
        setPage(page--)
        getAnimeList(sortType)
        if (window.pageYOffset > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        getAnimeList('')
    }, [])

    return (
        <div className="App">
            <Navbar />
            <h1 className="page-title">Top Anime</h1>
            <Sort getAnimeList={getAnimeList} />
            <Route path="/genres" render={() => <Genres />} />

            <List list={list} />
            <Pagination prevPage={prevPage} nextPage={nextPage} />
        </div>
    )
}

export default App
