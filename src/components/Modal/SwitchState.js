import React, { useState } from "react";
import { Modal, Button, } from "reactstrap";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { call, put, takeEvery } from "redux-saga/effects"
import StateAPI from "../../store/auth/state/api";
import { getProfile } from "../../store/actions";
import {setLoadingStatus} from "../../store/auth/login/actions"


const SwitchState = ({ isOpen, setIsOpen, userProfile, handleLoader, showSuccessToast, showFailureToast }) => {
    const dispatch = useDispatch();
    const states = useSelector(
        (state) => state?.Profile?.userDetails?.user_states || [],
        shallowEqual // Compare shallowly to prevent unnecessary rerenders
    );

    async function changeState(id) {
        try {
            await handleLoader();
            await setIsOpen(false);
            await StateAPI.switchState({'state_id': id});
            await showSuccessToast('Success.')
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
                                key={row?.ID} onClick={() => {changeState(row?.ID); }}
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