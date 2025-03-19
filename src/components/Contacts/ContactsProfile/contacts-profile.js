import React, { useState } from "react"
import UserImage from "../../../assets/images/users/userimg.jpeg"
import useProfileHelpers from "./hooks/useProfileHelpers"
import PropTypes from "prop-types"
import { formatPhoneNumber } from "../../../util/format-phone"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Input,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap"
import classnames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import ConditionalRenderer from "../../ConditionalRenderer"
import ProfileAPI from "../../../store/auth/profile/api"
import * as Yup from "yup"
import { useFormik } from "formik"
import useToastHelper from "../../../hooks/useToastHelper"
import { getProfile, toggleLoading } from "../../../store/actions"
import Loader from "../../../components/Loader/Loader"
import ConfirmEmail from "../../Modal/ConfirmEmail"
import Icons from "../../Icons/Icons"
import NeedVerification from "./NeedVerification"
import { useSearchParams } from "react-router-dom"
const SUCCESS = "success"
const FAILURE = "failure"

const emailValidation = Yup.string()
  .email("Invalid email format")
  .required("Email is required")

const ContactsProfile = () => {
  const [activeTab, setActiveTab] = useState("1")
  document.title = " Profile | EagleAI"
  const [params] = useSearchParams()
  const tab = params?.get("tab") ?? 1
  const [modal_backdrop, setmodal_backdrop] = useState(false)
  const loading = useSelector(state => state.Profile.loading)
  const userProfile = useSelector(state => state.Profile.userDetails)
  const { showSuccessToast, showFailureToast, toast, removeToast } =
    useToastHelper()

  const [passwordEditing, setPasswordEditing] = useState(false)
  const [emailEditing, setEmailEditing] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: userProfile?.Email_Address || "", // Set initial value properly
    },
    enableReinitialize: true, // Ensures values update when userProfile changes
    validate: async values => {
      const errors = {}
      try {
        await emailValidation.validate(values.email)
      } catch (err) {
        errors.email = err.message
      }
      return errors
    },
    onSubmit: async values => {
      try {
        dispatch(toggleLoading())
        const response = await ProfileAPI.updateEmail(values.email)
        if (response.status >= 200 && response.status <= 299) {
          showSuccessToast("Email updated successfully")
          setEmailEditing(false)
          dispatch(toggleLoading(false))
        }
      } catch (error) {
        showFailureToast("Failed to update email. Please try again.")
        dispatch(toggleLoading(false))
      }
      dispatch(getProfile())
    },
  })

  const { formik: passwordFormik } = useProfileHelpers(
    showFailureToast,
    showSuccessToast
  )

  if (loading) return <Loader />
  return (
    <div
      className="page-content"
      style={{ position: "relative", minHeight: "80vh" }}
    >
      <div
        className="d-flex flex-column gap-2"
        style={{
          position: "absolute",
          bottom: "0px",
          right: "20px",
          zIndex: "10000",
        }}
      >
        {toast?.map((item, idx) => (
          <Toast key={item?.message} isOpen>
            <ToastHeader toggle={() => removeToast(idx)}>
              <strong
                className={
                  item?.type === SUCCESS ? "text-success" : "text-danger"
                }
              >
                {item.title}
              </strong>
            </ToastHeader>
            <ToastBody
              className={
                item?.type === SUCCESS ? "text-success" : "text-danger"
              }
            >
              {item.message}
            </ToastBody>
          </Toast>
        ))}
      </div>

      <ConfirmEmail setIsOpen={setmodal_backdrop} isOpen={modal_backdrop} />
      <Container fluid>
        <Row className="mb-4">
          <Col lg={6} xl={6}>
            <Card className="card h-100">
              <CardBody>
                <div className="text-center">
                  <div className="clearfix"></div>
                  <div>
                    <img
                      src={UserImage}
                      alt="profilepic"
                      className="avatar-lg rounded-circle img-thumbnail"
                    />
                  </div>
                  <h5 className="mt-3 mb-1">{userProfile?.Account_Name_Web}</h5>
                </div>

                <hr className="my-4" />

                <div className="text-muted">
                  <div className="table-responsive mt-4">
                    <div className="d-flex align-items-center mt-4">
                      <strong className="mb-0 me-2">First Name:</strong>
                      <span className="font-size-16 mb-0">
                        {userProfile?.Name_First}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                      <strong className="mb-0 me-2">Last Name:</strong>
                      <span className="font-size-16 mb-0">
                        {userProfile?.Name_Last}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                      <strong className="mb-0 me-2">Mobile:</strong>
                      <span className="font-size-16 mb-0">
                        {formatPhoneNumber(userProfile?.Phone_Number ?? "")}
                      </span>
                    </div>
                    <div className="d-flex  mt-4">
                      <strong className="mb-0 me-2 mt-1">Email:</strong>
                      <ConditionalRenderer
                        if={emailEditing}
                        ifnot={
                          <div className="d-flex flex-row align-items-center">
                            <p className="font-size-16 mb-0">
                              {userProfile?.Email_Address}
                            </p>
                            {userProfile?.Email_Address_Is_Verified ? (
                              <Icons
                                iconType="verified"
                                style={{
                                  margin: "0px",
                                  paddingLeft: "10px",
                                  fontSize: "20px",
                                  color: "green",
                                }}
                              />
                            ) : (
                              <Icons
                                iconType="needVerification"
                                style={{
                                  paddingBottom: "4px",
                                  paddingLeft: "10px",
                                  fontSize: "20px",
                                }}
                                onClick={() => setmodal_backdrop(true)}
                              />
                            )}
                            <EditButton
                              disabled={false}
                              onClick={() => setEmailEditing(true)}
                            />
                          </div>
                        }
                        then={
                          <div className="d-flex">
                            <div
                              className="d-flex flex-column"
                              style={{
                                width: "200px",
                                whiteSpace: "break-spaces",
                              }}
                            >
                              <Input
                                type="text"
                                className="form-control"
                                id="email-address"
                                name="email"
                                value={formik.values.email}
                                placeholder="Enter Email Address"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                invalid={
                                  formik?.touched?.email && formik.errors.email
                                }
                              />
                              {formik?.errors?.email &&
                                formik?.touched?.email && (
                                  <span className="text-danger">
                                    {formik?.errors?.email}
                                  </span>
                                )}
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary mx-2"
                              disabled={
                                formik.touched.email && formik.errors.email
                              }
                              style={{ height: "40px" }}
                              onClick={formik.handleSubmit} // Call formik's handleSubmit directly
                            >
                              Save
                            </button>

                            <button
                              type="button"
                              className="btn btn-danger "
                              style={{ height: "40px" }}
                              onClick={() => {
                                setEmailEditing(false)
                                formik.setFieldValue(
                                  "email",
                                  userProfile?.Email_Address
                                )
                              }}
                            >
                              cancel
                            </button>
                          </div>
                        }
                      />
                    </div>
                    <ProfileElement
                      value={passwordFormik?.values.password}
                      name="password"
                      onBlur={e => passwordFormik?.handleBlur(e)}
                      onEditBtnPress={() => {
                        passwordFormik?.setFieldValue("password", "")
                        setPasswordEditing(true)
                      }}
                      label={"Password"}
                      placeHolder={"Enter Password"}
                      isEditing={passwordEditing}
                      isInvalid={
                        passwordFormik.touched.password &&
                        !!passwordFormik.errors.password
                      }
                      error={
                        passwordFormik.touched.password &&
                        passwordFormik.errors.password
                          ? passwordFormik.errors.password
                          : ""
                      }
                      handleChange={passwordFormik.handleChange}
                      handleSubmit={e => {
                        if (
                          !passwordFormik.values.password ||
                          passwordFormik.errors.password
                        ) {
                          return
                        }
                        passwordFormik.handleSubmit(e)
                        setPasswordEditing(false)
                      }}
                      onCancel={() => {
                        passwordFormik?.resetForm()
                        passwordFormik?.setFieldValue("password", "******")
                        setPasswordEditing(false)
                      }}
                    />
                    <div className="d-flex align-items-center mt-4">
                      <strong className="mb-0 me-2">Location:</strong>

                      <p className="font-size-16 mb-0">
                        { userProfile?.Address_Residence_Line_1 }, { userProfile?.Address_Residence_City }, { userProfile?.Address_Residence_State } { userProfile?.Address_Residence_Postal_Code }
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={6}>
            <Card className="mb-0">
              <Nav tabs className="nav-tabs-custom nav-justified">
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      setActiveTab("1")
                    }}
                  >
                    <i className="uil uil-user-circle font-size-20"></i>
                    <span className="d-none d-sm-block">About</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      setActiveTab("2")
                    }}
                  >
                    <i className="uil uil-envelope-alt font-size-20"></i>
                    <span className="d-none d-sm-block">Notifications</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="p-4">
                <TabPane tabId="1">
                  <p>
                    Hi, I'm {userProfile?.Name_First}, a dedicated election list
                    employee committed to ensuring fair and accurate electoral
                    processes. With a keen eye for detail and a strong sense of
                    responsibility, I help maintain and manage voter records,
                    ensuring transparency and integrity in every election.
                  </p>
                </TabPane>
                <TabPane tabId="2">
                  {!userProfile?.Email_Address_Is_Verified && (
                    <NeedVerification />
                  )}
                </TabPane>
              </TabContent>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const ProfileElement = ({
  label,
  isEditing,
  value,
  onEditBtnPress,
  onBlur,
  isInvalid,
  handleChange,
  handleSubmit,
  name,
  placeHolder,
  onCancel,
  error,
}) => {
  return (
    <div
      className="d-flex  mt-4"
      style={{
        width: "100px",
        whiteSpace: "break-spaces",
      }}
    >
      <strong className="mb-0 mt-1 me-2">{label}:</strong>
      <ConditionalRenderer
        if={isEditing}
        ifnot={
          <>
            <span className="font-size-16 mb-0 mt-2">{"******"}</span>
            <EditButton disabled={false} onClick={onEditBtnPress} />
          </>
        }
        then={
          <div className="d-flex">
            <div className="d-flex flex-column">
              <Input
                type="password"
                className="form-control"
                id="password"
                name={name}
                value={value}
                placeholder={placeHolder}
                onBlur={onBlur}
                onChange={handleChange}
                invalid={isInvalid}
                style={{ width: "200px" }}
              />
              {error && <span className="text-danger">{error}</span>}
            </div>
            <button
              type="button"
              className={"btn btn-primary mx-2 " + (!value ? "disabled" : "")}
              style={{ height: "40px" }}
              onClick={handleSubmit} // Call formik's handleSubmit directly
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger "
              onClick={onCancel} // Call formik's handleSubmit directly
              style={{ height: "40px" }}
            >
              cancel
            </button>
          </div>
        }
      />
    </div>
  )
}

ProfileElement.propTypes = {
  label: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onEditBtnPress: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  error: PropTypes.string,
}

const EditButton = ({ onClick, disabled }) => {
  return (
    <div
      style={{
        cursor: "pointer",
        pointerEvents: disabled ? "none" : "auto",
        height: "40px",
      }}
      className="text-primary  ms-2"
      onClick={onClick}
    >
      <i
        className="uil uil-pen font-size-18"
        style={{ color: disabled ? "grey" : "inherit" }}
        id="edittooltip"
      />
    </div>
  )
}

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default ContactsProfile
