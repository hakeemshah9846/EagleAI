import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Path } from "../../routes/allRoutes"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

// Redux
import { Link, useNavigate } from "react-router-dom"
import withRouter from "../../components/Common/withRouter"

import { useDispatch, useSelector } from "react-redux"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

// actions
import { loginUser } from "../../store/actions"
import useLoginSelector from "./hooks/useLoginSelector"
import Loader from "../../components/Loader/Loader" 

const Login = props => {
  console.log("Login Component rendered...");

  
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: Yup.object({
      account: Yup.string() 
        .required("Please Enter Your account"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      dispatch(loginUser(values, navigate))
    },
  })

  const { error, isAuthenticated, loading } = useLoginSelector()

  useEffect(() => {
    document.body.className = "authentication-bg"
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = ""
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(Path.dashboard)
    }
  }, [isAuthenticated])

  
  if (loading) {
    return  <div style={{height:"100vh", width:"100vw", display:"grid", placeItems:'center', background:"white"}}> <Loader /> </div>
  }

  return (
    <div className="account-pages my-5 pt-sm-5"> 
      <Container>
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <Link to="/" className="mb-5 d-block auth-logo">
                <h2>EagleAI</h2>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card>
              <CardBody className="p-4">
                <div className="text-center mt-2">
                  <h5 className="text-primary">Welcome Back !</h5>
                  <p className="text-muted">Sign in to continue to EagleAI.</p>
                </div>
                <div className="p-2 mt-4">
                  <Form
                    className="form-horizontal"
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    {error ? (
                      <Alert color="danger" fade={false}>
                        {error}
                      </Alert>
                    ) : null}

                    <div className="mb-3">
                      <Label className="form-label">Account</Label>
                      <Input
                        name="account"
                        className="form-control"
                        placeholder="Enter account"
                        type="account"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.account || ""}
                        invalid={
                          validation.touched.account && validation.errors.account 
                        }
                      />
                      {validation.touched.account && validation.errors.account ? (
                        <FormFeedback type="invalid">
                          {validation.errors.account}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <div className="float-end">
                        <Link to="/forgot-password" className="text-muted">
                          Forgot password?
                        </Link>
                      </div>
                      <Label className="form-label">Password</Label>
                      <Input
                        name="password"
                        value={validation.values.password || ""}
                        type="password"
                        placeholder="Enter Password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.password &&
                          validation.errors.password 
                        }
                      />
                      {validation.touched.password &&
                      validation.errors.password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.password}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customControlInline"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="customControlInline"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="mt-3">
                      <button
                        className="btn btn-primary w-100 waves-effect waves-light"
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <p>© {new Date().getFullYear()} EagleAI.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(Login)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
}
