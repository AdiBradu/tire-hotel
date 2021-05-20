// Overlay use className props to pass style properties to child component.
// To make this component work add className props to your child component manually.
// Here an example: https://gist.github.com/Miniplop/8f87608f8100e758fa5a4eb46f9d151f

import React from "react";
import LoginText from "../LoginText/LoginText.component";
import LoginIcon from '../LoginIcon/LoginIcon.component'
import './LoginGroup.component.scss'

const LoginGroup = () => {
  return (
    <div className="loginGroup">
      <LoginIcon />
      <LoginText />
    </div>
  );
};

export default LoginGroup;