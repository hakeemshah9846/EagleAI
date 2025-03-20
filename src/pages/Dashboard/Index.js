import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BarChart from "../../components/Charts/BarChart";
// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import MiniWidget from "./MiniWidget";
import UsaChart from "./UsaChart"
import SellingProduct from "./SellingProduct";
import TopUser from "./TopUsers";
import RecentActivity from "./Activity"
import SocialSource from "./SocialSource"
import Loader from "../../components/Loader/Loader";

const rdcData = [
        { x: "Multiple Accepted Ballots", Found: 13, Voted: 3 },
        { x: "Cancelled Registration", Found: 4485, Voted: 4402 },
        { x: "Deceased Not Verified", Found: 14288, Voted: 14161 },
        { x: "Deceased Verified", Found: 87, Voted: 81 },
        { x: "Non-Residential Not Verified", Found: 0, Voted: 0 },
        { x:"Moved Verified VoteRef", Found: 58, Voted: 57 },
  ];
const uspsCassData = [
    {
        x:"No Forward Address",
        Found: 4116,
        Voted: 4054
    },
    {
        x:"Address Not Known",
        Found:12031,
        Voted:11936
    },
    {
        x:"Invalid Address",
        Found:47542,
        Voted:47264
    },
    {
        x:"Partial Address",
        Found:67927,
        Voted:67417
    },
    {
        x:"Business Address",
        Found:21250,
        Voted:20784
    },
    {
        x:"PO Type Box",
        Found:8053,
        Voted:7984
    },
    {
        x:"Not Receiving Delivery",
        Found:0,
        Voted:0
    }
]

// const uspsNcoaPermanentMoveData = [
//     {
//         x:"Moved Only",
//         Found: 0,
//         Voted: 0
//     },
//     {
//         x:"Moved & Registered",
//         Found: 385,
//         Voted: 366
//     },
//     {
//         x:"Moved Reg & Voted",
//         Found: 196,
//         Voted: 187
//     }

// ]

// const countyAssessorData = [
//     {
//         x:"Homestead Tax Exempt",
//         Found:"196",
//         Voted:"187"
//     }
// ]

// const registrationErrorData = [
//     {
//         x:"Incomplete Name Not Verified",
//         Found: 0,
//         Voted: 0
//     },
//     {
//         x:"Incomplete Name Verified",
//         Found: 75,
//         Voted: 73
//     },
//     {
//         x:"Incomplete Address Verified",
//         Found: 0,
//         Voted: 0
//     },
//     {
//         x:"Property Code Not Residential",
//         Found: 119453,
//         Voted: 118647
//     },
// ]

const Dashboard = () => {
    document.title = "Dashboard | EagleAI"

    const [loading, setIsLoading] = useState(false);

    if (loading) {
    return  <div style={{height:"100vh", width:"100vw", display:"grid", placeItems:'center', background:"white"}}> <Loader /> </div>
  }
    
    return ( 
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />
                    <Row>
                        <MiniWidget />
                    </Row>
                    <Row>
                        {/* <Col md={8}>
                            <UsaChart />
                        </Col> */}
                        <Col>
                            <SellingProduct />
                        </Col>
                    </Row>
                    <Row>
                         <Col md={6} >
                            <Card no-body="true">
                                <CardBody>
                                    <BarChart chartTitle="Registrations, Deceased, Cancelled" data={rdcData} />
                                </CardBody>
                            </Card>
                         </Col>
                         <Col md={6} >
                            <Card no-body="true">
                                <CardBody>
                                    <BarChart chartTitle="USPS CASS" data={uspsCassData} />
                                </CardBody>
                            </Card>
                         </Col>
                    </Row>
                    {/* <Row className="mt-4">
                         <Col md={6} >
                            <div className="bg-white"> 
                                <BarChart chartTitle="USPS NCOA Permanent Move" data={uspsNcoaPermanentMoveData} />
                            </div>
                         </Col>
                         <Col md={6} >
                            <div className="bg-white"> 
                                <BarChart chartTitle="Registration Error" data={countyAssessorData} />
                            </div>
                         </Col>
                    </Row>
                    <Row className="mt-4">
                         <Col md={6} >
                            <div className="bg-white"> 
                                <BarChart chartTitle="USPS NCOA Permanent Move" data={registrationErrorData} />
                            </div>
                         </Col> 
                    </Row> */}
                    <Row className="mt-4">
                        <Col>
                            <TopUser />
                        </Col>
                        <Col>
                            <RecentActivity />
                        </Col>
                        <Col>
                            <SocialSource />
                        </Col>
                    </Row>
                </Container>
            </div> 
    );
};

export default Dashboard;
