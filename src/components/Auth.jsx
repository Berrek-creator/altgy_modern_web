import { Formik, Form } from 'formik'

// валидация при помощи схемы
import * as Yup from 'yup'

import { InputField } from './FormFields'

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { setBearerToken } from '../Redux/Auth/AuthAction';

// проверка того, что bearer установлен
import { is_bearer_valid } from './auth_tools';

// для перенаправления
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { Dialog } from '@mui/material';

export function Auth() {

    //
    const navigate = useNavigate();

    // redux отсылатель событий
    const dispatch = useDispatch()

    const is_auth = useSelector(state => state.auth.is_auth)

    const [isDialogOpen, setDialogOpen] = useState(true)

    // схема авторизации
    const AuthSchema = Yup.object().shape({
        username: Yup.string().required("Введите логин!"),
        password: Yup.string().required("Введите пароль!")
    })

    useEffect(() => {
        // если мы в auth и уже авторизированны, то redirect на главную
        if (is_auth){
            navigate('/')
        }
    }, [is_auth, isDialogOpen])
    
    function authenticate(values, helpers) {

        let path = "https://xn--80afw1b6b.xn--p1ai/wp-json/jwt-auth/v1/token"
        console.log(values)
        
        let data = JSON.stringify(values, null, 2);

        fetch(path, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type" : "application/json"
            },
            body: data
        }).then((response) => {
            return response.json()
        }).then((data) => {
            // если в ответе нет токена, то все плохо
            if (!data.token) {
                alert("Неверный логин или пароль")
            } else {
                // если все хорошо, то у нас на руках есть объект, в котором: 
                // token, user_email, user_nicename, user_display_name

                console.log(data)

                dispatch(setBearerToken(data.token))
                alert("Добро пожаловать: " + data.user_display_name)
                helpers.resetForm()
                navigate('/')
            }
        })
    }

    function handleAuthCancel() {
        navigate('/')
    }

    return (
        <Dialog open={isDialogOpen}>
            <div className='p10'>
                <h1>Войдите в учетную запись</h1>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    onSubmit={authenticate}

                    validationSchema={AuthSchema}
                    >
                    <Form className='c-form'>
                        <InputField
                            label="Логин"
                            id="username"
                            placeholder="Имя пользователя"
                            name="username"
                            type="text"
                        />

                        <InputField
                            label="Пароль"
                            id="password"
                            placeholder="Пароль"
                            name="password"
                            type="password"
                        />

                        <div className='form-controls'>
                            <button type="submit">Отправить</button>
                            <button type="button" onClick={handleAuthCancel}>Отмена</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </Dialog>
    )   
}

export default Auth