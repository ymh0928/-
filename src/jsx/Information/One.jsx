import React, { useState, useEffect, useContext, Fragment } from "react";
import { Card, Row, Col, Divider, Space, Button, Badge } from "antd";
import {
  MessageOutlined,
  ProfileOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { HOST, PORT, DOMAIN } from "../../config";
import Comment from "./Comment";
import DeleteButton from "./DeleteButton";
import SFile from "../Student/SFile";
import Collect from "./Collect";
import Cancel from "./Cancel";
import Footer from "../Footer";
import { enterpriseContext } from "../App";
import { allContext } from "../App";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const One = (props) => {
  const { iid } = props.match.params;
  const { authEnterprise, enterprise } = useContext(enterpriseContext);
  const { authStudent } = useContext(allContext);
  const [information, setInformation] = useState([]);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [logo, setLogo] = useState("");
  const [toggle, setToggle] = useState([]);
  const [collectName, setCollectName] = useState("");
  const [length, setLength] = useState(0);
  const [commentsLong, setCommentsLong] = useState(0);
  const [time, setTime] = useState(Date.now());
  const [temp, setTemp] = useState([]);
  const [count, setCount] = useState(1);
  const [count2, setCount2] = useState(1);

  const loadOneInformation = async () => {
    try {
      const storage = await localStorage.getItem(DOMAIN);
      const { sName } = JSON.parse(storage);
      const res = await fetch(`${HOST}:${PORT}/api/informations/${iid}`, {
        method: "GET",
      });
      const result = await res.json();
      if (res.ok) {
        setTime(result.data.information.postTime);
        setInformation(result.data.information);
        setComments(result.data.comments);
        setName(result.data.information.enterprise.cName);
        setArea(result.data.information.enterprise.area);
        setLogo(result.data.information.enterprise.logo);
        setToggle(result.data.information.studentsCollect);
        setCollectName(sName);
        setTemp(result.data.information.students);
        setLength(result.data.information.students.length);
        setCommentsLong(result.data.comments.length);
        setFollowLength(result.data.information.studentsFollow.length);
        setUnfollowLength(result.data.information.studentsUnFollow.length);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const data = [];
  for (let i = 0; i < temp.length; i++) {
    data.push(temp[i].sName);
  }

  const list = [];
  for (let i = 0; i < toggle.length; i++) {
    list.push(toggle[i].sName);
  }

  useEffect(() => {
    loadOneInformation();
  }, [toggle]);

  const [followLength, setFollowLength] = useState(0);
  const follow = async () => {
    try {
      const storage = await localStorage.getItem(DOMAIN);
      const { sName, token } = JSON.parse(storage);
      const res = await fetch(
        `${HOST}:${PORT}/api/students/${sName}/follow/${iid}`,
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
        loadOneInformation();
        setCount(2);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const follow2 = async () => {
    try {
      const storage = await localStorage.getItem(DOMAIN);
      const { sName, token } = JSON.parse(storage);
      const res = await fetch(
        `${HOST}:${PORT}/api/students/${iid}/followdelete/${sName}`,
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
        loadOneInformation();
        setCount(1);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onFollow = () => {
    if (count == 2) {
      follow2();
    } else {
      follow();
    }
  };

  const [unfollowLength, setUnfollowLength] = useState(0);
  const unfollow = async () => {
    try {
      const storage = await localStorage.getItem(DOMAIN);
      const { sName, token } = JSON.parse(storage);
      const res = await fetch(
        `${HOST}:${PORT}/api/students/${sName}/unfollow/${iid}`,
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
        loadOneInformation();
        setCount2(2);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const unfollow2 = async () => {
    try {
      const storage = await localStorage.getItem(DOMAIN);
      const { sName, token } = JSON.parse(storage);
      const res = await fetch(
        `${HOST}:${PORT}/api/students/${iid}/unfollowdelete/${sName}`,
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
        loadOneInformation();
        setCount2(1);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onUnFollow = () => {
    if (count2 == 2) {
      unfollow2();
    } else {
      unfollow();
    }
  };

  return (
    <Fragment>
      <Row>
        <Col span={4}></Col>
        <Col span={16} style={{ padding: "50px" }}>
          <Card
            title={`${name}(${area})${new Date(time).toLocaleDateString()}`}
            extra={
              <Fragment>
                <Row>
                  {authStudent === true ? null : authEnterprise &&
                    information.enterprise &&
                    enterprise.eName === information.enterprise.eName ? (
                    <Fragment>
                      <Col>
                        <DeleteButton iid={iid} />
                      </Col>
                    </Fragment>
                  ) : authEnterprise ? null : data.indexOf(collectName) > -1 ? (
                    <Fragment>
                      {list.indexOf(collectName) > -1 ? (
                        <Cancel iid={iid} />
                      ) : (
                        <Collect iid={iid} />
                      )}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <SFile iid={iid} />
                      {list.indexOf(collectName) > -1 ? (
                        <Cancel iid={iid} />
                      ) : (
                        <Collect iid={iid} />
                      )}
                    </Fragment>
                  )}
                </Row>
              </Fragment>
            }
            style={{
              width: "100%",
              border: "5px solid #FFC0CB",
              boxShadow: "rgba(0,0,0,.2) 0 1px 5px 0px",
            }}
          >
            <Row>
              <Col span={18} xl={18} md={12} xs={24}>
                <p
                  style={{
                    color: "#af0065",
                  }}
                >
                  {information.position}
                </p>
                <p>{information.pay}</p>
                <p>{information.condition}</p>
                {authEnterprise ? (
                  <Row
                    style={{
                      marginTop: "28px",
                    }}
                  >
                    <Col>
                      <Badge count={length} overflowCount={99} showZero="true">
                        <IconText
                          icon={ProfileOutlined}
                          key="list-vertical-star-o"
                        />
                      </Badge>
                    </Col>
                    <Col
                      style={{
                        marginLeft: "24px",
                      }}
                    >
                      <Badge
                        count={commentsLong}
                        overflowCount={99}
                        showZero="true"
                      >
                        <IconText
                          icon={MessageOutlined}
                          key="list-vertical-message"
                        />
                      </Badge>
                    </Col>
                  </Row>
                ) : (
                  <Row
                    style={{
                      marginTop: "28px",
                    }}
                  >
                    <Col>
                      <Badge count={length} overflowCount={99} showZero="true">
                        <IconText
                          icon={ProfileOutlined}
                          key="list-vertical-star-o"
                        />
                      </Badge>
                    </Col>
                    <Col style={{ marginLeft: "24px" }}>
                      <Badge
                        count={commentsLong}
                        overflowCount={99}
                        showZero="true"
                      >
                        <IconText
                          icon={MessageOutlined}
                          key="list-vertical-message"
                        />
                      </Badge>
                    </Col>
                    <Col
                      style={{
                        marginLeft: "24px",
                      }}
                    >
                      <Badge
                        count={followLength}
                        overflowCount={99}
                        showZero="true"
                      >
                        赞
                        <Button
                          icon={<LikeOutlined />}
                          shape="circle"
                          onClick={(e) => onFollow(e)}
                        ></Button>
                      </Badge>
                    </Col>
                    <Col
                      style={{
                        marginLeft: "24px",
                      }}
                    >
                      <Badge
                        count={unfollowLength}
                        overflowCount={99}
                        showZero="true"
                      >
                        踩
                        <Button
                          icon={<DislikeOutlined />}
                          shape="circle"
                          onClick={(e) => onUnFollow(e)}
                        ></Button>
                      </Badge>
                    </Col>
                  </Row>
                )}
              </Col>
              <Col
                span={6}
                xl={6}
                md={12}
                xs={24}
                style={{
                  paddingLeft: "12px",
                }}
              >
                <img
                  src={logo ? `/upload/${logo}` : `/img/xiong.jpg`}
                  alt=""
                  style={{
                    height: "200px",
                    width: "200px",
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={4}></Col>
      </Row>
      <Divider dashed></Divider>
      <Row>
        <Col span={4}></Col>
        <Col
          span={16}
          style={{
            padding: "50px",
          }}
        >
          <Comment
            iid={iid}
            loadOneInformation={loadOneInformation}
            comments={comments}
          />
        </Col>
        <Col span={4}></Col>
      </Row>
      <Footer />
    </Fragment>
  );
};

export default One;
