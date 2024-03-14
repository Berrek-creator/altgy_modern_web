// чтобы много раз не писать Field и штуку с ошибками, все это вынесено сюда
import { useField } from 'formik'

import PropTypes from 'prop-types';

import PhoneInput from 'react-phone-input-2';

import './FormFields.css'

// https://formik.org/docs/guides/validation

// https://codesandbox.io/p/sandbox/formik-v2-tutorial-added-textarea-ujz18?file=%2Fsrc%2Findex.js%3A15%2C50

export const TextArea = ({label, ...props}) => {
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

export const InputField = ({label, ...props}) => {
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

export const PhoneField = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (

        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <PhoneInput specialLabel="" disableDropdown={true}
            onChange={props.onChange}
                country={"ru"} {...field} inputProps={{...props}}></PhoneInput>
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