import React, { useState } from "react";
import { Table, Button, Form, Pagination, Badge, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import VerticalLayout from "../../components/VerticalLayout";
import HorizontalLayout from "../../components/HorizontalLayout";

const DeceasedTable = (props) => {
    const navigate = useNavigate();

    // Determine which layout to use
    const Layout = props.layoutType === "horizontal" ? HorizontalLayout : VerticalLayout;

    const [dataList] = useState([
        { id: 1, name: "Connie Franco", state: "GA", assigner: "Rick Richards", last_voted: "2018", voter_status: "Active" },
        { id: 2, name: "Paul Reynolds", state: "GA", assigner: "Rick Richards", last_voted: "2018", voter_status: "Active" },
        { id: 3, name: "Ronald Patterson", state: "GA", assigner: "Rick Richards", last_voted: "2018", voter_status: "Inactive" },
        { id: 4, name: "Adella Perez", state: "GA", assigner: "Rick Richards", last_voted: "2018", voter_status: "Active" },
        { id: 5, name: "Theresa Mayers", state: "GA", assigner: "Rick Richards", last_voted: "2018", voter_status: "Active" },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const totalPages = Math.ceil(dataList.length / perPage);
    // Sorting state
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "none" });

    // Toggle sorting logic (ascending → descending → none)
    const handleSort = (key) => {
        let newDirection;
        if (sortConfig.key === key) {
            newDirection = sortConfig.direction === "ascending" ? "descending" :
                sortConfig.direction === "descending" ? "none" : "ascending";
        } else {
            newDirection = "ascending";
        }

        setSortConfig({ key, direction: newDirection });
    };

    // Sorting function
    const sortedData = [...dataList];
    if (sortConfig.direction !== "none" && sortConfig.key) {
        sortedData.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
            return 0;
        });
    };


    // const getSortIcon = (key) => {
    //     let iconClass = "uil   p-2"; // Default arrow
    //     let style = { transition: "transform 0.3s ease, opacity 0.3s ease" }; // Smooth effect
    //     console.log(sortConfig.direction)
    //     if (sortConfig.key !== key) {
    //         style.opacity = 0.4; // Faded when sorting is "none"
    //     } else if (sortConfig.direction == "ascending") {
    //         style.transform = "rotate(180deg)"; // Rotate for up arrow
    //     } else if (sortConfig.direction == "descending") {

    //         style.transform = "rotate(180deg)"; // Normal down arrow
    //     } else {
    //         style.opacity = 0.4; // Faded when sorting is disabled
    //     }

    //     return <i className={iconClass} style={style}></i>;
    // };

    const getSortIcon = (key) => {
        let iconClass = "uil p-2 "; // Base class
        let style = { transition: "transform 0.3s ease, opacity 0.3s ease" }; // Smooth effect

        if (sortConfig.key !== key) {
            iconClass += "uil-arrow-down";
            style.opacity = 0.4; // Default icon (down arrow)
        } else if (sortConfig.direction === "ascending") {
            iconClass += " uil-arrow-up"; // Use up arrow class
        } else if (sortConfig.direction === "descending") {
            iconClass += " uil-arrow-down"; // Use down arrow class
        }
        else {
            iconClass += "uil-arrow-down";
            style.opacity = 0.4;
        }

        return <i className={iconClass} style={style}></i>;
    };

    const [items] = useState([
        {
            text: "Dashboard",
            to: '/'
        },
        {
            text: "Deceased",
            active: true,
        },
    ]);

    return (
        <Layout>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Deceased" items={items} />
                    <Row className="mb-2 border">
                        <Col ><Form.Control style={{
                            borderSpacing: '0 10px',
                            borderColor: '#ddd'
                        }} type="text" placeholder="Name" /></Col>
                        <Col><Form.Control style={{
                            borderSpacing: '0 10px',
                            borderColor: '#ddd'
                        }} type="text" placeholder="State" /></Col>
                        <Col><Form.Control style={{
                            borderSpacing: '0 10px',
                            borderColor: '#ddd'
                        }} type="text" placeholder="Assigner" /></Col>
                        <Col><Form.Control style={{
                            borderSpacing: '0 10px',
                            borderColor: '#ddd'
                        }} type="text" placeholder="Last Voted" /></Col>
                        <Col md="1">
                            <Button variant="warning"><i className="uil uil-search"></i></Button>
                        </Col>
                    </Row>

                    <div className="table-responsive mb-0">
                        <Table
                            hover className="table-centered table-card-list ">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                                        Name {getSortIcon("name")}
                                    </th>
                                    <th onClick={() => handleSort("state")} style={{ cursor: "pointer" }}>
                                        State {getSortIcon("state")}
                                    </th>
                                    <th onClick={() => handleSort("assigner")} style={{ cursor: "pointer" }}>
                                        Assigner {getSortIcon("assigner")}
                                    </th>
                                    <th onClick={() => handleSort("last_voted")} style={{ cursor: "pointer" }}>
                                        Last Voted {getSortIcon("last_voted")}
                                    </th>
                                    <th onClick={() => handleSort("voter_status")} className="text-center" style={{ cursor: "pointer" }}>
                                        Voter Status {getSortIcon("voter_status")}
                                    </th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map((item, index) => (
                                    <tr key={index} onClick={() => navigate(`/cases/deceased/${item.id}`)} style={{ cursor: "pointer" }}>
                                        <td>{item.name}</td>
                                        <td>{item.state}</td>
                                        <td>{item.assigner}</td>
                                        <td>{item.last_voted}</td>
                                        <td className="text-center">
                                            <div className={`badge rounded-pill bg-soft-${item.voter_status === "Inactive" ? "warning" : "success"} font-size-12`}>
                                                {item.voter_status}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Button className="text-warning" variant="link" onClick={() => navigate(`/cases/deceased/${item.id}`)}>
                                                <i className="uil uil-search text-warning"></i> Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <Row>
                        <Col>
                            <label className="d-inline-flex align-items-center fw-normal">
                                Show&nbsp;
                                <select
                                    className="form-select form-select-sm"
                                    value={perPage}
                                    onChange={(e) => setPerPage(Number(e.target.value))}
                                >
                                    {[10, 25, 50, 100].map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                                &nbsp;entries
                            </label>
                        </Col>

                        <Col>
                            <div className="dataTables_paginate paging_simple_numbers float-end">
                                <ul className="pagination pagination-rounded">
                                    <ul className="pagination justify-content-start" role="menubar" aria-disabled="false" aria-label="Pagination">

                                        {/* First Page */}
                                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                            <button className="page-link" aria-label="Go to first page"
                                                onClick={() => setCurrentPage(1)}
                                                disabled={currentPage === 1}>
                                                «
                                            </button>
                                        </li>

                                        {/* Previous Page */}
                                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                            <button className="page-link" aria-label="Go to previous page"
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}>
                                                ‹
                                            </button>
                                        </li>

                                        {/* Page Numbers */}
                                        {[...Array(totalPages)].map((_, i) => (
                                            <li key={i} className="page-item" role="presentation">
                                                <button
                                                    className="page-link"
                                                    aria-label={`Go to page ${i + 1}`}
                                                    aria-posinset={i + 1}
                                                    aria-checked={currentPage === i + 1}
                                                    aria-setsize={totalPages}
                                                    role="menuitemradio"
                                                    type="button"
                                                    tabIndex={currentPage === i + 1 ? "0" : "-1"}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    style={currentPage === i + 1 ? {
                                                        backgroundColor: "#f1b44c",
                                                        borderColor: "#f1b44c",

                                                        color: "white",
                                                        fontWeight: "bold"
                                                    } : {}}
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}

                                        {/* Next Page */}
                                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                            <button className="page-link" aria-label="Go to next page"
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}>
                                                ›
                                            </button>
                                        </li>

                                        {/* Last Page */}
                                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                            <button className="page-link" aria-label="Go to last page"
                                                onClick={() => setCurrentPage(totalPages)}
                                                disabled={currentPage === totalPages}>
                                                »
                                            </button>
                                        </li>

                                    </ul>
                                </ul>
                            </div>
                        </Col>
                    </Row>




                </Container>
            </div>
        </Layout>
    );
};

// Map Redux state to props
const mapStateToProps = (state) => ({
    layoutType: state.Layout.layoutType, // Ensure layout state exists in Redux store
});

// Connect component to Redux
export default connect(mapStateToProps)(DeceasedTable);
