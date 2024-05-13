import { useUserSettings } from "../../shared/hooks";
import { UserSettings } from "../settings/UserSettings";
import { LoadingSpinner} from '../LoadingSpinner'
import { PasswordSetings } from "./PasswordSetings";

export const Settings = () => {
    const { userSettings, isFetching, saveSettings} = useUserSettings()

    if(isFetching){
        return <LoadingSpinner/>
    }

    return(
        <div className="settings-container">
            <span>Settings</span>
            <UserSettings settings={userSettings} saveSettings={saveSettings}/>
            <span>Cambiar la contraseña</span>
            <PasswordSetings/>
        </div>
    )
}