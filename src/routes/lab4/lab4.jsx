import React, { useEffect, useState } from 'react';
function Lab4() {
    
    const [news, setNews] = useState('')
    // Функция для сохранения данных
    useEffect(() => {
        const getApiData = async () => {
            const response = await fetch(
            "https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts"
            ).then((response) => response.json());
        
            // Обновим состояние
            setNews(response);
    
        };
        getApiData()
        console.log(news)
    }, [])
    
    return (
        <pre>{JSON.stringify( news, null, 2 )}</pre>
    )
}

export default Lab4