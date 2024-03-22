import { Formik, Form } from 'formik'

import { InputField, TextArea, PhoneField } from '../../components/FormFields'
// Field, ErrorMessage

// валидация при помощи схемы
import * as Yup from 'yup'

function Lab5() {
    // https://www.regextester.com/99415
    // регулярное выраженеи для русских номеров телефонов
    // /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
    const phoneRegExp = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/

    // схема валидации
    const FormSchema = Yup.object().shape({
        user_name: Yup.string().min(2, 'Короткое имя').max(50, 'Длянное имя').required("Введите имя"),
        email: Yup.string().email("Некоректный E-mail").required("Введите email"),
        phone: Yup.string().matches(phoneRegExp, "Некоректный номер телефона"),
        message : Yup.string().min(10, "Слишком короткое сообщение").max(400, "Слишком длинное сообщение").required("Напишите что-нибудь"),
        pdpa : Yup.bool().oneOf([true], "Нужно Ваше согласие")
    })

    // {({prop1, prop2, prop3}) => ()} - то что в фигурных скобках - деструктуризация!

    return (
        <div>
            <h1>Обратная связь</h1>
            <Formik
                initialValues={{
                    user_name: '',
                    email: '',
                    phone: '',
                    message: '',
                    pdpa: false // personal_data_processing_agreement
                }}
                onSubmit={(values, helpers) => {
                    console.log(values)
                    let data = JSON.stringify(values, null, 2);
                    alert(data)
                    helpers.resetForm()
                }}
                //onReset={(_, e) => {
                //    console.log(e)
                //    if (!window.confirm("Очисть форму?")) {
                //        throw new Error('Cancel reset');
                //    }
                //    return true
                //}}
                validationSchema={FormSchema}
            >
                {({
                    // values,
                    // errors,
                    // touched,
                    handleChange,
                    // handleBlur,
                    // handleSubmit,
                    // isSubmitting,
                    /* and other goodies */
                }) => (
                    <Form className='c-form'>
                        <InputField
                            label="Имя"
                            id="user_name"
                            placeholder="Имя"
                            name="user_name"
                            type="text"
                        />
    
                        <InputField
                            label="email"
                            id="email"
                            name = "email"
                            type="email"
                        />
    
                        <PhoneField
                            label="Телефон"
                            id="phone"
                            name = "phone" 
                            onChange = {handleChange}
                        />
    
                        
                        <TextArea 
                            label="Сообщение"
                            name="message"
                            rows="6"
                            placeholder="Напишите нам"
                        />
    
                        <InputField 
                        label="Согласие на обрабоку данных"
                            id = "pdpa"
                            name = "pdpa"
                            type = "checkbox"
                        />
    
                        <div className='form-controls'>
                            <button type="submit">Отправить</button>
                            <button type="reset">Очистить</button>
                        </div>
                    </Form>
                )}
                </Formik>
        </div>
    )
}

export default Lab5