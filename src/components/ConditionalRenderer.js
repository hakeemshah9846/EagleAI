import PropTypes from "prop-types";

const ConditionalRenderer = ({ if:condition1, then:children, ifnot:children2 }) => {
  return condition1 ? children : children2;
};

ConditionalRenderer.propTypes = {
  then: PropTypes.node,
  ifnot: PropTypes.node,
  if: PropTypes.bool.isRequired,
};

export default ConditionalRenderer;
