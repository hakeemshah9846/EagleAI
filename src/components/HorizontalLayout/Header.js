import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect, useSelector, shallowEqual } from "react-redux"

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions"

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import SwitchState from "../Modal/SwitchState"

// i18n
import { withTranslation } from "react-i18next"
import { Button, Dropdown, DropdownToggle } from "reactstrap"
import Loader from "../Loader/Loader"
import useToastHelper from "../../hooks/useToastHelper"

import { Toast, ToastBody, ToastHeader } from "reactstrap"
const SUCCESS = "success"
const FAILURE = "failure"

const Header = props => {
  const userProfile = useSelector(
    state => state?.Profile?.userDetails || [],
    shallowEqual // Compare shallowly to prevent unnecessary rerenders
  )

  const [isSwithStateOpened, setSwithStateOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { showFailureToast, showSuccessToast, toast, removeToast } =
    useToastHelper()

  const handleLoader = () => {
    setIsLoading(true) // Start loading when clicked

    setTimeout(() => {
      setIsLoading(false) // Stop loading after 2s
    }, 1000)
  }

  useEffect(() => {
    if (!userProfile?.Access_Default_State_Web) {
      setSwithStateOpened(true)
    } else {
      setSwithStateOpened(false)
    }
  }, [userProfile])

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "grid",
          placeItems: "center",
          background: "white",
        }}
      >
        {" "}
        <Loader />{" "}
      </div>
    )
  }

  return (
    <React.Fragment>
      <div
        className="d-flex flex-column gap-2"
        style={{
          position: "absolute",
          bottom: "0px",
          right: "20px",
          zIndex: "10000",
        }}
      >
        {toast?.map((item, idx) => (
          <Toast key={item?.message} isOpen>
            <ToastHeader toggle={() => removeToast(idx)}>
              <strong
                className={
                  item?.type === SUCCESS ? "text-success" : "text-danger"
                }
              >
                {item.title}
              </strong>
            </ToastHeader>
            <ToastBody
              className={
                item?.type === SUCCESS ? "text-success" : "text-danger"
              }
            >
              {item.message}
            </ToastBody>
          </Toast>
        ))}
      </div>
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <h3 style={{ color: "white", fontWeight: "bold" }}>
              ElectorList Pro
            </h3>
          </div>

          <button
            type="button"
            className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
            data-toggle="collapse"
            onClick={() => {
              props.toggleLeftmenu(!props.leftMenu)
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
            onClick={() => {
              setSwithStateOpened(true)
            }}
          >
            <DropdownToggle
              className="btn header-item noti-icon waves-effect"
              tag="button"
              id="page-header-notifications-dropdown"
            >
              {userProfile?.default_user_state?.State_Abbreviation}{" "}
              <i className="uil-exchange-alt"></i>
            </DropdownToggle>
          </Dropdown>

          <NotificationDropdown />

          <ProfileMenu />
        </div>
      </div>

      <SwitchState
        handleLoader={handleLoader}
        showSuccessToast={showSuccessToast}
        showFailureToast={showFailureToast}
        isOpen={isSwithStateOpened}
        setIsOpen={setSwithStateOpened}
        userProfile={userProfile}
      />
    </React.Fragment>
  )
}

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout
  return { layoutType, showRightSidebar, leftMenu }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(Header))
