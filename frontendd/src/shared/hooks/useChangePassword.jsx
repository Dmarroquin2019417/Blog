import toast from "react-hot-toast"
import { changePassword as changePasswordRequest } from "../../services"

export const useChangePassword = () => {
      const changePassword = async (password, newpassword) => {
        const responseData = await changePasswordRequest({password, newpassword})
        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'No fue posible actualizar el passaword'
            )
        }
        toast.success('Password Actualizado exitosamente ||')
      }
    return{
    changePassword
    }
}