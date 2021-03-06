import React, { createRef, useState, useContext, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Row, Col, Checkbox, Button, AutoComplete } from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { HOST, PORT, DOMAIN } from "../../config";
import Footer from "../Footer";
import { allContext } from "../App";

const RegistrationFormS = (props) => {
  const { history } = props;
  const [form] = Form.useForm();
  const { Option } = AutoComplete;
  const { setAuthStudent, setStudent } = useContext(allContext);

  const login = async (body) => {
    try {
      const { sName, sWord } = body;
      const res = await fetch(`${HOST}:${PORT}/api/students/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sName,
          sWord,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        const data = {
          sName: result.data.sName,
          token: result.data.token,
        };
        await localStorage.setItem(DOMAIN, JSON.stringify(data));
        setAuthStudent(true);
        setStudent({
          sName: result.data.sName,
          token: result.data.token,
        });
        history.push(`/student/profile/${sName}`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const register = async (body) => {
    try {
      const { sName, tName, confirm, sWord, sMail, sPhone } = body;
      const res = await fetch(`${HOST}:${PORT}/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sName,
          tName,
          confirm,
          sWord,
          sMail,
          sPhone,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        login(body);
      } else {
        alert(result.message);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const sName = document.querySelector("#sName").value;
    const tName = document.querySelector("#tName").value;
    const sWord = document.querySelector("#sWord").value;
    const confirm = document.querySelector("#confirm").value;
    const sMail = document.querySelector("#sMail").value;
    const sPhone = document.querySelector("#sPhone").value;
    const body = {
      sName,
      tName,
      sWord,
      confirm,
      sMail,
      sPhone,
    };
    register(body);
  };

  // const refName = createRef();
  // document.onkeyup = (e) => {
  //   if (e.target === document.body) {
  //     if (e.keyCode === 83) {
  //       refName.current.focus();
  //     }
  //   } else if (e.target !== refName.current) {
  //     if (e.keyCode === 83) {
  //       return;
  //     }
  //   }
  // };

  const [result, setResult] = useState([]);
  const handleSearch = (value) => {
    let res = [];
    if (!value || value.indexOf("@") >= 0) {
      res = [];
    } else {
      res = ["qq.com", "163.com", "126.com", "Gmail.com", "Foxmail.com"].map(
        (domain) => `${value}@${domain}`
      );
    }
    setResult(res);
  };

  document.onkeyup = (e) => {
    if (e.target === document.body) {
      if (e.keyCode === 65) {
        const sName = document.querySelector("#sName");
        const tName = document.querySelector("#tName");
        const sWord = document.querySelector("#sWord");
        const confirm = document.querySelector("#confirm");
        const sMail = document.querySelector("#sMail");
        const sPhone = document.querySelector("#sPhone");
        sName.innerHTML = "?????????";
        tName.innerHTML = "?????????";
        sWord.innerHTML = "Youmeiki!11";
        confirm.innerHTML = "Youmeiki!11";
        sMail.innerHTML = "123456789@qq.com";
        sPhone.innerHTML = "18859626666";
        sName.value = "?????????";
        tName.value = "?????????";
        sWord.value = "Youmeiki!11";
        confirm.value = "Youmeiki!11";
        sMail.value = "123456789@qq.com";
        sPhone.value = "18859626666";
      }
    }
  };

  return (
    <Fragment>
      <Row
        style={{
          background: "#C7EDCC",
          height: "700px",
        }}
      >
        <Col span={8}></Col>
        <Col span={8}>
          <Row
            style={{
              height: "100px",
            }}
          ></Row>
          <Row
            style={{
              background: "white",
            }}
          >
            <Col span={4}></Col>
            <Col
              span={16}
              style={{
                paddingTop: "30px",
              }}
            >
              <Form form={form} name="register" scrollToFirstError>
                <Form.Item
                  name="sName"
                  label={<span>?????????&nbsp;</span>}
                  rules={[
                    {
                      required: true,
                      message: "????????????????????????!",
                      whitespace: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (/[\u4e00-\u9fa5_a-zA-Z0-9_]{2,10}/.test(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "?????????????????????????????????????????????????????????????????????????????????2-10"
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    // ref={refName}
                    id="sName"
                  />
                </Form.Item>
                <Form.Item
                  name="tName"
                  label="????????????"
                  rules={[
                    {
                      required: true,
                      message: "???????????????????????????!",
                      whitespace: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (/^[\u4E00-\u9FFF]+$/.test(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "??????????????????????????????????????????????????????????????????"
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<SmileOutlined className="site-form-item-icon" />}
                    id="tName"
                  />
                </Form.Item>
                <Form.Item
                  name="sWord"
                  label="??????"
                  rules={[
                    {
                      required: true,
                      message: "?????????????????????!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (
                          /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
                            value
                          )
                        ) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "??????6??????????????????1??????????????????1??????????????????1????????????1???????????????!"
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    id="sWord"
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="????????????"
                  dependencies={["sWord"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "?????????????????????!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("sWord") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject("??????????????????????????????!");
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    id="confirm"
                  />
                </Form.Item>
                <Form.Item
                  name="sMail"
                  label="??????"
                  rules={[
                    {
                      required: true,
                      message: "???????????????????????????!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (
                          /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
                            value
                          )
                        ) {
                          return Promise.resolve();
                        }

                        return Promise.reject("???????????????????????????!");
                      },
                    }),
                  ]}
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  hasFeedback
                >
                  <AutoComplete
                    onSearch={handleSearch}
                    backfill="true"
                    id="sMail"
                  >
                    {result.map((email) => (
                      <Option key={email} value={email}>
                        {email}
                      </Option>
                    ))}
                  </AutoComplete>
                </Form.Item>
                <Form.Item
                  name="sPhone"
                  label="?????????"
                  rules={[
                    {
                      required: true,
                      message: "???????????????????????????!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject("???????????????????????????!");
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                    id="sPhone"
                  />
                </Form.Item>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("???????????????!"),
                    },
                  ]}
                >
                  <Checkbox>I have read the agreement</Checkbox>
                </Form.Item>
                <center>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={(e) => handleRegister(e)}
                    >
                      ??????
                    </Button>
                  </Form.Item>
                </center>
              </Form>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Footer />
    </Fragment>
  );
};

export default withRouter(RegistrationFormS);
