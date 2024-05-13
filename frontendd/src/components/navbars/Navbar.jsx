/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo3.png";
import { useUserDetails } from "../../shared/hooks";

const NavLogo = () => {
  return (
    <div className="nav-logo-container">
      <img
        className="nav-logo"
        width="100%"
        height="100%"
        src={logo}
        alt="Logo"
      />
    </div>
  );
};

const NavButton = ({ text, onClickHandler }) => {
  return (
    <span className="nav-button" onClick={onClickHandler}>
      {text}
    </span>
  );
};

export const Navbar = () => {
  const { isLogged, logout } = useUserDetails();

  const navigate = useNavigate()

  const handleNavigateToAuthPage = () => {
    navigate('/auth')
  }

  const handleNavigateToSettingsPage = () => {
    navigate('/settings')
  }

  const handleNavigateToNewPostPage = () => {
    navigate('/public')
  }

  const handleNavigateToHomePage = () => {
    navigate('/')
}

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="nav-container">
        <div className="logo-box">
            <NavLogo />
            <NavButton text='Mi Blog' onClickHandler={handleNavigateToHomePage} />
        </div>
        <div className="nav-buttons-container">
            {!isLogged ? (
                <div>
                    <NavButton text='Log in' onClickHandler={handleNavigateToAuthPage} />
                    <i className="fa-solid fa-right-to-bracket"></i>
                </div>
            ) : (
                <div className="sidebar">
                    <i className="fa-solid fa-square-plus"></i>
                    <NavButton text='New Post' onClickHandler={handleNavigateToNewPostPage} />
                    <br></br>
                    <i className="fa-solid fa-user"></i>
                    <NavButton text='My account' onClickHandler={handleNavigateToSettingsPage} />
                    <br></br>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <NavButton text='Log out' onClickHandler={handleLogout} />
                </div>
            )}
        </div>
    </div>
)
}