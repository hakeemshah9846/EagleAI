import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap"

// i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import withRouter from "../../Common/withRouter"
import { logoutUser } from "../../../store/actions"

import UserImage from "../../../assets/images/users/userimg.jpeg"
import Loader from "../../Loader/Loader"

const ProfileMenu = props => {
    const dispatch                = useDispatch();
    const [menu, setMenu]         = useState(false)
    const [username, setusername] = useState("Admin")
    const userProfile = useSelector(state=>state.Profile.userDetails) 
    const location = useLocation()?.pathname



    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"))
            if (obj.username) {
                setusername(obj.username)
            } else {
                setusername(obj.name)
            }
        }
    }, [props.success]);


 

    const handleLogout = () => {
        dispatch(logoutUser(props.router.navigate));
    };


    useEffect(() => {
        setMenu(false)
    }, [location])
    

    return (
        <React.Fragment>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="d-inline-block"
            >
                <DropdownToggle
                    className="btn header-item waves-effect"
                    id="page-header-user-dropdown"
                    tag="button"
                >
                    <img
                        className="rounded-circle header-profile-user"
                        src={UserImage}
                        alt="Header Avatar"
                    />
                    <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{userProfile?.Account_Name_Web}</span>{" "}
        
                    <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
                </DropdownToggle>

                <DropdownMenu className="dropdown-menu-end">
                    <Link to="/profile" className="dropdown-item" >
                        {" "}
                        <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
                        {props.t("View Profile")}{" "}
                    </Link>
                    <DropdownItem tag="a" href="#">
                        <i className="uil uil-cog font-size-18 align-middle me-1 text-muted"></i>
                        {props.t("Settings")}
                        <span className="badge bg-soft-success rounded-pill mt-1 ms-2">03</span>
                    </DropdownItem>
                    <div className="dropdown-divider" />
                    <Link className="dropdown-item" onClick={handleLogout}>
                        <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
                        <span>{props.t("Logout")}</span>
                    </Link>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    )
}

ProfileMenu.propTypes = {
    success: PropTypes.any,
    t: PropTypes.any
}

const mapStatetoProps = state => {
    const { error, success } = state.Profile
    return { error, success }
}

export default withRouter(
    connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
