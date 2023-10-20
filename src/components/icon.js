import React from "react";
import Icons from "../images/sketchfab-logo-white.svg";

import PropTypes from 'prop-types';
  const Icon = ({ color, size }) => (
  <svg className={`icon`} fill={color} width={size} height={size}>
    <use xlinkHref={`${Icons}`} />
  </svg>
);

Icon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
};

export default Icon;