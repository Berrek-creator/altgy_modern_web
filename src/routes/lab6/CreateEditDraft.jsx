import { Formik, Form } from 'formik'

// валидация при помощи схемы
import * as Yup from 'yup'

import { InputField, TextArea } from '../../components/FormFields'

import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useEffect, useState } from "react"
import GoBackBtn from '../../components/GoBackBtn';

import { FaTrash } from 'react-icons/fa';

import { draft_fetch } from '../../tools';

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

    // чтобы useEffect заставить шевелиться после удаления записи
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        if (deleted) {
            navigate(-1)
        }
    }, [id, deleted, bearerToken, location])

    function create_draft(values, helpers) {
        
        let data = JSON.stringify(values);

        draft_fetch("POST", data, id, bearerToken)  
        .then((data) => {
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

        draft_fetch("DELETE", {}, id, bearerToken)
        .then((data) => {
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