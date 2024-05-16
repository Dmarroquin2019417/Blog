import { useState } from "react";
import { Logo } from './Logo';
import { Input } from './Input';
import {
    emailValidationMessage,
    validationEmail,
    validatePasswordMessage,
    validatePassword
} from '../shared/validators';
import { useLogin } from "../shared/hooks";
import InstagramIcon from "../icons/InstagramIcon";
import GitHubIcon from "../icons/GitHubIcon";
import FacebookIcon from "../icons/FacebookIcon";

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin();

    const [formState, setFormState] = useState({
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
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

    const handleLogin = (event) => {
        event.preventDefault();

        login(formState.email.value, formState.password.value);
    };

    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.password.isValid;

    return (
        <div className="auth-container">
            <div className="login-container">
                <form className="auth-form">
                    <Logo text={'Log in'} />
                    <div className="input-box">
                        <Input
                            field='email'
                            placeholder='Correo electrónico'
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
                            field='password'
                            placeholder='Contraseña'
                            className='login-input'
                            value={formState.password.value}
                            onChangeHandler={handleInputValueChange}
                            type='password'
                            onBlurHandler={handleInputValidationOnBlur}
                            showErrorMessage={formState.password.showError}
                            validationMessage={validatePasswordMessage}
                        />
                    </div>
                    <button onClick={handleLogin} disabled={isSubmitButtonDisable} className="login__button">
                        Iniciar sesión
                    </button>
                    <div onClick={switchAuthHandler} className="auth-form-switch-label">
                        ¿Aún no tienes una cuenta? ¡Regístrate aquí!
                    </div>
                    <div className="social-icons">
                        <InstagramIcon />
                        <GitHubIcon />
                        <FacebookIcon />
                    </div>
                </form>
            </div>
            <div className="image-container">
                <img src="https://rockcontent.com/es/wp-content/uploads/sites/3/2019/05/para-que-sirve-un-blog-1024x538.png.webp" alt="Imagen de Blog" />
            </div>
        </div>
    );
};
