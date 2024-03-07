import { useEffect, useState } from 'react';

import './news-card.css'

import NewsCard from './NewsCard';

import FancyButton from '../lab2/fancy_button';

function Lab4() {

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(4)
    const [news, setNews] = useState([])

    const [totalPages, setTotalPages] = useState(0)
    //const [totalPosts, setTotalPosts] = useState(0)

    function next_page() {
        setPage(page + 1)
    }

    function prev_page() {
        setPage(page - 1)
    }

    // Функция для сохранения данных
    useEffect(() => {
        
        // список параметров: https://developer.wordpress.org/rest-api/reference/posts/
        console.log(perPage)
        fetch(`https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts?per_page=${perPage}${page > 1 ? '&page=' + page : ''}`,
        {   
            Methgod: 'GET'
        }).then((response) => {
            //setTotalPosts(response.headers.get('X-Wp-Total'))
            setTotalPages(response.headers.get('X-Wp-Totalpages'))
            return response.json()
        }).then((data) => {
            setNews(data)
            //console.log(news)
        }).catch(error => {
            alert(error)
        })
        
    }, [page, perPage])
    
    return (
        <div id='news-cards-container'>
            <label htmlFor="records_per_page_input">Записей на странице: </label>
            <input type="number" id='records_per_page_input' onChange={(e) => {setPerPage(e.target.value), setPage(1)}}  min="1" max="10" value={perPage}></input>
            {news.length ? news.map(item => (
                <NewsCard title={item.title.rendered} date={item.date} key={item.id} id={item.id} content={item.content.rendered}>HAHA</NewsCard>
            )) : <p>Новостей нет</p>}
            <pre>{/*JSON.stringify( news, null, 2 )*/}</pre>
            
            <div className='pagination-container'>
                <FancyButton className='fbtn' onClick={() => setPage(1)}>1</FancyButton>
                <FancyButton className='fbtn' disabled={page == 1 ? true : false} onClick={prev_page}>предыдущая</FancyButton>
                <p>Страница {page} из {totalPages}</p>
                <FancyButton className='fbtn' disabled={page == totalPages ? true : false} onClick={next_page}>следующая</FancyButton>
                <FancyButton className='fbtn' onClick={() => setPage(totalPages)}>{totalPages}</FancyButton>
            </div>
        </div>
    )
}

export default Lab4