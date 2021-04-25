import React, { Fragment, useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Progress } from "antd";
import { HOST, PORT } from "../config";

const Header = () => {
  const [time, setTime] = useState(new Date());
  const [enterpriseLength, setEnterpriseLength] = useState(0);
  const [informationLength, setInformationLength] = useState(0);

  const informationsLength = async () => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/informations`, {
        method: "GET",
      });
      const result = await res.json();
      if (res.ok) {
        setInformationLength(result.data);
      }
    } catch (error) {}
  };

  const enterprisesLength = async () => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/enterprises`, {
        method: "GET",
      });
      const result = await res.json();
      if (res.ok) {
        setEnterpriseLength(result.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    informationsLength();
  }, []);

  useEffect(() => {
    enterprisesLength();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Fragment>
      <Row>
        <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
          <Navbar.Brand>DZW</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/home/">
                <Nav.Link>首页</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/informations/">
                <Nav.Link>我全都要</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/searchEnter/">
                <Nav.Link>找企业</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/searchInfor/">
                <Nav.Link>找工作</Nav.Link>
              </LinkContainer>

              <NavDropdown title="大学生用户" id="basic-navbar-dropdown">
                <LinkContainer to="/registerS/">
                  <NavDropdown.Item>注册</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/loginS/">
                  <NavDropdown.Item>登陆</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown title="企业用户" id="basic-navbar-dropdown">
                <LinkContainer to="/registerE/">
                  <NavDropdown.Item>注册</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/loginE/">
                  <NavDropdown.Item>登陆</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
            <div className="ml-auto">
              <span
                style={{
                  color: "pink",
                }}
              >
                {`现在是北京时间${time.toLocaleTimeString()}`}
              </span>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <Row
        style={{
          backgroundColor: "#00DDAA",
          height: "38px",
        }}
      >
        <Col span={4}></Col>
        <Col span={16}>
          <Row>
            <Col span={7} xl={7} md={7} xs={8}>
              <span
                style={{
                  fontFamily: "楷体",
                  color: "#FFFFFF",
                  fontSize: "24px",
                  zIndex: 0,
                }}
              >
                大学生找工作，就上大招
              </span>
            </Col>
            <Col span={3} xl={2} md={2} xs={0}></Col>
            <Col span={12} xl={13} md={13} xs={16}>
              <Progress
                type="circle"
                percent={enterpriseLength.length}
                width={28}
              />
              <span
                style={{
                  fontFamily: "楷体",
                  color: "black",
                  fontSize: "24px",
                  zIndex: 0,
                }}
              >
                {`目前已有${enterpriseLength.length}家企业入驻，共发布${informationLength.length}条招聘信息`}
              </span>
            </Col>
            <Col span={2} xl={2} md={2} xs={0}></Col>
          </Row>
        </Col>
        <Col span={4}></Col>
      </Row>
    </Fragment>
  );
};

export default Header;
