import { useEffect, useState } from 'react';

import './NewsCard.css'

import NewsCard from './NewsCard';

import PageInator from '../../components/PageInator';

import { useSelector, useDispatch } from 'react-redux';
import { storePage, setNewsTotalPages } from '../../Redux/Lab4/Lab4Action';

function Lab4() {

    // сколько постов показывать на странице
    const perPage = useSelector(state => state.newsPerPage.newsPerPage)
    // какую страницу просматриваем
    const page = useSelector(state => state.newsPage.newsPage)
    // уже загруженные страницы
    const loadedPages = useSelector(state => state.newsLoader.pages)
    
    // сколько всего страниц с постами
    // const totalPages = useSelector(state => state.newsTotalPages.totalPages)

    // redux отсылатель событий
    const dispatch = useDispatch()
    
    // текущие perPage новостей, взятые из store или загруженные из REST
    const [news, setNews] = useState([])

    // Функция для сохранения данных
    useEffect(() => {
        console.log(loadedPages)
        // в store хранится словарь, ключ - номера страниц, значене - массив с объектами json, представляющими запись
        // если страница загружается впервые, то обычный fetch, иначе берем из хранилища

        // если хотя бы раз был выполнен fetch, то информация об общем числе страниц должна быть в хранилище
        // также, в случае сброса хранилища новостей, будет выполнен fetch и как следствие получено актуальное количество страниц
        if (page in loadedPages) {
            console.log("PAGE EXISTS, LOADING PROM REDUX")
            setNews(loadedPages[page])
        } else {
            // список параметров: https://developer.wordpress.org/rest-api/reference/posts/
            //console.log(perPage)
            fetch(`https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts?per_page=${perPage}${page > 1 ? '&page=' + page : ''}`,
            {   
                Methgod: 'GET'
            }).then((response) => {
                // можно получить общее число постов
                //setTotalPosts(response.headers.get('X-Wp-Total'))

                // сохраняем общее число записей
                dispatch(setNewsTotalPages(response.headers.get('X-Wp-Totalpages')))
                return response.json()
            }).then((data) => {
                setNews(data)
                
                // сохраняем загруженную страницу в хранилище
                dispatch(storePage(page, data))
    
                //console.log(news)
            }).catch(error => {
                alert(error)
            })
        }
    }, [page, perPage, dispatch, loadedPages])
    
    // раньше onChange у input был : (e) => {setPerPage(e.target.value), setPage(1)}

    return (
        <PageInator>          
            {news.length ? news.map(item => (
                <NewsCard to='news/' title={item.title.rendered} date={item.date} key={item.id} id={item.id} content={item.content.rendered}>HAHA</NewsCard>
            )) : <p>Новостей нет</p>}
        </PageInator>
    )
}

export default Lab4