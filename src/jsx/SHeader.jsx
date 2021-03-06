import React, { Fragment, useState, useEffect, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Progress } from "antd";
import { HOST, PORT, DOMAIN } from "../config";
import { studentContext } from "./App";

const SHeader = (props) => {
  const { history } = props;
  const { student, setStudent, authStudent, setAuthStudent } = useContext(
    studentContext
  );
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

  const logoutStudent = async () => {
    try {
      const data = await localStorage.getItem(DOMAIN);
      const res = await fetch(`${HOST}:${PORT}/api/students/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setAuthStudent(false);
        setStudent({});
        history.push("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const AvatarStudent = () => (
    <span
      style={{
        color: "pink",
      }}
      onClick={() => logoutStudent()}
    >
      ??????
    </span>
  );

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
                <Nav.Link>??????</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/informations/">
                <Nav.Link>????????????</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/searchEnter/">
                <Nav.Link>?????????</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/searchInfor/">
                <Nav.Link>?????????</Nav.Link>
              </LinkContainer>
            </Nav>
            <div className="ml-auto">
              <span
                style={{
                  color: "pink",
                  marginRight: "12px",
                }}
              >
                {authStudent
                  ? `?????????????????????${time.toLocaleTimeString()}`
                  : null}
              </span>
              <span
                style={{
                  color: "pink",
                  marginRight: "24px",
                }}
              >
                {authStudent ? (
                  <Fragment>
                    <span
                      style={{
                        color: "pink",
                      }}
                    >
                      ?????????
                    </span>
                    <Link to={`/student/profile/${student.sName}`}>
                      {student.sName}
                    </Link>
                  </Fragment>
                ) : null}
              </span>
              {authStudent ? <AvatarStudent /> : null}
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
                  fontFamily: "??????",
                  color: "#FFFFFF",
                  fontSize: "24px",
                  zIndex: 0,
                }}
              >
                ?????????????????????????????????
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
                  fontFamily: "??????",
                  color: "black",
                  fontSize: "24px",
                  zIndex: 0,
                }}
              >
                {`????????????${enterpriseLength.length}???????????????????????????${informationLength.length}???????????????`}
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

export default withRouter(SHeader);
