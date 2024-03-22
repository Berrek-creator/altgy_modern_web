import { useEffect, useState } from 'react';

import DraftCard from './DraftCard';

import './DraftCard.css'

// кнопочка
import FancyButton from '../lab2/FancyButton';

import { useSelector, useDispatch } from 'react-redux';

import GoBackBtn from '../../components/GoBackBtn';

import { changeNewsPerPage, changeNewsPage, storePage, setNewsTotalPages } from '../../Redux/Lab4/Lab4Action';

function Lab4() {

    useSelector(state => {
        return state.newsPage.newsPage
    })
    // сколько постов показывать на странице
    const perPage = useSelector(state => state.newsPerPage.newsPerPage)
    // какую страницу просматриваем
    const page = useSelector(state => state.newsPage.newsPage)
    // уже загруженные страницы
    const loadedPages = useSelector(state => state.newsLoader.pages)
    // сколько всего страниц с постами
    const totalPages = useSelector(state => state.newsTotalPages.totalPages)

    // redux отсылатель событий
    const dispatch = useDispatch()
    
    // текущие perPage новостей, взятые из store или загруженные из REST
    const [news, setNews] = useState([])

    // сколько всего страниц

    function changePage(e) {
        let page_val = e.target.value
        if (!page_val) {
            return
        }
        if (page_val > totalPages) {
            page_val = totalPages
        } else if (page_val < 1) {
            page_val = 1
        }
        dispatch(changeNewsPage(page_val))
    }

    const bearerToken = useSelector(store => store.auth.bearerToken)

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
        <div id='news-cards-container'>
            <GoBackBtn></GoBackBtn>
            <div className='left-right-panel'>
                <div>
                    <label htmlFor="records_per_page_input">Записей на странице: </label>
                    <input type="number" id='records_per_page_input' onChange={(e) => { dispatch(changeNewsPerPage(e.target.value)); dispatch(changeNewsPage(1)); dispatch({type: "LOADED_PAGES_CLEAR"}) }}  min="1" max="10" value={perPage}></input>
                </div>
                <div>
                    <FancyButton className="fbtn fbtn-success fb" onClick={() => {dispatch(changeNewsPage(1)); dispatch({type: "LOADED_PAGES_CLEAR"})}}>Обновить!</FancyButton>
                </div>
            </div>
            {news.length ? news.map(item => (
                <DraftCard to="" title={item.title.rendered} date={item.date} key={item.id} id={item.id} content={item.content.rendered}>HAHA</DraftCard>
            )) : <p>Новостей нет</p>}
            <pre>{/*JSON.stringify( news, null, 2 )*/}</pre>
            
            <div className='pagination-container'>
                <FancyButton className='fbtn' onClick={() => dispatch(changeNewsPage(1))}>1</FancyButton>
                <FancyButton className='fbtn' disabled={page <= 1 ? true : false} onClick={() => dispatch({type : "PREV_PAGE"})}>предыдущая</FancyButton>

                <p>Страница <input type="number" value={page} min="1" max={totalPages} onChange={changePage} /> из {totalPages}</p>
                
                <FancyButton className='fbtn' disabled={page >= totalPages ? true : false} onClick={() => dispatch({type : "NEXT_PAGE"})}>следующая</FancyButton>
                <FancyButton className='fbtn' onClick={() => dispatch(changeNewsPage(totalPages))}>{totalPages}</FancyButton>
            </div>
        </div>
    )
}

export default Lab4