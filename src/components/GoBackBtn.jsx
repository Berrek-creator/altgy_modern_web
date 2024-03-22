import { useNavigate } from 'react-router-dom';

function GoBackBtn(props) {
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate(-1)}>Назад</button>
    )
}

export default GoBackBtn