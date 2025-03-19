import PropTypes from "prop-types";
import React, { useEffect } from "react";
import withRouter from "./Common/withRouter";
import { useLocation, Navigate } from "react-router-dom";

const NonAuthLayout = (props) => {
    const path = useLocation();
    useEffect(() => {
        const title    = path.pathname;
        let currentage = title.charAt(1).toUpperCase() + title.slice(2).replace(/-/g, ' ');

        document.title = currentage + " | EagleAI";
    }, [path.pathname]);

    if (localStorage.getItem("authUser")) {
        return (
            <Navigate to={{ pathname: "/dashboard" }} />
        );
    }

    return <React.Fragment>{props.children}</React.Fragment>;
};

NonAuthLayout.propTypes = {
    children: PropTypes.any,
    location: PropTypes.object,
};

export default withRouter(NonAuthLayout);
