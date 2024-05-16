import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo3.png'
import { useUserDetails } from '../../shared/hooks'

const NavLogo = () => {
    return (
        <div className="nav-logo-container">
            <img
                className="nav-logo"
                width='150%'
                height='150%'
                src={logo}
                alt="Logo"
            />
        </div>
    )
}

const NavButton = ({ text, onClickHandler }) => {
    return (
        <span className="nav-button" onClick={onClickHandler}>
            {text}
        </span>
    )
}

const UserIcon = ({ onClick }) => {
    return (
        <span className="user-icon" onClick={onClick}>
            <i className="fa fa-user" aria-hidden="true"></i>
        </span>
    )
}


    export const Navbar = () => {
        const { isLogger, logout } = useUserDetails()
        const navigate = useNavigate()
    
        const handleNavigateToAuthPage = () => {
            navigate('/auth')
        }
    
        const handleNavigateToSettingPage = () => {
            navigate('/settings')
        }
    
        const handleNavigateToHomePage = () => {
            navigate('/')
        }
    
        const handleLogout = () => {
            logout()
        }
    
        return (
            <>
                <div className="nav-container">
                    <div className="logo-box">
                        <NavLogo />
                        <NavButton text='' onClickHandler={handleNavigateToHomePage} />
                    </div>
                    <div className="nav-buttons-container">
                        {!isLogger ? (
                            <div>
                                <UserIcon onClick={handleNavigateToAuthPage} />
                                <NavButton text='Login' onClickHandler={handleNavigateToAuthPage} />
                            </div>
                        ) : (
                            <div className="sidebar">
                                <NavButton text='New Post' onClickHandler={handleNavigateToNewPostPage} />
                                <br></br>
                                <NavButton text='My Cuenta' onClickHandler={handleNavigateToSettingPage} />
                                <br></br>
                                <NavButton text='Cerrar sesión' onClickHandler={handleLogout} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="bottom-navbar">
                </div>
            </>
        )
    }