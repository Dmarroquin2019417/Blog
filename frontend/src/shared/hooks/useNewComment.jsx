import { useState } from "react";
import { newComment as newCommentRequest } from '../../services'
import toast from "react-hot-toast";

export const useNewComment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);

    const comment = async (publicacion, texto) => {
        setIsLoading(true);

        const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

        try {
            const response = await newCommentRequest({
                publicacion,
                texto
            }, token);

            setIsLoading(false);

            if (response.error) {
                toast.error(response.e?.response?.data || 'Ocurrio un error al crear un comentario nuevo');
            } else {
                toast.success('Comentario creado exitosamente');
                console.log('Adding comment:', { usuario: 'Usuario', texto });
                setComments(prevComments => [...prevComments, { usuario: 'Usuario', texto }]);
                console.log('Comments:', comments);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Ocurrió un error al enviar el comentario');
        }
    }

    return {
        comment,
        isLoading,
        comments
    }
}
