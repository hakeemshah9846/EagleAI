import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card,
    CardBody,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Progress,
} from 'reactstrap';

const SellingProduct = () => {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

    return (
        <Card>
            <CardBody>
                {/* <div className="float-end">
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} direction="end">
                        <DropdownToggle caret className="text-reset p-0" color="white">
                            <span className="fw-semibold">Sort By:</span>
                            <span className="text-muted">
                                Yearly
                                <i className="mdi mdi-chevron-down ms-1"></i>
                            </span>
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem>Monthly</DropdownItem>
                            <DropdownItem>Yearly</DropdownItem>
                            <DropdownItem>Weekly</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div> */}

                <h4 className="card-title mb-4">Overview</h4>

                <Row className="align-items-center no-gutters mt-3">
                    <Col sm="4">
                        <p className="text-truncate mt-1 mb-0">
                            <i className="mdi mdi-circle-medium text-primary me-2"></i> Registrations, Deceased, Cancelled
                        </p>
                    </Col>
                    <Col sm="8">
                        <Progress value={52} color="primary" className="mt-1" style={{ height: '6px' }} />
                    </Col>
                </Row>

                <Row className="align-items-center no-gutters mt-3">
                    <Col sm="4">
                        <p className="text-truncate mt-1 mb-0">
                            <i className="mdi mdi-circle-medium text-info me-2"></i> USPS CASS
                        </p>
                    </Col>
                    <Col sm="8">
                        <Progress value={45} color="info" className="mt-1" style={{ height: '6px' }} />
                    </Col>
                </Row>

                <Row className="align-items-center no-gutters mt-3">
                    <Col sm="4">
                        <p className="text-truncate mt-1 mb-0">
                            <i className="mdi mdi-circle-medium text-success me-2"></i> USPS NCOA Permanent Move
                        </p>
                    </Col>
                    <Col sm="8">
                        <Progress value={48} color="success" className="mt-1" style={{ height: '6px' }} />
                    </Col>
                </Row>

                <Row className="align-items-center no-gutters mt-3">
                    <Col sm="4">
                        <p className="text-truncate mt-1 mb-0">
                            <i className="mdi mdi-circle-medium text-warning me-2"></i> Registration Error
                        </p>
                    </Col>
                    <Col sm="8">
                        <Progress value={78} color="warning" className="mt-1" style={{ height: '6px' }} />
                    </Col>
                </Row>

                {/* <Row className="align-items-center no-gutters mt-3">
                    <Col sm="3">
                        <p className="text-truncate mt-1 mb-0">
                            <i className="mdi mdi-circle-medium text-purple me-2"></i> Cables
                        </p>
                    </Col>
                    <Col sm="9">
                        <Progress value={63} color="purple" className="mt-1" style={{ height: '6px' }} />
                    </Col>
                </Row> */}
            </CardBody>
        </Card>
    );
};

export default SellingProduct;