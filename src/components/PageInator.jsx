import { useEffect } from 'react';
// кнопочка
import FancyButton from '../routes/lab2/FancyButton';

import { useSelector, useDispatch } from 'react-redux';

import GoBackBtn from './GoBackBtn';

import { changeNewsPerPage, changeNewsPage} from '../Redux/Lab4/Lab4Action';

import { 
    FaSyncAlt,
    FaChevronCircleRight,
    FaChevronCircleLeft

} from 'react-icons/fa';

function PageInator(props) {
    // сколько постов показывать на странице
    const perPage = useSelector(state => state.newsPerPage.newsPerPage)
    // какую страницу просматриваем
    const page = useSelector(state => state.newsPage.newsPage)
    
    // сколько всего страниц с постами
    const totalPages = useSelector(state => state.newsTotalPages.totalPages)

    // redux отсылатель событий
    const dispatch = useDispatch()

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

    // Функция для сохранения данных
    useEffect(() => {

    }, [])

    return (
        <div id='news-cards-container'>
            <GoBackBtn></GoBackBtn>
            <div className='left-right-panel'>
                <div>
                    <label htmlFor="records_per_page_input">Записей на странице: </label>
                    <input type="number" id='records_per_page_input' onChange={(e) => { dispatch(changeNewsPerPage(e.target.value)); dispatch(changeNewsPage(1)); dispatch({type: "LOADED_PAGES_CLEAR"}) }}  min="1" max="10" value={perPage}></input>
                </div>
                <div>
                    <FancyButton className="fbtn fbtn-success fb" onClick={() => {dispatch(changeNewsPage(1)); dispatch({type: "LOADED_PAGES_CLEAR"})}}><FaSyncAlt></FaSyncAlt></FancyButton>
                </div>
            </div>

            {props.children}
            
            <div className='pagination-container'>
                <FancyButton className='fbtn' onClick={() => dispatch(changeNewsPage(1))}>1</FancyButton>
                <FancyButton className='fbtn' disabled={page <= 1 ? true : false} onClick={() => dispatch({type : "PREV_PAGE"})}><FaChevronCircleLeft ></FaChevronCircleLeft></FancyButton>

                <p><input type="number" value={page} min="1" max={totalPages} onChange={changePage} /> из {totalPages}</p>
                
                <FancyButton className='fbtn' disabled={page >= totalPages ? true : false} onClick={() => dispatch({type : "NEXT_PAGE"})}><FaChevronCircleRight></FaChevronCircleRight></FancyButton>
                <FancyButton className='fbtn' onClick={() => dispatch(changeNewsPage(totalPages))}>{totalPages}</FancyButton>
            </div>
        </div>
    )
}

export default PageInator