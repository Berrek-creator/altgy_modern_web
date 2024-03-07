import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { pretty_date, c_unescape } from "../../tools";
import "./SingleNews.css"

function SingleNews() {

    const navigate = useNavigate();
    const [newsData, setNewsData] = useState('')

    // получить параметры url
    let url_params = useParams()

    useEffect(() => {
        
        console.log(url_params.id)
        fetch('https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts/' + url_params.id,
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
        <div id="single-news" className="c-container">
            <button onClick={() => navigate(-1)}>Назад</button>
            <h1 dangerouslySetInnerHTML={{__html: c_unescape(newsData.title?.rendered)}}></h1>
            
            <p>{pretty_date(newsData?.date)}</p>

            <div dangerouslySetInnerHTML={{__html: newsData.content?.rendered}}></div>
            <pre>{/*JSON.stringify(newsData, null, 2)*/}</pre>
        </div>
    )
}

export default SingleNews