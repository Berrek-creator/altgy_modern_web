import { useEffect, useState } from 'react';

import DraftCard from './DraftCard';

// import { Box, CircularProgress } from '@mui/material';

import Loader from '../../components/Loader';

import './DraftCard.css'

import { useSelector, useDispatch } from 'react-redux';

import { setNewsTotalPages } from '../../Redux/Lab4/Lab4Action';

import PageInator from '../../components/PageInator';

import { useGetPagedDraftsQuery } from '../../Redux/services/gymnews';

import { wp_drafts_api } from '../../Redux/services/gymnews';

function Lab4() {

    // сколько постов показывать на странице
    const perPage = useSelector(state => state.newsPerPage.newsPerPage)
    // какую страницу просматриваем
    const page = useSelector(state => state.newsPage.newsPage)

    const { data, error, isLoading } = useGetPagedDraftsQuery(
        {
            perPage: perPage,
            page: page
        },
        {
            pollingInterval: 30000, keepUnusedDataFor: 120
        }
    )


    // Вызов endpointa напрямую

    //const { data, error, isLoading } = wp_drafts_api.endpoints.getDrafts.useQuery(
    //    {
    //        perPage: perPage,
    //        page: page
    //    },
    //    {
    //        pollingInterval: 30000, keepUnusedDataFor: 120
    //    })

    console.log(data, error, isLoading)

    // уже загруженные страницы
    // const loadedPages = useSelector(state => state.newsLoader.pages)

    // redux отсылатель событий
    const dispatch = useDispatch()

    // текущие perPage новостей, взятые из store или загруженные из REST
    // const [news, setNews] = useState([])

    // const bearerToken = useSelector(store => store.auth.bearerToken)
    // const is_auth = useSelector(store => store.auth.is_auth)

    if (isLoading) {
        return (
            <Loader />
        )
    }
    if (error) {
        return (
            <p>Что-то пошло не так</p>
        )
    }
    if (data) {
        // сохраняем общее число записей
        dispatch(setNewsTotalPages(data.totalPages))

        console.log(perPage, page, data.data)

        // return (
        //     <Loader></Loader>
        // )

        return (
            <PageInator>

                {data.data.length ? data.data.map(item => (
                    <DraftCard to="" title={item.title.rendered} date={item.date} key={item.id} id={item.id} content={item.content.rendered}>HAHA</DraftCard>
                )) : <p>Новостей нет</p>}

            </PageInator>
        )
    }
    return null
}

export default Lab4