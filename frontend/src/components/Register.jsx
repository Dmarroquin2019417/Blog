import { useState } from 'react';
import { Logo } from './Logo';
import { Input } from './Input';
import {
    emailValidationMessage,
    validationEmail,
    validatePasswordMessage,
    validatePassword,
    validateUsername,
    validateUsernameMessage,
    validateConfirmPassword,
    passwordConfirmationMessage
} from '../shared/validators';
import { useRegister } from '../shared/hooks';

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

    const [formState, setFormState] = useState({
        username: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
        passwordConfirm: {
            value: '',
            isValid: false,
            showError: false
        },
        email: {
            value: '',
            isValid: false,
            showError: false
        },
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'email':
                isValid = validationEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            case 'passwordConfirm':
                isValid = validateConfirmPassword(formState.password.value, value);
                break;
            case 'username':
                isValid = validateUsername(value);
                break;
            default:
                break;
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));
    };

    const handleRegister = (event) => {
        event.preventDefault();
        register(formState.username.value, formState.password.value, formState.email.value);
    };

    const isSubmitButtonDisabled = isLoading 
    ||  !formState.username.isValid 
    || !formState.email.isValid 
    || !formState.password.isValid 
    || !formState.passwordConfirm.isValid;

    return (
        <div className="auth-container">
            <div className="register-container">
                <form className="auth-form">
                    <Logo text={'Register'} />
                    <div className="input-box">
                        <Input
                            field='email'
                            placeholder='Email'
                            className='login-input'
                            value={formState.email.value}
                            onChangeHandler={handleInputValueChange}
                            type='text'
                            onBlurHandler={handleInputValidationOnBlur}
                            validationMessage={emailValidationMessage}
                        />
                    </div>
                    <div className="input-box">
                        <Input
                            field='username'
                            placeholder='Nombre'
                            className='login-input'
                            value={formState.username.value}
                            onChangeHandler={handleInputValueChange}
                            type='text'
                            onBlurHandler={handleInputValidationOnBlur}
                            validationMessage={validateUsernameMessage}
                        />
                    </div>
                    <div className="input-box">
                        <Input
                            field='password'
                            placeholder='Contraseña'
                            className='login-input'
                            value={formState.password.value}
                            onChangeHandler={handleInputValueChange}
                            type='password'
                            onBlurHandler={handleInputValidationOnBlur}
                            validationMessage={validatePasswordMessage}
                        />
                    </div>
                    <div className="input-box">
                        <Input
                            field='passwordConfirm'
                            placeholder='Confirma tu contraeña'
                            className='login-input'
                            value={formState.passwordConfirm.value}
                            onChangeHandler={handleInputValueChange}
                            type='password'
                            onBlurHandler={handleInputValidationOnBlur}
                            validationMessage={passwordConfirmationMessage}
                        />
                    </div>
                    <button onClick={handleRegister} disabled={isSubmitButtonDisabled} className="login__button">
                        Registrate
                    </button>
                    <div onClick={switchAuthHandler} className="auth-form-switch-label">
                        ¿Ya tienes una cuenta? ¡Inicia sesión ahora!
                    </div>
                </form>
            </div>
            <div className="image-container">
                <img src="https://rockcontent.com/es/wp-content/uploads/sites/3/2019/05/para-que-sirve-un-blog-1024x538.png.webp" alt="Imagen de Blog" />
            </div>
        </div>
    );
};
