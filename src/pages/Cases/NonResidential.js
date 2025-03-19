import React, { useState } from "react";
import { connect } from "react-redux";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import HorizontalLayout from "../../components/HorizontalLayout";
import VerticalLayout from "../../components/VerticalLayout";
import { Container} from "react-bootstrap";

const NonResidential = (props) => { 
    const [items] = useState([
        {
            text: "Dashboard",
            to: '/'
        },
        {
            text: "Non-Residential",
            active: true,
        },
    ]);

    // Determine which layout to use
    const Layout = props.layoutType === "horizontal" ? HorizontalLayout : VerticalLayout;

    return (
        <Layout>
            <Container fluid>
                <div className="page-content">
                    <Breadcrumbs title="Non Residential" items={items} />

                </div>
            </Container>
        </Layout>
    );
};

// Map Redux state to props
const mapStateToProps = (state) => ({
    layoutType: state.Layout.layoutType,
});

// Connect component to Redux
export default connect(mapStateToProps)(NonResidential);
