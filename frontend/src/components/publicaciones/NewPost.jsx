import { useState } from 'react'
import { Input } from '../Input'
import { Textarea } from '../Textarea'
import {
    descriptionValidateMessage,
    validateTitleMessage
} from '../../shared/validators'
import { useNewPost } from '../../shared/hooks'

export const NewPost = () => {
    const { post, isLoading } = useNewPost();

    const [formState, setFormState] = useState(
        {
            title: 'Primer Post',
            excerpt: 'Este es un extracto del primer post...',
            author: 'Juan Pérez',
            date: '2024-05-01',
            onClick: () => console.log('Primer Post Clicked'),
          },
          {
            title: 'Segundo Post',
            excerpt: 'Este es un extracto del segundo post...',
            author: 'Ana García',
            date: '2024-05-02',
            onClick: () => console.log('Segundo Post Clicked'),
          },
    )


    const handleNewPost = (event) => {
        event.preventDefault()

        post(formState.titulo.value, formState.categoria.value, formState.texto.value)
    }

    const isSubmitButtonDisable = isLoading || 
    !formState.titulo.isValid || !formState.categoria.isValid 
    || !formState.texto.isValid

    return (

        <div className='new-post-container'>
            <span className='new-post-title'>Nueva publicacion</span>
            <form className='new-post-form'>
                <div className='post-input-box'>
                    <Input
                        field='Post'
                        placeholder='Title'
                        className='post-input'
                        value={formState.titulo.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        validationMessage={validateTitleMessage}
                    />
                </div>
                <div className='post-input-box'>
                    <Input
                        field='De que se trata?'
                        placeholder='Category'
                        className='post-input'
                        value={formState.categoria.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        validationMessage={validateTitleMessage}
                    />
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
                        validationMessage={descriptionValidateMessage}
                    />
                </div>
                <button onClick={handleNewPost} disabled={isSubmitButtonDisable}>
                    Public
                </button>
            </form>
        </div>
    )
}