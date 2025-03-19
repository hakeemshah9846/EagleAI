import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { Link, useLocation } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"
import { useSelector } from "react-redux"
//i18n
import { withTranslation } from "react-i18next"
import useNotificationCount from "./hooks/useNotificationCount"
import Icons from "../../Icons/Icons"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const path =  useLocation()?.pathname
  const [menu, setMenu] = useState(false)
  const notificationCount = useNotificationCount()
  const userProfile = useSelector((state) => state.Profile.userDetails);

  useEffect(()=>{
    setMenu(false)
  },[path])

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="uil-bell"></i>
          <span className="badge bg-danger rounded-pill">{notificationCount}</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 font-size-16"> {props.t("Notifications")} </h6>
              </Col>
              {/* <div className="col-auto">
                <Link to="#!" className="small">
                  {" "}
                  Mark all as read
                </Link>
              </div> */}
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {!userProfile?.Email_Address_Is_Verified &&<Link to="/profile?tab=2" className="text-dark notification-item">
              <div className="d-flex align-items-start">
                <div className="avatar-xs me-1"> 
                       <Icons iconType="needVerification" style={{fontSize:"24px"}} />
                </div>
                <div className="flex-1">
                  <h6 className="mt-0 mb-1">
                    {"Email Not Verified"}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("kindly verify your email address")}
                    </p> 
                  </div>
                </div>
              </div>
            </Link>}
          </SimpleBar> 
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any
}