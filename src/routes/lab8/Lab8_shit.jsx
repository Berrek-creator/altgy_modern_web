import React from 'react'

import { useState, useEffect, useMemo, useRef } from 'react'

import { c_unescape, pretty_date } from '../../tools'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'author',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Автор</span>,
    footer: info => info.column.id,
  }),
]

//This is a dynamic row height example, which is more complicated, but allows for a more realistic table.
//See https://tanstack.com/virtual/v3/docs/examples/react/table for a simpler fixed row height example.
function Lab8() {
  
  // сколько постов показывать на странице
  const [perPage, setPerPage] = useState(10)
  // какую страницу просматриваем
  const [page, setPage] = useState(1)
  
  // сколько всего постов
  const [totalPosts, setTotalPosts] = useState(1)

  // сколько всего страниц с постами
  const [totalPages, setTotalPages] = useState(1)
  
  // текущие perPage новостей, взятые из store или загруженные из REST
  const [news, setNews] = useState([])

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
        setNews(data)
        console.log("SET!")
    }).catch(error => {
        alert(error)
    })
  }, [])
  
  const table_data = news ?? []

  const table = useReactTable({
    table_data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  if (news.length == 0) {
    return (
      <p>новостей нет</p>
    )
  }
  
  console.log(table.getRowModel())
  return (
    
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />

    </div>
  )
}

export default Lab8