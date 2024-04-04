import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom";

import FancyButton from "../lab2/FancyButton";

import './lab8.css'

import { c_unescape, pretty_date } from "../../tools"

import { DataGrid, GridToolbar } from '@mui/x-data-grid';



function Lab8() {

    // нужен для перехода к новости при клике на строку таблицы
    const navigate = useNavigate()

    // сколько постов показывать на странице
    const [perPage, setPerPage] = useState(5)
    // какую страницу просматриваем
    const [page, setPage] = useState(1)
    
    // сколько всего постов
    const [totalPosts, setTotalPosts] = useState(1)

    // сколько всего страниц с постами
    const [totalPages, setTotalPages] = useState(1)
    
    // текущие отображаемые новости
    // изначально показывает perPage новостей.
    // Используется виртуализация. при нажатии "загрузить еще" загрузит новости следующей страницы и добавит в массив с новостями
    const [news, setNews] = useState([])

//#region Объявление колнок для таблицы 
    const columns = [
        { 
            field: 'id', 
            headerName: 'ID'},
        {
            field: 'author',
            headerName: 'Автор',
        },
        {
            field: 'date',
            headerName: 'Создана',
            valueGetter: (value) => {
                return pretty_date(value)
            },
            width: 200
        },
        {
            field: 'title',
            headerName: 'Заголовок',
            valueGetter: (value) => {
                return c_unescape(value.rendered)
            },
            width: 300
        },
      ];
//#endregion

    // Функция для сохранения данных
    useEffect(() => {
        // список параметров: https://developer.wordpress.org/rest-api/reference/posts/
        //console.log(perPage)
        
        
        fetch(`https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts?per_page=${perPage}${page > 1 ? '&page=' + page : ''}`,
        {   
            Methgod: 'GET'
        }).then((response) => {
            // можно получить общее число постов
            setTotalPosts(response.headers.get('X-Wp-Total'))

            // сохраняем общее число записей
            setTotalPages(response.headers.get('X-Wp-Totalpages'))
            return response.json()
        }).then((data) => {
            console.log(data)
            // создаем ОДНОМЕРНЫЙ МАССИВ из ЗНАЧЕЙ старых массивов новостей и новых
            setNews(oldArr => [...oldArr, ...data])
            console.log("SET!")
        }).catch(error => {
            alert(error)
        })
    }, [page])

    function handleRowClick(params) {
        navigate('/labs/4/news/' + params.row.id)
    }

    function showMore() {
        if (page != totalPages) {
            setPage(page + 1)
        }
    }

    function showAll() {
        setNews([])
        setPerPage(totalPosts)
        setPage(1)
    }

    return (
        <>
            <h2>Лабораторная 8</h2>
            <div className="virtual-limit">
                <DataGrid id="DataGrid" onRowClick={handleRowClick}
                    sx={{
                        // disable cell selection style
                        '.MuiDataGrid-cell:focus': {
                            outline: 'none'
                        },
                        // pointer cursor on ALL rows
                        '& .MuiDataGrid-row:hover': {
                            cursor: 'pointer'
                        }
                    }}
                    rows={news}
                    columns={columns} 
                    slots = {
                        {
                            toolbar: GridToolbar,
                        }
                    }
                    pageSizeOptions={[5, 10]}
                    columnBufferPx={10}
                    rowBufferPx={10}
                />
                <div className="btn-container-around">
                    <FancyButton className="fbtn fbtn-success" disabled={page == totalPages} id="show-more" onClick = {showMore}>Показать еще {perPage}</FancyButton>
                    <FancyButton className="fbtn fbtn-danger" disabled={page == totalPages} id="show-all" onClick = {showAll}>Показать все</FancyButton>
                </div>
            </div>
        </>
    )
}

export default Lab8