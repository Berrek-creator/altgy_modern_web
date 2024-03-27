import { Formik, Form } from 'formik'

// валидация при помощи схемы
import * as Yup from 'yup'

import { InputField, TextArea } from '../../components/FormFields'

import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useEffect, useState } from "react"
import GoBackBtn from '../../components/GoBackBtn';

import { FaTrash } from 'react-icons/fa';

function CreateEditPost() {
    const location = useLocation()
    const navigate = useNavigate()

    console.log("passed", location.state)

    const bearerToken = useSelector(store => store.auth.bearerToken)

    // схема валидации
    const FormSchema = Yup.object().shape({
        title: Yup.string().min(5, 'Короткое название').max(50, 'Слишком длинный заголовок').required("Введите заголовок"),
        content: Yup.string().min(5, 'Мало контента').required("Введите контент записи"),
    })

    const [id, setId] = useState(location.state?.data?.id)


    const [method, setMethod] = useState('POST')

    // чтобы useEffect заставить шевелиться после удаления записи
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        if (deleted) {
            navigate(-1)
        }
    }, [id, deleted, bearerToken, location])


    // создать черновик. Также отвечает за его редактирвоание
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
            if (data.id) {
                alert("Черновик сохранен")
                setId(data.id)
            }
        })
    }

    function delete_draft(values, helpers) {
        if (!id) {
            return false
        }

        let path = "https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts/" + id

        fetch(path, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-type" : "application/json",
                "Authorization" : 'Bearer ' + bearerToken
            }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
            if (data.id) {
                alert("Черновик удален")
                setDeleted(true)
            }
        })
    }

    return (
        <div>
            <GoBackBtn></GoBackBtn>
            <h1>{id ? "Редактирование" : "Создание"} черновика</h1>
            <Formik
                initialValues={{
                    title: id ? location.state?.data?.title : '',
                    content: id ? location.state?.data?.content : '',
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
                        id="content"
                        label="Контент"
                        name="content"
                        rows="10"
                        placeholder="О чем хотите рассказать?"
                    />

                    <div className='form-controls'>
                        <button type="submit">{id ? "Сохранить" : "Отправить"}</button>
                        <button type="reset">Очистить</button>
                        {id ? <button type="button" className='c-danger' disabled={id ? false : true} onClick={delete_draft} ><FaTrash></FaTrash></button> : ''}
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateEditPost