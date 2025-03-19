import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect, useSelector, shallowEqual } from "react-redux";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions";

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import SwitchState from "../Modal/SwitchState";

// i18n
import { withTranslation } from "react-i18next";
import { Button, Dropdown, DropdownToggle } from "reactstrap";
import Loader from "../Loader/Loader";

const Header = props => {


    const userProfile = useSelector(
        (state) => state?.Profile?.userDetails || [],
        shallowEqual // Compare shallowly to prevent unnecessary rerenders
    );

    const [isSwithStateOpened, setSwithStateOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoader = () => {
        setIsLoading(true);  // Start loading when clicked
    
        setTimeout(() => {
            setIsLoading(false);  // Stop loading after 2s
        }, 2000);
    };

    useEffect(() => {
        if (!userProfile?.Access_Default_State_Web) {
            setSwithStateOpened(true);
        } else {
            setSwithStateOpened(false);
        }
    }, [userProfile])

    if (isLoading) {
        return  <div style={{height:"100vh", width:"100vw", display:"grid", placeItems:'center', background:"white"}}> <Loader /> </div>
      }

    return (
        <React.Fragment>
            <div className="navbar-header">
                <div className="d-flex">
                    <div className="navbar-brand-box">
                        <h3 style={{ color: 'white', fontWeight: "bold" }}>ElectorList Pro</h3>
                    </div>

                    <button
                        type="button"
                        className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
                        data-toggle="collapse"
                        onClick={() => {
                            props.toggleLeftmenu(!props.leftMenu);
                        }}
                        data-target="#topnav-menu-content"
                    >
                        <i className="fa fa-fw fa-bars" />
                    </button>
                </div>

                <div className="d-flex">
                    <Dropdown
                        className="dropdown d-inline-block"
                        tag="li"
                        toggle={() => {}}
                        onClick={() => {setSwithStateOpened(true) }}
                        
                    >
                        <DropdownToggle
                            className="btn header-item noti-icon waves-effect"
                            tag="button"
                            id="page-header-notifications-dropdown"
                        >
                                { userProfile?.default_user_state?.State_Abbreviation } <i className="uil-exchange-alt"></i>
  
                            
                        </DropdownToggle>
                    </Dropdown>

                    <NotificationDropdown />

                    <ProfileMenu />
                </div>
            </div>

            <SwitchState handleLoader={handleLoader}  isOpen={isSwithStateOpened} setIsOpen={setSwithStateOpened} userProfile={userProfile} />
        </React.Fragment>
    );
};

Header.propTypes = {
    leftMenu: PropTypes.any,
    showRightSidebar: PropTypes.any,
    showRightSidebarAction: PropTypes.func,
    t: PropTypes.any,
    toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
    const { layoutType, showRightSidebar, leftMenu } = state.Layout;
    return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, {
    showRightSidebarAction,
    toggleLeftmenu,
})(withTranslation()(Header));
