import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, Button, Form, Alert, Image, Modal } from "react-bootstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import HorizontalLayout from "../../components/HorizontalLayout";
import VerticalLayout from "../../components/VerticalLayout";
import img2 from "../../assets/images/small/img-2.jpg";

const VoterDetails = (props) => {
    const Layout = props.layoutType === "horizontal" ? HorizontalLayout : VerticalLayout;
    const name = "John Doe"; // Dynamically fetched name
    // const [singleImage, setSingleImage] = useState(false);

    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleShow = (imgSrc) => {
        setSelectedImage(imgSrc);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const items = [
        {
            text: "Dashboard",
            to: '/'
        },
        {
            text: "Deceased",
            to: '/cases/deceased'
        },
        {
            text: name,
            active: true,
        },
    ];

    return (
        <Layout>
            <div className="page-content">
                <Container fluid >
                    <Breadcrumbs title={name} items={items} />

                    <Row>
                        <Col lg={10}>
                            <Card>
                                <Card.Header>
                                    <h6>
                                        <i className="uil uil-user me-3"></i>Details
                                    </h6>
                                </Card.Header>
                                <Card.Body>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label>Registration Number</Form.Label>
                                            <Form.Control type="text" readOnly value="123456" className="border-2 border-sos" />
                                        </Col>
                                        <Col>
                                            <Form.Label>Voter Status</Form.Label>
                                            <Form.Control type="text" readOnly value="Inactive" className="border-2 border-sos" />
                                        </Col>
                                        <Col>
                                            <Form.Label>Status Reason</Form.Label>
                                            <Form.Control type="text" readOnly value="Returned Mail" className="border-2 border-sos" />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label>County where Registered</Form.Label>
                                            <Form.Control type="text" readOnly value="CHATHAM" className="border-2 border-ncoa" />
                                        </Col>
                                        <Col>
                                            <Form.Label>Date Last Voted</Form.Label>
                                            <Form.Control type="text" readOnly value="07/06/2024" className="border-2 border-ncoa" />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="firstName">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="John" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="middleName">
                                                <Form.Label>Middle Name</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="maidenName">
                                                <Form.Label>Maiden Name</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="lastName">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="Doe" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Group controlId="suffix">
                                                <Form.Label>Suffix</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="Mr" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="registrationAddress1">
                                                <Form.Label>Registration Address 1</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="1234 DEMO ST" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="registrationAddress2">
                                                <Form.Label>Registration Address 2</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="residenceUnitNumber">
                                                <Form.Label>Residence Unit Number</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="1234" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="residenceCity">
                                                <Form.Label>Residence City</Form.Label>
                                                <Form.Control type="text" className="border-2 border-obits" readOnly value="New York" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="residenceState">
                                                <Form.Label>Residence State</Form.Label>
                                                <Form.Control type="text" className="border-2 border-obits" readOnly value="NY" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="residenceZip">
                                                <Form.Label>Residence Zip</Form.Label>
                                                <Form.Control type="text" className="border-2 border-obits" readOnly value="12345" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="owner1">
                                                <Form.Label>Owner 1 of Property</Form.Label>
                                                <Form.Control type="text" className="border-2 border-obits" readOnly value="12345" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="homesteadExemption">
                                                <Form.Label>Homestead Exemption Indicator</Form.Label>
                                                <Form.Control type="text" className="border-2 border-obits" readOnly value="HOME" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Group controlId="exemptStatus">
                                                <Form.Label>EXEMPT</Form.Label>
                                                <Form.Control type="text" className="border-2 border-obits" readOnly value="E" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="publicSchool">
                                                <Form.Label>Public School</Form.Label>
                                                <Form.Control type="text" className="border-2 border-ncoa" readOnly value="9203" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="numberRecords">
                                                <Form.Label>Number Records at this address</Form.Label>
                                                <Form.Control type="text" className="border-2 border-ncoa" readOnly value="1" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="residenceStreetNumber">
                                                <Form.Label>Residence Street Number</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="111111" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="residencePreDirection">
                                                <Form.Label>Residence Pre Direction</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="residenceStreetName">
                                                <Form.Label>Residence Street Name</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="PO BOX 1111" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="residenceStreetSuffix">
                                                <Form.Label>Residence Street Suffix</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="residencePostDirection">
                                                <Form.Label>Residence Post Direction</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="residenceUnitType">
                                                <Form.Label>Residence Unit Type</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group controlId="residenceCity">
                                                <Form.Label>Residence City</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="SAVANNAH" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="residenceState">
                                                <Form.Label>Residence State</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="GEO" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="mailZipCode">
                                                <Form.Label>Mail Zip Code</Form.Label>
                                                <Form.Control type="text" className="border-2 border-property" readOnly value="31404" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Header>
                                    <h6>
                                        <i className="uil uil-user me-3"></i>Obituary Picture
                                    </h6>
                                    <Row className="pt-2">
                                        <Col xs={12} className="d-flex justify-content-between">
                                            <Button variant="link" className="px-0">
                                                <i className="uil uil-plus"></i> Add Photo
                                            </Button>
                                            <Button variant="link" className="px-0">
                                                <i className="uil uil-plus"></i> Add Link
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className="d-flex justify-content-between">

                                    {/* Image Gallery */}
                                    <Col md={8}>
                                        <Row>
                                            {[...Array(4)].map((_, index) => (
                                                <Col key={index} md={3}>
                                                    <Image
                                                        src={img2}
                                                        className="rounded-0 mb-2"
                                                        style={{ cursor: "pointer" }}
                                                        fluid
                                                        onClick={() => handleShow(img2)}
                                                    />
                                                </Col>
                                            ))}
                                        </Row>

                                        <Row>
                                            {[...Array(4)].map((_, index) => (
                                                <Col key={index} md={3}>
                                                    <Image
                                                        src={img2}
                                                        className="rounded-0 mb-2"
                                                        style={{ cursor: "pointer" }}
                                                        fluid
                                                        onClick={() => handleShow(img2)}
                                                    />
                                                </Col>
                                            ))}
                                        </Row>

                                        {/* Modal for Image Popup */}
                                        <Modal show={show} onHide={handleClose} centered>
                                            <Modal.Body className="text-center">
                                                {selectedImage && (
                                                    <Image src={selectedImage} fluid className="rounded" />
                                                )}
                                            </Modal.Body>
                                        </Modal>
                                    </Col>

                                    {/* External Links */}
                                    <Col md={4}>
                                        {[...Array(3)].map((_, index) => (
                                            <Row key={index}>
                                                <Col md={12} className="text-end">
                                                    <small className="text-muted">www.google.com</small>
                                                    <Button variant="link">
                                                        <i className="uil uil-globe"></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        ))}
                                    </Col>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Header>
                                    <h6>
                                        <i className="uil uil-user me-3"></i>Submission
                                    </h6>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col className="text-center">
                                            <Alert variant="secondary">Verify Obituary matches! Be 100% sure!</Alert>
                                        </Col>
                                        <Col className="text-center">
                                            <Button variant="success" size="lg" className="mx-2">
                                                <i className="uil-check-circle"></i> Valid
                                            </Button>
                                            <Button variant="danger" size="lg" className="mx-2">
                                                <i className="uil-times-circle"></i> Deceased
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <Button variant="link" className="px-0">
                                                    <i className="uil uil-plus"></i> Add Review Note
                                                </Button>
                                                <Button variant="link" className="px-0">
                                                    <i className="uil uil-database"></i> List
                                                </Button>
                                            </div>
                                            <Form.Control as="textarea" className="border-sos" />
                                        </Col>

                                        <Col>
                                            <div className="d-flex justify-content-between">
                                                <Button variant="link" className="px-0">
                                                    <i className="uil uil-plus"></i> Add Submission Note
                                                </Button>
                                                <Button variant="link" className="px-0">
                                                    <i className="uil uil-database"></i> List
                                                </Button>
                                            </div>
                                            <Form.Control as="textarea" className="border-sos" />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={2}>
                            {/* Review Status Card */}
                            <Card >
                                <Card.Body>
                                    <Row className="align-items-center">
                                        <Col md={12} className="mb-2">
                                            <b>Review Status</b>
                                        </Col>
                                        <Col md={12}>
                                            <Alert variant="success" className="mb-0">
                                                <i className="uil uil-check-circle"></i> Deceased - Back-Committed on 12-12-2024 07:10:11 PM
                                            </Alert>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Action Buttons Card */}
                            <Card className="mt-3">
                                <Card.Body>
                                    <Button variant="primary" className="w-100 btn-soft-primary">
                                        Constrain to <br /> exact matches
                                    </Button>

                                    <Button variant="success" className="w-100 mt-4 btn-soft-success">
                                        Assignments
                                    </Button>

                                    <Button variant="info" className="w-100 mt-4 btn-soft-info">
                                        1 Submission...
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    layoutType: state.Layout.layoutType,
});

export default connect(mapStateToProps)(VoterDetails);
