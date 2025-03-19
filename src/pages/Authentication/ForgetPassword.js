import PropTypes from "prop-types"
import React, { useEffect } from "react"
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap"
import ClipLoader from "react-spinners/ClipLoader";
// Redux
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import withRouter from "../../components/Common/withRouter"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// action
import { userForgetPassword } from "../../store/actions"
import useForgetPasswordSelector from "./hooks/useForgetPasswordSelector"

const ForgetPasswordPage = props => {
  // document.title=" Recover Password | Minible - Responsive Bootstrap 5 Admin Dashboard"
  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please Enter Your Email"),
    }),
    onSubmit: values => {
      dispatch(userForgetPassword(values, props.history))
    },
  })

  useEffect(() => {
    document.body.className = "authentication-bg"
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = ""
    }
  })

  const { forgetError, forgetSuccessMsg,status } = useForgetPasswordSelector()

  return (
    <div className="account-pages my-5  pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <div>
              <Link to="/" className="mb-5 d-block auth-logo">
                <h2>EagleAI</h2>
              </Link>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Reset Password</h5>
                    <p className="text-muted">Reset Password with EagleAI.</p>
                  </div>
                  <div className="p-2 mt-4">
                    <div
                      className="alert alert-success text-center mb-4"
                      role="alert"
                    >
                      Enter your Email and instructions will be sent to you!
                    </div>
                    {forgetError ? (
                      <Alert
                        color="danger"
                        className="text-center mb-4"
                        style={{ marginTop: "13px" }}
                      >
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert
                        color="success"
                        className="text-center mb-4"
                        style={{ marginTop: "13px" }}
                      >
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}

                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-0">
                        <Col xs={12} className="text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            {status === "loading" ? (
                              <ClipLoader
                                color={"#fff"}
                                loading={status === "loading"}
                                size={15}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            ) : (
                              "Reset"
                            ) }
                          </button>
                        </Col>
                      </Row>
                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Remember It ?{" "}
                          <Link to="/login" className="fw-medium text-primary">
                            {" "}
                            Signin{" "}
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p> © {new Date().getFullYear()} EagleAI.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.any,
  forgetSuccessMsg: PropTypes.any,
  history: PropTypes.object,
  userForgetPassword: PropTypes.func,
}

export default withRouter(ForgetPasswordPage)
