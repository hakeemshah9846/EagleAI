import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, BreadcrumbItem } from "reactstrap";

const Breadcrumb = props => {
    return (
        <Row>
            <Col className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">{ props.title }</h4>
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            { props.items?.map((segment, index) => {
                                return segment?.to ? (
                                    <BreadcrumbItem key={index}>
                                        <Link to={segment.to}>{segment?.text}</Link>
                                    </BreadcrumbItem>
                                ) : (
                                    <BreadcrumbItem key={index} active>
                                        <span>{segment?.text}</span>
                                    </BreadcrumbItem>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

Breadcrumb.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array
}

export default Breadcrumb
