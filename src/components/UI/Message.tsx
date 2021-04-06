import React, { FC } from "react";

interface MessageProps {
  msg: string;
  type: "danger" | "success";
}

const Message: FC<MessageProps> = ({ msg, type }) => {
  let typeClass = "";

  if (type === "danger") {
    typeClass = "alert-danger";
  }
  if (type === "success") {
    typeClass = "alert-success";
  }
  return (
    <article className={`alert ${typeClass}`}>
      <div className="message-body">{msg}</div>
    </article>
  );
};

export default Message;
