import React from 'react'
import Icons from '../../Icons/Icons'


const NeedVerification = () => {
  return (
    <div className="d-flex align-items-start">
    <div className="avatar-xs me-3">
      <Icons
        iconType="needVerification"
        style={{ fontSize: "24px" }}
      />
    </div>
    <div className="flex-1">
      <h6 className="mt-0 mb-1">Need Verification</h6>
      <div className="font-size-12 text-muted">
        <p className="mb-1">Kindly verify your email address</p>
      </div>
    </div>
  </div>
  )
}

export default NeedVerification