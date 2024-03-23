import { useEffect, useState } from 'react';

import DraftCard from './DraftCard';

import './DraftCard.css'

import { useSelector, useDispatch } from 'react-redux';

import { setNewsTotalPages } from '../../Redux/Lab4/Lab4Action';

import PageInator from '../../components/PageInator';

function Lab4() {

    // сколько постов показывать на странице
    const perPage = useSelector(state => state.newsPerPage.newsPerPage)
    // какую страницу просматриваем
    const page = useSelector(state => state.newsPage.newsPage)
    
    // уже загруженные страницы
    // const loadedPages = useSelector(state => state.newsLoader.pages)

    // redux отсылатель событий
    const dispatch = useDispatch()
    
    // текущие perPage новостей, взятые из store или загруженные из REST
    const [news, setNews] = useState([])

    const bearerToken = useSelector(store => store.auth.bearerToken)

    // Функция для сохранения данных
    useEffect(() => {
        /******* REDUX не используется для страницы с черновиками, чтобы не приходилось за обновлениями следить ********/

        // список параметров: https://developer.wordpress.org/rest-api/reference/posts/
        console.log(bearerToken)
        fetch(`https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts?status=draft&per_page=${perPage}${page > 1 ? '&page=' + page : ''}`,
        {   
            Methgod: 'GET',
            mode: "cors",
            headers: {
                "Content-type" : "application/json",
                "Authorization" : 'Bearer ' + bearerToken
            },
        }).then((response) => {
            // можно получить общее число постов
            //setTotalPosts(response.headers.get('X-Wp-Total'))

            // сохраняем общее число записей
            dispatch(setNewsTotalPages(response.headers.get('X-Wp-Totalpages')))
            return response.json()
        }).then((data) => {
            
            setNews(data)

        }).catch(error => {
            alert(error)
        })
        
    }, [page, perPage, dispatch])

    return (
        <PageInator>
            
            {news.length ? news.map(item => (
                <DraftCard to="" title={item.title.rendered} date={item.date} key={item.id} id={item.id} content={item.content.rendered}>HAHA</DraftCard>
            )) : <p>Новостей нет</p>}

        </PageInator>
    )
}

export default Lab4