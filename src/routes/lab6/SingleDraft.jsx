import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { pretty_date, c_unescape } from "../../tools";
import "./SingleDraft.css"

import GoBackBtn from "../../components/GoBackBtn";

import { useSelector } from "react-redux";

function SingleDraft() {

    const navigate = useNavigate();
    const [newsData, setNewsData] = useState('')

    // получить параметры url
    let url_params = useParams()

    const bearerToken = useSelector(store => store.auth.bearerToken)

    useEffect(() => {
        
        console.log(url_params.id)
        fetch('https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts/' + url_params.id,
        {   
            Methgod: 'GET',
            headers: {
                "Content-type" : "application/json",
                "Authorization" : 'Bearer ' + bearerToken
            },
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
            <GoBackBtn></GoBackBtn>
            <h1 dangerouslySetInnerHTML={{__html: c_unescape(newsData.title?.rendered)}}></h1>
            
            <p>{pretty_date(newsData?.date)}</p>

            <div dangerouslySetInnerHTML={{__html: newsData.content?.rendered}}></div>
            <pre>{/*JSON.stringify(newsData, null, 2)*/}</pre>
        </div>
    )
}

export default SingleDraft