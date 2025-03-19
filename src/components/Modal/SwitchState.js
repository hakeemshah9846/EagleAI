import React, { useState } from "react";
import { Modal, Button, } from "reactstrap";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import StateAPI from "../../store/auth/state/api";
import useToastHelper from "../../hooks/useToastHelper";
import { getProfile } from "../../store/actions";

const SwitchState = ({ isOpen, setIsOpen, userProfile, handleLoader }) => {
    console.log("SwitchState")
    const dispatch = useDispatch();
    const { showFailureToast, showSuccessToast } = useToastHelper();
    const states = useSelector(
        (state) => state?.Profile?.userDetails?.user_states || [],
        shallowEqual // Compare shallowly to prevent unnecessary rerenders
    );

    async function changeState(id) {
        try {
            await StateAPI.switchState({'state_id': id});
            console.log("Before showSuccessToast");
            showSuccessToast('Success.')
            setIsOpen(false);
            dispatch(getProfile());
        } catch (error) {
            showFailureToast(error?.response?.data?.message || 'Something went wrong, please try again.');
        }
    }


    return (
        <React.Fragment>
            <Modal
                isOpen={isOpen}
                toggle={() => {}}
                backdrop={"static"}
                scrollable={true}
                id="staticBackdrop"
                centered
            >
                <div className="modal-header">
                    
                    <span
                        className="modal-title fs-5"
                        id="staticBackdropLabel"
                    >
                        <strong>Select the state to work on</strong>
                    </span>
                    { userProfile?.Access_Default_State_Web ? <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                        aria-label="Close"
                    ></button> : null }
                </div>
                <div className="modal-body gap-2">
                    <div className="d-flex flex-wrap gap-2">
                        { states.map((row) => (
                            <Button
                                color='primary'
                                outline={row?.ID === userProfile?.Access_Default_State_Web ? false : true}
                                disabled={row?.ID === userProfile?.Access_Default_State_Web ? true : false}
                                className="waves-effect"
                                key={row?.ID} onClick={async () => {handleLoader(); await changeState(row?.ID); }}
                            >
                                { row?.State_Name || row?.State_Abbreviation }
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="modal-footer">
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default SwitchState