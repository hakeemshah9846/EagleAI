import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "../Common/withRouter";
import { Link, useLocation } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  // const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      // scrollElement(item);
      return false;
    }
    // scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  // useEffect(() => {
  //   ref.current.recalculate();
  // }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  // function scrollElement(item) {
  //   if (item) {
  //     const currentPosition = item.offsetTop;
  //     if (currentPosition > window.innerHeight) {
  //       ref.current.getScrollElement().scrollTop = currentPosition - 300;
  //     }
  //   }
  // }
  return (
    <React.Fragment>

      <SimpleBar style={{ maxHeight: "100%" }}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="uil-home-alt"></i>
                <span className="badge rounded-pill bg-primary float-end">
                  01
                </span>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Apps")}</li>

            <li>
              <Link to="#" className=" waves-effect">
                <i className="uil-calender"></i>
                <span>{props.t("Calendar")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="waves-effect">
                <i className="uil-comments-alt"></i>
                {/* <span className="badge rounded-pill bg-warning float-end"> {props.t("New")} </span> */}
                <span>{props.t("Chat")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="waves-effect">
                <i className="uil-comments-alt"></i>
                {/* <span className="badge rounded-pill bg-warning float-end"> {props.t("New")} </span> */}
                <span>{props.t("File Manager")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-store"></i>
                <span>{props.t("Ecommerce")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Products")}</Link>
                </li>
                <li>
                  <Link to="#">
                    {props.t("Product Detail")}
                  </Link>
                </li>
                <li>
                  <Link to="#">{props.t("Orders")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Customers")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Cart")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Checkout")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Shops")}</Link>
                </li>
                <li>
                  <Link to="#">
                    {props.t("Add Product")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-envelope"></i>
                <span>{props.t("Email")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Inbox")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Read Email")} </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-invoice"></i>
                <span>{props.t("Invoices")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Invoice List")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Invoice Detail")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-book-alt"></i>
                <span>{props.t("Contacts")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("User Grid")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("User List")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Profile")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">Pages</li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-user-circle"></i>
                <span>{props.t("Authentication")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="#">
                    {props.t("Recover Password")}
                  </Link>
                </li>
                <li>
                  <Link to="#">{props.t("Lock Screen")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-file-alt"></i>
                <span>{props.t("Utility")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Starter Page")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Maintenance")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Coming Soon")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Timeline")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("FAQs")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Pricing")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Error 404")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Error 500")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">{props.t("Components")}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-flask"></i>
                <span>{props.t("UI Elements")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Offcanvas")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="#">
                    {props.t("Session Timeout")}
                  </Link>
                </li>
                <li>
                  <Link to="#">{props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Placeholders")}</Link>
                </li>                
                <li>
                  <Link to="#">
                    {props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="#">{props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Utilities")}
                    <span className="badge rounded-pill bg-success float-end"> {props.t("New")} </span>
                  </Link>
                </li>
                <li>
                  <Link to="#">{props.t("Toasts")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("General")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Colors")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Notifications")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="waves-effect">
                <i className="uil-shutter-alt"></i>
                <span className="badge rounded-pill bg-info float-end">9</span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Basic Elements")}</Link>
                </li>
                <li>
                  <Link to="#">
                    {props.t("Form Validation")}
                  </Link>
                </li>
                <li>
                  <Link to="#">{props.t("Form Advanced")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Form Editors")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Form File Upload")} </Link>
                </li>
                <li>
                  <Link to="#">{props.t("Form Repeater")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Form Mask")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-list-ul"></i>
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Basic Table")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Data Table")}</Link>
                </li>
                <li>
                  <Link to="#">
                    {props.t("Responsive Table")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-chart"></i>
                <span>{props.t("Charts")}</span>
              </Link>

              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Apex")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Chartjs")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("E Chart")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Jquery Knob")}</Link>
                </li>
                <li>
                  <Link to="#">
                    {props.t("Sparkline Chart")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-streering"></i>
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Unicons")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Boxicons")}</Link>
                </li>
                <li>
                  <Link to="#">
                    {props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="#">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Font awesome")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-location-point"></i>
                <span>{props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Google Maps")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Vector Maps")}</Link>
                </li>
                
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-share-alt"></i>
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));