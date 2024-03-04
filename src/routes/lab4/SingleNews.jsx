import { useEffect, useState } from "react"
import { Outlet, useLocation, useParams, useNavigate, Link } from 'react-router-dom';

function SingleNews(props) {

    const navigate = useNavigate();
    const [newsData, setNewsData] = useState('')

    // получить параметры url
    let url_params = useParams()

    useEffect(() => {
        const fetchData = async() => {
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
        }
        fetchData()
    }, [])

    return (
        <div className="c-container">
            <button onClick={() => navigate(-1)}>Назад</button>
            <h1>{newsData.title ? newsData.title.rendered : ""}</h1>
            <p>{newsData.id} {newsData.date}</p>
            <div>
                {newsData.content ? newsData.content.rendered : ""}
            </div>
            <pre>{/*JSON.stringify(newsData, null, 2)*/}</pre>
            
        </div>
    )
}

export default SingleNews