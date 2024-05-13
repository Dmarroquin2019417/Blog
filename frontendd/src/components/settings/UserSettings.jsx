import { useState } from "react";
import {
  validateUsername,
  validateUsernameMessage,
  validationEmail,
  emailValidationMessage,
} from "../../shared/validators";
import { Input } from "../Input.jsx";

const getUserId = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).id : null;
};

const inputs = [
  {
    field: "username",
    label: "Username",
    validation: validateUsername,
    validationMessage: validateUsernameMessage,
    type: "text",
  },
  {
    field: "email",
    label: "Email",
    validation: validationEmail,
    validationMessage: emailValidationMessage,
    type: "text",
  },
];

export const UserSettings = ({ settings, saveSettings }) => {
  const [formState, setFormState] = useState({
    username: {
      value: settings.username,
      isValid: validateUsername(settings.username),
      showError: false,
    },
    email: {
      value: settings.email,
      isValid: validationEmail(settings.email),
      showError: false,
    },
  });

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidation = (value, field) => {
    const isValid = inputs.find((input) => input.field === field)?.validation(value) || false;
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    saveSettings({
      username: formState.username.value,
      email: formState.email.value,
      userId: getUserId(),
    });
  };

  const isSubmitDisabled = Object.values(formState).some((input) => !input.isValid);

  return (
    <form className="settings-form">
      {inputs.map((input) => (
        <Input
          key={input.field}
          field={input.field}
          label={input.label}
          value={formState[input.field].value}
          onChange={(event) => handleInputChange(event, input.field)}
          onBlur={(value) => handleInputValidation(value, input.field)}
          showError={formState[input.field].showError}
          validationMessage={input.validationMessage}
          type={input.type}
          textarea={input.textarea}
        />
      ))}
      <button onClick={handleFormSubmit} disabled={isSubmitDisabled}>
        Guardar
      </button>
    </form>
  );
};
