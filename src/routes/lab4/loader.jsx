import React, { useState } from 'react';
function Loader() {
    
    const [news, setNews] = useState('')
    // Функция для сохранения данных
    const getApiData = async () => {
        const response = await fetch(
        "https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts"
        ).then((response) => response.json());
    
        // Обновим состояние
        setNews(response);

        console.log(news)
    };

    getApiData();
    return (
        <pre>{JSON.stringify( news, null, 2 )}</pre>
    )
}

export default Loader