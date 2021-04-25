import React, { Fragment } from "react";
import { Input, Button, Popconfirm } from "antd";
import { HOST, PORT, DOMAIN } from "../../config";

const SFile = (props) => {
  const { iid } = props;

  const setting = async () => {
    try {
      const storage = await localStorage.getItem(DOMAIN);
      const { sName, token } = JSON.parse(storage);
      const formData = new FormData();
      await formData.append("sName", sName);
      await formData.append("token", token);
      await formData.append("avatar", document.querySelector("#file").files[0]);
      const res = await fetch(`${HOST}:${PORT}/api/students/${iid}/deliver`, {
        method: "PATCH",
        body: formData,
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

  const handleSettings = () => {
    setting();
  };

  return (
    <Fragment>
      <Input
        placeholder="请上传简历"
        type="file"
        style={{
          width: "200px",
        }}
        id="file"
      />
      <Popconfirm
        title="确定投递吗？"
        onConfirm={handleSettings}
        cancelText="取消"
        okText="确定"
      >
        <Button type="primary" htmlType="submit">
          投递
        </Button>
      </Popconfirm>
    </Fragment>
  );
};

export default SFile;
