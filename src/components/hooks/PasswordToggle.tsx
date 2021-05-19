import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const PasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  let setIcon;
  visible ? (setIcon = faEye) : (setIcon = faEyeSlash);
  const icon = (
    <FontAwesomeIcon icon={setIcon} onClick={() => setVisible(!visible)} />
  );
  const inputType = visible ? "text" : "password";

  return [inputType, icon];
};

export default PasswordToggle;
