import { Formik, Form } from 'formik'

// валидация при помощи схемы
import * as Yup from 'yup'

import { InputField, TextArea } from '../../components/FormFields'

import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useEffect, useState } from "react"
import GoBackBtn from '../../components/GoBackBtn';
//import { useNavigate } from 'react-router-dom';

function CreateEditPost(props) {
    const location = useLocation()

    console.log("passed", location.state)
    //let navigate = useNavigate()

    const bearerToken = useSelector(store => store.auth.bearerToken)

    // схема валидации
    const FormSchema = Yup.object().shape({
        title: Yup.string().min(5, 'Короткое название').max(50, 'Слишком длинный заголовок').required("Введите заголовок"),
        content: Yup.string().min(5, 'Мало контента').required("Введите контент записи"),
    })

    useEffect(() => {
        //// мы не авторизованы, то нужно авторизоваться
        //is_bearer_valid(bearerToken).then((is_valid) => {
        //    if (!is_valid){
        //        navigate('/auth')
        //    }
        //})
    }, [bearerToken])

    const [id, setId] = useState(location.state?.data?.id)
    const [method, setMethod] = useState('POST')

    function create_draft(values, helpers) {
        
        let path = "https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts/"

        // если 
        if (id) {
            path += id
            setMethod("PUT")
        }
        let data = JSON.stringify(values);
        console.log(data, path)

        fetch(path, {
            method: method,
            mode: "cors",
            headers: {
                "Content-type" : "application/json",
                "Authorization" : 'Bearer ' + bearerToken
            },
            body: data
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
        })
    }

    return (
        <div>
            <GoBackBtn></GoBackBtn>
            <h1>{id ? "Редактирование" : "Создание"} черновика</h1>
            <Formik
                initialValues={{
                    title: location.state?.data?.title,
                    content: location.state?.data?.content,
                    status: "draft"
                }}
                onSubmit={create_draft}

                validationSchema={FormSchema}
            >
                <Form className='c-form'>
                    <InputField
                        label="Заголовок"
                        id="title"
                        placeholder="Заголовок"
                        name="title"
                        type="text"
                    />
                    
                    <TextArea 
                        label="Контент"
                        name="content"
                        rows="10"
                        placeholder="О чем хотите рассказать?"
                    />

                    <div className='form-controls'>
                        <button type="submit">Отправить</button>
                        <button type="reset">Очистить</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateEditPost