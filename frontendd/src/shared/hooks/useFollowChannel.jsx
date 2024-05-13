import toast from "react-hot-toast";
import { followChannel as followChannelRequest } from "../../services";



export const useFollowChannel = () => {
const followChannel = async (channelId, onSucces) => {
    const responseData = await followChannelRequest (channelId)

    if(responseData.error){
        return toast.error(
            responseData.e?.response?.data || 'Ocurrop un error al seguir el canal'
        )
    }
    toast.success('Channels followed Seccessfuly')

    onSucces(true)
}

  return (
    followChannel
  )
}


