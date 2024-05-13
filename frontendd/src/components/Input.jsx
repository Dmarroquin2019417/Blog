/* eslint-disable react/prop-types */

export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    className,
    textarea, 
}) => {
    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field)
    }

    const handleInputBlur = (event ) => {
        onBlurHandler(event.target.value, field)
    }

  return (
    <>
        <div className="auth-form-label">
            <span>{label}</span>
        </div>
        {textarea ? (
            <textarea
                type={type}
                value={value}
                onChange={handleValueChange}
                onBlur={handleInputBlur}
                rows={5}
                style={{maxWidth: '400px'}}
                className={className}
            />
        ) : (
            <input
                type={type}
                value={value}
                onChange={handleValueChange}
                onBlur={handleInputBlur}
                className={className}
            />
        )}
        <span className="auth-form-validation-message">
            {showErrorMessage && validationMessage}    
        </span>    
    </>
  )
}

