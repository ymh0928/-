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
        sName.innerHTML = "李明星";
        tName.innerHTML = "李明星";
        sWord.innerHTML = "Youmeiki!11";
        confirm.innerHTML = "Youmeiki!11";
        sMail.innerHTML = "123456789@qq.com";
        sPhone.innerHTML = "18859626666";
        sName.value = "李明星";
        tName.value = "李明星";
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
                  label={<span>用户名&nbsp;</span>}
                  rules={[
                    {
                      required: true,
                      message: "请输入你的用户名!",
                      whitespace: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (/[\u4e00-\u9fa5_a-zA-Z0-9_]{2,10}/.test(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "用户名只能包括中文、英文字母、数字和下划线，并且长度在2-10"
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
                  label="真实姓名"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的真实姓名!",
                      whitespace: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (/^[\u4E00-\u9FFF]+$/.test(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "姓名不能包含数字、英文字母、下划线和特殊字符"
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
                  label="密码"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的密码!",
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
                          "最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符!"
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
                  label="确认密码"
                  dependencies={["sWord"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "请确认你的密码!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("sWord") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject("两次输入的密码不一致!");
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
                  label="邮箱"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的邮箱地址!",
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

                        return Promise.reject("不是规范的邮箱格式!");
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
                  label="手机号"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的手机号码!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject("不是规范的手机格式!");
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
                          : Promise.reject("请确认同意!"),
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
                      注册
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
