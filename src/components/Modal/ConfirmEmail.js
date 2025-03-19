import { 
  Modal,
} from "reactstrap"
import PropTypes from "prop-types"
import React from "react"
import ProfileAPI from "../../store/auth/profile/api"
import useToastHelper from "../../hooks/useToastHelper"

const ConfirmEmail = ({ isOpen, setIsOpen }) => {
  const {showFailureToast,showSuccessToast} = useToastHelper()
  
  async function sendVerificationEmail (){
     try {
        const response = await ProfileAPI.verifyEmailAddress()
        if(response.status >= 200 && response.status <= 299){
            showSuccessToast("Verification email sent successfully.");
        }
        return response
     } catch (error) {
        console.error(error)
        showFailureToast("Failed to send verification email. Try again.");
     }
  }

 

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
          Verify Email
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
        <p>Click Verify to send email</p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={sendVerificationEmail}>
          Verify
        </button>
      </div>
    </Modal>
  )
}

ConfirmEmail.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func, 
}

export default ConfirmEmail
