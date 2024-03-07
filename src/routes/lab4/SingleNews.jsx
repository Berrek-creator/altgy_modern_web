import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';

function SingleNews() {

    const navigate = useNavigate();
    const [newsData, setNewsData] = useState('')

    // получить параметры url
    let url_params = useParams()

    useEffect(() => {
        
        console.log(url_params.id)
        fetch('https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts/531',
        {   
            Methgod: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setNewsData(data);
        }).catch(error => {
            alert(error);
        })
        
    }, [url_params.id])

    return (
        <div className="c-container">
            <button onClick={() => navigate(-1)}>Назад</button>
            <h1>{newsData.title?.rendered}</h1>
            <p>{newsData.id} {newsData.date}</p>
            <div>
                {newsData.content?.rendered}
            </div>
            <pre>{/*JSON.stringify(newsData, null, 2)*/}</pre>
            
        </div>
    )
}

export default SingleNews