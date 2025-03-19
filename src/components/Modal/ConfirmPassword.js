import { Input, Modal } from "reactstrap"
import PropTypes from "prop-types"
import React from "react"

const ConfirmPassword = ({ isOpen, setIsOpen, passwordFormik, handleSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {}}
      backdrop={"static"}
      scrollable={true}
      id="staticBackdrop"
      centered
    >
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">
          Confirm Password
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            setIsOpen(false)
          }}
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <Input
          aria-label="password"
          invalid={
            passwordFormik.touched.confirmPassword &&
            passwordFormik.errors.confirmPassword
          }
          type="password"
          name="confirmPassword"
          onChange={passwordFormik.handleChange}
          value={passwordFormik.values.confirmPassword}
        />
        <p className="invalid-feedback">
          {passwordFormik.errors.confirmPassword}
        </p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            passwordFormik?.setFieldValue("confirmPassword", "")
            setIsOpen(false)
          }}
        >
          Close
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Confirm
        </button>
      </div>
    </Modal>
  )
}

ConfirmPassword.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  passwordFormik: PropTypes.shape({
    values: PropTypes.shape({
      password: PropTypes.string.isRequired,
      confirmPassword: PropTypes.string.isRequired,
    }).isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func,
}

export default ConfirmPassword
