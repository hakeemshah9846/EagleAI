// @flow
import {
    CHANGE_LAYOUT,
    CHANGE_LAYOUT_MODE,
    CHANGE_LAYOUT_WIDTH,
    CHANGE_SIDEBAR_THEME,
    CHANGE_TOPBAR_THEME,
    CHANGE_SIDEBAR_SIZE,
    SHOW_RIGHT_SIDEBAR,
    CHANGE_PRELOADER,
    TOGGLE_LEFTMENU,
    SHOW_SIDEBAR,
} from "./actionTypes";

//constants
import {
    layoutTypes,
    layoutModeTypes,
    layoutWidthTypes,
    topBarThemeTypes,
    sidebarSizeTypes,
    leftSideBarThemeTypes
} from "../../constants/layout";

const INIT_STATE = {
    layoutType: layoutTypes.HORIZONTAL,
    layoutModeType: layoutModeTypes.LIGHT,
    layoutWidth: layoutWidthTypes.FLUID,
    leftSideBarTheme: leftSideBarThemeTypes.LIGHT,
    topbarTheme: topBarThemeTypes.DARK,
    sidebarSizeType: sidebarSizeTypes.DEFAULT,
    isPreloader: false,
    showRightSidebar: false,
    isMobile: false,
    showSidebar: true,
    leftMenu: false,
};

const Layout = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_LAYOUT:
            return {
                ...state,
                layoutType: action.payload,
            };

        case CHANGE_LAYOUT_MODE:
            return {
                ...state,
                layoutModeType: action.payload,
            }

        case CHANGE_PRELOADER:
            return {
                ...state,
                isPreloader: action.payload,
            };

        case CHANGE_LAYOUT_WIDTH:
            return {
                ...state,
                layoutWidth: action.payload,
            };

        case CHANGE_SIDEBAR_THEME:
            return {
                ...state,
                leftSideBarTheme: action.payload,
            };

        case CHANGE_TOPBAR_THEME:
            return {
                ...state,
                topbarTheme: action.payload,
            };

        case CHANGE_SIDEBAR_SIZE:
            return {
                ...state,
                sidebarSizeType: action.payload,
            }

        case SHOW_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: action.payload,
            };

        case SHOW_SIDEBAR:
            return {
                ...state,
                showSidebar: action.payload,
            };

        case TOGGLE_LEFTMENU:
            return {
                ...state,
                leftMenu: action.payload,
            };

        default:
            return state;
    }
};

export default Layout;
