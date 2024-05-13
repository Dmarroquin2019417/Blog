import { useState } from 'react'
import { Input } from '../Input'
import { Textarea } from '../Textarea'
import {
    validateDescription,
    descriptionValidateMessage,
    validateTitle,
    validateTitleMessage
} from '../../shared/validators'
import { useNewPost } from '../../shared/hooks'

export const NewPost = () => {
    const { post, isLoading } = useNewPost();

    const [formState, setFormState] = useState({
        titulo: {
            value: '',
            isValid: false,
            showError: false
        },
        categoria: {
            value: '',
            isValid: false,
            showError: false
        },
        texto: {
            value: '',
            isValid: false,
            showError: false
        },
    })

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'titulo':
                isValid = validateTitle(value)
                break

            case 'categoria':
                isValid = validateTitle(value)
                break

            case 'texto':
                isValid = validateDescription(value)
                break

            default:
                break
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleNewPost = (event) => {
        event.preventDefault()

        post(formState.titulo.value, formState.categoria.value, formState.texto.value)
    }

    const isSubmitButtonDisable = isLoading || !formState.titulo.isValid || !formState.categoria.isValid || !formState.texto.isValid

    return (

        <div className='new-post-container'>
            <span className='new-post-title'>New Post</span>
            <form className='new-post-form'>
                <div className='post-input-box'>
                    <Input
                        field='titulo'
                        placeholder='Title'
                        className='post-input'
                        value={formState.titulo.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.titulo.showError}
                        validationMessage={validateTitleMessage}
                    />
                    <i class="fa-solid fa-heading"></i>
                </div>
                <div className='post-input-box'>
                    <Input
                        field='categoria'
                        placeholder='Category'
                        className='post-input'
                        value={formState.categoria.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.categoria.showError}
                        validationMessage={validateTitleMessage}
                    />
                    <i class="fa-solid fa-layer-group"></i>
                </div>
                <div className='post-input-text-box'>
                    <Textarea
                        field='texto'
                        placeholder='Body text'
                        className='post-text'
                        value={formState.texto.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.texto.showError}
                        validationMessage={descriptionValidateMessage}
                    />
                    <i class="fa-solid fa-comment"></i>
                </div>
                <button onClick={handleNewPost} disabled={isSubmitButtonDisable}>
                    Post
                </button>
            </form>
        </div>
    )
}