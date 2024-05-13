import { useChangePassword } from '../../shared/hooks'
import { passwordConfirmationMessage, validatePasswordMessage, validatePassword } from '../../shared/validators'
import { useState } from 'react'
import { Input } from '../Input'

const inputs = [
    {
        field: 'password',
        label: 'Password',
        validationMessage: validatePasswordMessage,
        type: 'password'
    },
    {
        field: 'newPassword',
        label: 'New Password',
        validationMessage: passwordConfirmationMessage,
        type: 'password'
    }
]


export const PasswordSetings = () => {
    const [formState, setFormState] = useState({
        password: {
            isValid: false,
            showError: false,
            value: ''
        },
        newPassword: {
            isValid: false,
            showError: false,
            value: settings.username

        },
    })


    const { changePassword } = useChangePassword()
    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value: value
            }
        }))
    }

    const handelInputValidationOnBlur = (value, field) => {
        let isValid = validatePassword(value)
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const isSubmitButtonDisabled = !formState.password.isValid ||
        !formState.newPassword.isValid

    const handleFormSubmit = (event) => {
        event.prevDefault()

        changePassword(formState.password.value, formState.newPassword.value)
    }

    return (
        <form className="settings-form">
        {inputs.map((input) => (
            <Input 
                key={input.field}
                field={input.field}
                label={input.label}
                value={formState[input.field].value}
                onChangeHandler={handleInputValueChange}
                onBlurHandler={handelInputValidationOnBlur}
                showErrorMessage={formState[input.field].showError}
                validationMessage={input.validationMessage}
                type={input.type}
                textarea={input.textarea}
            />
        ))}
        <button onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>
            Actualizar contraseña
        </button>
    </form>
    )
}