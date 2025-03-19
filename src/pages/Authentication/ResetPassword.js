import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userResetPassword, validateResetToken } from "../../store/auth/resetpwd/action"; 

const messageTypes = {
    success:"success",
    failure:"failure"
}
const ResetPassword = () => {
    document.title = "Reset Password | Minible - Responsive Admin Dashboard";

    const { token } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isValidToken = useSelector((state) => state.ResetPassword.isValidToken);
    const validatingToken = useSelector((state) => state.ResetPassword.validatingToken);
    const { resetSuccessMsg, resetError, loading } = useSelector((state) => state.ResetPassword);

    const [message, setMessage] = useState({
        type:"",
        content:""
    });
    
 
    /** Validate Reset Token */
    useEffect(() => {
        if (token) {
            dispatch(validateResetToken(token));
        }
    }, [dispatch, token]);

    /** Handle success or error messages */
    useEffect(() => {
        if (resetSuccessMsg) {
            setMessage({
                type: messageTypes.success,
                content:"Password reset successful! Redirecting to login..."
            });
            setTimeout(() => navigate("/login"), 3000);
        } else if (resetError){
            setMessage({
                type: messageTypes.failure,
                content:"Failed to reset password. Try again."
            });
         }  
    }, [resetSuccessMsg, resetError, isValidToken, navigate]);

    /** Formik for handling password reset */
    const validation = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Please enter a new password")
                .min(6, "Password must be at least 6 characters"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm your password"),
        }),
        onSubmit: (values) => {
            dispatch(userResetPassword(token, values.password, values.confirmPassword));
            setMessage("Processing password reset...");
        },
    });

    return (
        <div className="account-pages my-5 pt-sm-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <h2 className="mb-5 d-block auth-logo">EagleAI</h2>

                        {validatingToken ? (
                            <div className="text-center">
                                <ClipLoader color="#C9B037" size={50} />
                                <p className="mt-3">Validating token, please wait...</p>
                            </div>
                        ) : !isValidToken ? (
                            <Card>
                                <CardBody className="p-4 text-center">
                                    <h5 className="text-danger">Token Expired</h5>
                                    <p className="text-muted">
                                        The token is expired. Please get in touch with the administrator.
                                    </p>
                                </CardBody>
                            </Card>
                        ) : (
                            <Card>
                                <CardBody className="p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">Reset Password</h5>
                                        <p className="text-muted">Enter a new password to reset your account.</p>
                                    </div>

                                    <div className="p-2 mt-4">
                                        <Form onSubmit={validation.handleSubmit}>
                                            <div className="mb-3">
                                                <Label className="form-label">New Password</Label>
                                                <Input
                                                    name="password"
                                                    type="password"
                                                    placeholder="Enter new password"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.password}
                                                    invalid={validation.touched.password && validation.errors.password}
                                                />
                                                <FormFeedback>{validation.errors.password}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Confirm Password</Label>
                                                <Input
                                                    name="confirmPassword"
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.confirmPassword}
                                                    invalid={validation.touched.confirmPassword && validation.errors.confirmPassword}
                                                />
                                                <FormFeedback>{validation.errors.confirmPassword}</FormFeedback>
                                            </div>

                                            {message && <p className={message.type === "failure" ? "text-center text-danger" : "text-center text-success"}>{message.content}</p>}

                                            <Row className="mb-0">
                                                <Col xs={12} className="text-end">
                                                    <button
                                                        className="btn btn-primary w-md waves-effect waves-light"
                                                        type="submit"
                                                        disabled={loading}
                                                    >
                                                        {loading ? <ClipLoader color="#fff" size={20} /> : "Reset Password"}
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        )}

                        <div className="mt-5 text-center">
                            <p> © {new Date().getFullYear()} EagleAI.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

ResetPassword.propTypes = {
    userResetPassword: PropTypes.func,
    validateResetToken: PropTypes.func,
};

export default ResetPassword;
