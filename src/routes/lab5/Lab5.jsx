import { Formik, Form, useField} from 'formik'

import PropTypes from 'prop-types';
// Field, ErrorMessage

// валидация при помощи схемы
import * as Yup from 'yup'


// https://formik.org/docs/guides/validation

// https://codesandbox.io/p/sandbox/formik-v2-tutorial-added-textarea-ujz18?file=%2Fsrc%2Findex.js%3A15%2C50

const TextArea = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.

    // https://formik.org/docs/api/useField
    const [field, meta] = useField(props);
    return (
        <div className='text-area'>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className="text-area" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

// чтобы много раз не писать Field и штуку с ошибками, все это вынесено сюда
const InputField = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input type={props.type} {...field} {...props}/>
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ) : null}
        </div>
    )
}

const prop_vals = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string
}

InputField.propTypes = prop_vals
TextArea.propTypes = prop_vals

function Lab5() {

    const FormSchema = Yup.object().shape({
        user_name: Yup.string().min(2, 'Короткое имя').max(50, 'Длянное имя').required("Введите имя"),
        email: Yup.string().email("Некоректный E-mail").required("Введите email"),
        phone: Yup.string().max(10),
        message : Yup.string().min(10).max(400).required("Напишите что-нибудь"),
        pdpa : Yup.bool().oneOf([true], "Нужно Ваше согласие")
    })

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
                    let data = JSON.stringify(values, null, 2);
                    alert(data)
                    helpers.resetForm()
                }}
                //onReset={() => {
                //    if (!window.confirm("Очисть форму?")) {
                //        return false
                //    }
                //    return true
                //}}
                validationSchema={FormSchema}
            >
                <Form className='c-form'>
                    <InputField
                        label="Имя"
                        id="user_name"
                        placeholder="Имя"
                        name = "user_name"
                        type="text"
                    />

                    <InputField
                        label="email"
                        id="email"
                        name = "email"
                        type="email"
                    />

                    <InputField
                        label="Телефон"
                        id="phone"
                        name = "phone"
                        type="text"
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
                        type="checkbox"
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

export default Lab5