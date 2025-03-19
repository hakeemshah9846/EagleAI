import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Collapse } from "reactstrap"
import { Link, useLocation } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"
import classname from "classnames"

import { Path } from "../../routes/allRoutes"

const Navbar = props => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  const getActiveClassName = currentPathName => {
    if (Array.isArray(currentPathName)) {
      return currentPathName.includes(location.pathname) ? "active" : ""
    }
    return location.pathname === currentPathName ? "active" : ""
  }
 
  return (
    <div className="container-fluid">
      <div className="topnav">
        <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
          <Collapse isOpen={props.leftMenu} className="navbar-collapse" id="topnav-menu-content">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${getActiveClassName("/dashboard")}`} to="/dashboard">
                  <i className="uil-home-alt me-2"></i> {props.t("Dashboard")}
                </Link>
              </li>

              {/* Cases Dropdown */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setActiveDropdown("cases")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to="#"
                  className={`nav-link dropdown-toggle arrow-none ${getActiveClassName([
                    Path.deceased,
                    Path.nonResidential,
                  ])}`}
                >
                  <i className="uil-layers me-2"></i>
                  {props.t("Cases")}
                  <div className="arrow-down ms-1"></div>
                </Link>

                <div className={classname("dropdown-menu", { show: activeDropdown === "cases" })}>
                  <Link to={Path.deceased} className={`dropdown-item ${getActiveClassName(Path.deceased)}`}>
                    {props.t("Deceased")}
                  </Link>
                  <Link
                    to={Path.nonResidential}
                    className={`dropdown-item ${getActiveClassName(Path.nonResidential)}`}
                  >
                    {props.t("Non-Residential")}
                  </Link>
                </div>
              </li>

              {/* Resources Dropdown */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setActiveDropdown("resources")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to="#"
                  className={`nav-link dropdown-toggle arrow-none ${getActiveClassName(["/resources/faq"])}`}
                >
                  <i className="uil-apps me-2"></i>
                  {props.t("Resources")}
                  <div className="arrow-down ms-1"></div>
                </Link>

                <div className={classname("dropdown-menu", { show: activeDropdown === "resources" })}>
                  <Link to={Path.faq} className={`dropdown-item ${getActiveClassName(Path.faq)}`}>
                    {props.t("FAQ")}
                  </Link>
                </div>
              </li>
            </ul>
          </Collapse>
        </nav>
      </div>
    </div>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  t: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  leftMenu: state.Layout.leftMenu,
})

export default connect(mapStateToProps)(withTranslation()(Navbar))
