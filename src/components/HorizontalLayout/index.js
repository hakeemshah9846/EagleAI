import React, { useEffect, useState } from "react";
import  withRouter  from "../Common/withRouter";
import PropTypes from "prop-types";
import "./index.css"
import {
  changeLayout,
  changeLayoutMode,
  changeTopbarTheme,
  changeLayoutWidth, 
} from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

// Other Layout related Component
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import Rightbar from "../CommonForBoth/Rightbar";
import { useLocation } from "react-router-dom";

const Layout = (props) => {
  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Layout;
  const loading = useSelector(state => state.Login.loading)
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      topbarTheme: layout.topbarTheme,
      layoutModeType: layout.layoutModeType,
      layoutWidth: layout.layoutWidth,
      isPreloader: layout.isPreloader,
      showRightSidebar: layout.showRightSidebar,

    })
  ); 
  const {
    topbarTheme,
    layoutModeType,
    layoutWidth, 
    showRightSidebar
  } = useSelector(selectLayoutProperties);
  
const path = useLocation();
  useEffect(() => {
    const title = path.pathname;
    let currentage = title.charAt(1).toUpperCase() + title.slice(2);

    document.title = currentage + " | EagleAI";
  }, [path.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  /*
  layout settings
  */
  useEffect(() => {
    dispatch(changeLayout("horizontal"));
  }, [dispatch]);
 

  useEffect(() => {
    // Show loader on navigation
    document.body.classList.add("loading");
    console.log("Navigating to new page...");

    const preloaderTimeout = setTimeout(() => {
      document.body.classList.remove("loading");
    }, 500);

    return () => clearTimeout(preloaderTimeout);
  }, [path.pathname,loading]);

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [dispatch, topbarTheme]);

  useEffect(() => {
    if (layoutModeType) {
      dispatch(changeLayoutMode(layoutModeType));
    }
  }, [dispatch, layoutModeType]);

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [dispatch, layoutWidth]);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <React.Fragment>
       <div id="preloader">
        <div id="status">
          <div className="spinner">
            <i className="uil-shutter-alt spin-icon"></i>
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <header id="page-topbar">
          <Header
            theme={topbarTheme}
            isMenuOpened={isMenuOpened}
            openLeftMenuCallBack={openMenu}
          ></Header>
          <Navbar menuOpen={isMenuOpened} />
        </header>
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>

      {showRightSidebar ? <Rightbar /> : null}
    </React.Fragment>
  );
};

Layout.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
};

export default withRouter(Layout);
