import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Popconfirm } from "antd";
import { HOST, PORT, DOMAIN } from "../../config";

const DeleteButton = (props) => {
  const { iid, history } = props;

  //发送删除招聘信息的请求
  const cut = async (body) => {
    try {
      const { eName, token, iid } = body;
      const res = await fetch(`${HOST}:${PORT}/api/informations/${iid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eName,
          token,
          iid,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        history.push(`/enterprise/profile/${eName}`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      throw error.message;
    }
  };

  //控制删除招聘信息的按钮
  const handleDelete = async () => {
    const { eName, token } = JSON.parse(localStorage.getItem(DOMAIN));
    const body = {
      eName,
      token,
      iid,
    };
    cut(body);
  };

  return (
    <Popconfirm
      title="确定删除吗？"
      onConfirm={handleDelete}
      cancelText="取消"
      okText="确定"
    >
      <Button type="primary" htmlType="submit" danger>
        删除
      </Button>
    </Popconfirm>
  );
};

export default withRouter(DeleteButton);
