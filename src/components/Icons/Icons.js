import PropTypes from "prop-types";

const Icons = ({ iconType,className,style,onClick }) => {
  const iconClass = {
    pen: "uil uil-pen",
    plus: "uil uil-plus",
    minus: "uil uil-minus",
    delete: "uil uil-trash-alt",
    eye: "uil uil-eye",
    eyeOff: "uil uil-eye-slash",
    verified: "uil uil-check-circle",
    needVerification : "uil uil-envelope-exclamation text-danger"
  };

  return <i onClick={onClick}  className={`${iconClass[iconType]} ${className}`} style={{...style}} />;
};

Icons.propTypes = {
  iconType: PropTypes.oneOf([
    "pen",
    "plus",
    "minus",
    "delete",
    "eye",
    "eyeOff",
    "verified",
    "needVerification"
  ]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
};

export default Icons;
