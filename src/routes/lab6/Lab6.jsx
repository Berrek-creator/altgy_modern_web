import { Formik, Form } from 'formik'

// валидация при помощи схемы
import * as Yup from 'yup'

import { InputField, TextArea, PhoneField } from '../../components/FormFields'

function Lab5(props) {
    // схема валидации
    const FormSchema = Yup.object().shape({
        title: Yup.string().min(5, 'Короткое название').max(50, 'Слишком длинный заголовок').required("Введите заголовок"),
        content: Yup.string().min(5, 'Мало контента').required("Введите контент записи"),
    })

    // схема авторизации
    const AuthSchema = Yup.object().shape({
        login: Yup.string().required("Введите логин"),
        psw: Yup.string().required("Введите пароль!")
    })

    return (
        <div>
            <h1>Войдите в учетную запись</h1>
            <Formik
                initialValues={{
                    login: '',
                    psw: '',
                }}
                onSubmit={(values, helpers) => {
                    console.log(values)
                    let data = JSON.stringify(values, null, 2);
                    alert(data)
                    helpers.resetForm()
                }}

                validationSchema={AuthSchema}
            >
                    <Form className='c-form'>
                        <InputField
                            label="Логин"
                            id="login"
                            placeholder="Имя пользователя"
                            name="login"
                            type="text"
                        />

                        <InputField
                            label="Пароль"
                            id="psw"
                            placeholder="Пароль"
                            name="psw"
                            type="password"
                        />
                        
    
                        <div className='form-controls'>
                            <button type="submit">Отправить</button>
                            <button type="reset">Очистить</button>
                        </div>
                    </Form>
                </Formik>
            <h1>Создание новой записи</h1>
            <Formik
                initialValues={{
                    title: '',
                    content: '',
                }}
                onSubmit={(values, helpers) => {
                    console.log(values)
                    let data = JSON.stringify(values, null, 2);
                    alert(data)
                    helpers.resetForm()
                }}

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
            <h2>Черновики</h2>
        </div>
    )
}

export default Lab5