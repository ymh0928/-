import React, { Fragment } from "react";
import { Input, Button } from "antd";
import { HOST, PORT, DOMAIN } from "../../config";

const EFile = (props) => {
  const { logo } = props;
  const setting = async () => {
    try {
      const storage = await localStorage.getItem(DOMAIN);
      const { eName, token } = JSON.parse(storage);
      const formData = new FormData();
      await formData.append("eName", eName);
      await formData.append("token", token);
      await formData.append("logo", document.querySelector("#file").files[0]);
      const res = await fetch(`${HOST}:${PORT}/api/enterprises`, {
        method: "PATCH",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
      }else{
        alert(result.message)
      }
    } catch (error) {
      throw error.message;
    }
  };

  const handleSettings = (e) => {
    e.preventDefault();
    setting();
  };

  return (
    <Fragment>
      <Input
        placeholder="请上传公司logo"
        type="file"
        style={{
          width: "200px",
        }}
        id="file"
      />
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handleSettings(e)}
      >
        上传
      </Button>
      {logo ? (
        <img
          src={`/upload/${logo}`}
          alt="上传logo"
          style={{ width: "30px", height: "30px", marginLeft: "5px" }}
        />
      ) : null}
    </Fragment>
  );
};

export default EFile;
