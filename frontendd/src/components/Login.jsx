/* eslint-disable react/prop-types */
import { useState } from "react";
import { Logo } from "./Logo";
import { Input } from "./Input";
import {
  emailValidationMessage,
  validatePasswordMessage,
  validateEmail,
  validatePassword,
} from "../shared/validators";
import { useLogin } from "../shared/hooks";

export const Login = ({ switchAuthHandler }) => {
  const {login, isLoading} = useLogin();

  const [formState, setFormState] = useState({
    email: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormState((prevState) =>({
        ...prevState,
        [field]:{
            ...prevState[field],
            isValid,
            showError: !isValid
        }
    }))
  };

  const handleLogin = (event) => {
    event.preventDefault()
    login(formState.email.value, formState.password.value)
  }

  const isSubmitButtonDisabled = isLoading || !formState.password.isValid || !formState.email.isValid
  return (
    <div className="login-container">
        <form className="auth-form">
            <Logo text={'Log in'} />
            <div className="input-box">
                <Input
                    field='email'
                    placeholder='Email'
                    className='login-input'
                    value={formState.email.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.email.showError}
                    validationMessage={emailValidationMessage}
                />

            </div>
            <div className="input-box">
                <Input
                    field='password'
                    placeholder='Password'
                    className='login-input'
                    value={formState.password.value}
                    onChangeHandler={handleInputValueChange}
                    type='password'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.password.showError}
                    validationMessage={validatePasswordMessage}
                />
      
            </div>
            <button onClick={handleLogin} disabled={isSubmitButtonDisabled} className="login__button">
                Log in
            </button>
        </form>
        <span onClick={switchAuthHandler} className="auth-form-switch-label">
            ¿Aún no tienes una cuenta? ¡Registrate...!
        </span>
    </div>
  );
};
