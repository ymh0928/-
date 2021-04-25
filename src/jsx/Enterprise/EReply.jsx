import React, { Fragment } from "react";
import { Input, Button } from "antd";
import { HOST, PORT, DOMAIN } from "../../config";

const EReply = (props) => {
  const replyAPI = async (body) => {
    try {
      const { eName, token, reply, iid } = body;
      const res = await fetch(`${HOST}:${PORT}/api/enterprises/reply/${iid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eName,
          token,
          reply,
          iid,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleReply = async () => {
    const storage = await localStorage.getItem(DOMAIN);
    const { eName, token } = JSON.parse(storage);
    const reply = document.querySelector("#reply").value;
    const { iid } = props;
    const body = {
      eName,
      token,
      reply,
      iid,
    };
    replyAPI(body);
  };

  return (
    <Fragment>
      <Input id="reply" />
      <Button type="primary" htmlType="submit" onClick={() => handleReply()}>
        回复
      </Button>
    </Fragment>
  );
};

export default EReply;
