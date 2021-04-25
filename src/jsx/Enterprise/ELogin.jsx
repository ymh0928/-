import React, { createRef, useContext, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { HOST, PORT, DOMAIN } from "../../config";
import Footer from "../Footer";
import { allContext } from "../App";

const NormalLoginFormE = (props) => {
  const { history } = props;
  const { setEnterprise, setAuthEnterprise } = useContext(allContext);
  const login = async (body) => {
    try {
      const { eName, eWord } = body;
      const res = await fetch(`${HOST}:${PORT}/api/enterprises/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eName,
          eWord,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        const data = {
          eName: result.data.eName,
          token: result.data.token,
        };
        await localStorage.setItem(DOMAIN, JSON.stringify(data));
        setAuthEnterprise(true);
        setEnterprise({
          eName: result.data.eName,
          token: result.data.token,
        });
        history.push(`/enterprise/profile/${eName}`);
      } else {
        alert("密码错误或者该用户不存在");
      }
    } catch (error) {
      throw error.message;
    }
  };

  // const formRef = createRef();
  const handleLogin = (e) => {
    e.preventDefault();
    // const ref = formRef.current;
    // const values = ref.getFieldsValue(["eName", "eWord"]);
    // const { eName, eWord } = values;
    const eName = document.querySelector("#eName").value;
    const eWord = document.querySelector("#eWord").value;
    const body = {
      eName,
      eWord,
    };
    login(body);
  };

  const refName = createRef();
  document.onkeyup = (e) => {
    if (e.target === document.body) {
      if (e.keyCode === 83) {
        refName.current.focus();
      }
    } else if (e.target !== refName.current) {
      if (e.keyCode === 83) {
        return;
      }
    }
  };

  return (
    <Fragment>
      <Row
        style={{
          background: "#C7EDCC",
          height: "600px",
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
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                // ref={formRef}
              >
                <Form.Item
                  name="eName"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的用户名!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="用户名"
                    ref={refName}
                    id="eName"
                  />
                </Form.Item>
                <Form.Item
                  name="eWord"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的密码!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                    id="eWord"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Form.Item>
                <center>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={(e) => handleLogin(e)}
                    >
                      登陆
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

export default withRouter(NormalLoginFormE);
