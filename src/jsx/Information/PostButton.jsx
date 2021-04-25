import React, { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, Input, Button, Select } from "antd";
import { HOST, PORT, DOMAIN } from "../../config";

const PostButton = () => {
  const { Option } = Select;
  const [show, setShow] = useState(false);
  const [condition, setCondition] = useState("");
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const post = async (body) => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/informations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        closeModal();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onSelect = (value) => {
    setCondition(value);
  };

  const handlePost = async () => {
    const storage = await localStorage.getItem(DOMAIN);
    const { eName, token } = JSON.parse(storage);
    const position = document.querySelector("#position").value;
    const pay = document.querySelector("#pay").value;
    const companyName = document.querySelector("#companyName").value;
    const body = {
      eName,
      token,
      position,
      pay,
      condition,
      companyName,
    };
    post(body);
  };

  return (
    <Fragment>
      <Button type="primary" onClick={() => showModal()}>
        发布
      </Button>
      <Modal show={show} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title style={{ paddingLeft: "45%" }}>招聘</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form name="basic">
            <Form.Item
              label="公司名"
              name="companyName"
              rules={[
                {
                  required: true,
                  message: "请输入公司名!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)) {
                      return Promise.resolve();
                    }

                    return Promise.reject("不是规范的公司名!");
                  },
                }),
              ]}
            >
              <Input id="companyName" />
            </Form.Item>
            <Form.Item
              label="职位"
              name="position"
              rules={[
                {
                  required: true,
                  message: "请输入要招聘的职位!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)) {
                      return Promise.resolve();
                    }

                    return Promise.reject("不是规范的职位名!");
                  },
                }),
              ]}
            >
              <Input id="position" />
            </Form.Item>
            <Form.Item
              label="薪水"
              name="pay"
              rules={[
                {
                  required: true,
                  message: "请输入月薪!",
                },
              ]}
            >
              <Input type="number" id="pay" />
            </Form.Item>
            <Form.Item
              label="条件"
              name="condition"
              rules={[
                {
                  required: true,
                  message: "请选择条件!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择条件"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.indexOf(input) >= 0
                }
                onSelect={onSelect}
              >
                <Option value="本科" label="本科">
                  本科
                </Option>
                <Option value="研究生" label="研究生">
                  研究生
                </Option>
                <Option value="博士" label="博士">
                  博士
                </Option>
                <Option value="大专" label="大专">
                  大专
                </Option>
              </Select>
            </Form.Item>
            <center>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => handlePost()}
                >
                  确认
                </Button>
              </Form.Item>
            </center>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default PostButton;
