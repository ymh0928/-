import React from "react";
import { Button } from "antd";
import { HOST, PORT, DOMAIN } from "../../config";

const Cancel = (props) => {
  const { iid } = props;

  const cancel = async (body) => {
    try {
      const { sName, token } = body;
      const res = await fetch(
        `${HOST}:${PORT}/api/students/${sName}/cancel/${iid}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sName,
            token,
          }),
        }
      );
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

  const handleCancel = async () => {
    const storage = await localStorage.getItem(DOMAIN);
    const { sName, token } = JSON.parse(storage);
    const body = {
      sName,
      token,
    };
    cancel(body);
  };

  return (
    <Button
      type="primary"
      htmlType="submit"
      onClick={() => handleCancel()}
      danger
    >
      取消收藏
    </Button>
  );
};

export default Cancel;
