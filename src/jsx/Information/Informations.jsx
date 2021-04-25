import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Divider, List, Space } from "antd";
import {
  MessageOutlined,
  ProfileOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { HOST, PORT } from "../../config";
import One from "./One";
import Footer from "../Footer";

const InformationsToggle = () => {
  const [informations, setInformations] = useState([]);

  const loadInformations = async () => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/informations`, {
        method: "GET",
      });
      const result = await res.json();
      if (res.ok) {
        setInformations(result.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    loadInformations();
  }, []);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  //得到所有招聘信息的方式
  const listData = [];
  for (let i = 0; i < informations.length; i++) {
    listData.push({
      href: (
        <Link to={`/informations/${informations[i]._id}`}>
          {`${informations[i].enterprise.cName}(${informations[i].enterprise.area})`}
        </Link>
      ),
      position: informations[i].position,
      pay: informations[i].pay,
      condition: informations[i].condition,
      delivered: informations[i].students.length,
      comments: informations[i].comments.length,
      logo: informations[i].enterprise.logo,
      follow: informations[i].studentsFollow.length,
      unfollow: informations[i].studentsUnFollow.length,
      time: new Date(informations[i].postTime).toLocaleDateString(),
    });
  }
  listData.reverse()

  return (
    <Fragment>
      <Divider dashed orientation="center"></Divider>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {},
              pageSize: 5,
            }}
            dataSource={listData}
            renderItem={(item) => (
              <List.Item
                key={item.href}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src={item.logo ? `/upload/${item.logo}` : `/img/xiong.jpg`}
                  />
                }
              >
                <List.Item.Meta
                  title={item.href}
                  style={{
                    marginTop: "8px",
                  }}
                />
                {
                  <div>
                    <p
                      style={{
                        fontWeight: "bolder",
                        marginBottom: "28px",
                      }}
                    >
                      {item.time}
                    </p>
                    <p
                      style={{
                        color: "#af0065",
                      }}
                    >
                      {item.position}
                    </p>
                    <p>{item.pay}</p>
                    <p>{item.condition}</p>
                    <Row>
                      <Col>
                        <IconText
                          icon={ProfileOutlined}
                          text={item.delivered}
                          key="list-vertical-star-o"
                        />
                      </Col>
                      <Col
                        style={{
                          marginLeft: "24px",
                        }}
                      >
                        <IconText
                          icon={MessageOutlined}
                          text={item.comments}
                          key="list-vertical-message"
                        />
                      </Col>
                      <Col
                        style={{
                          marginLeft: "24px",
                        }}
                      >
                        <IconText
                          icon={LikeOutlined}
                          text={item.follow}
                          key="list-vertical-like"
                        />
                      </Col>
                      <Col
                        style={{
                          marginLeft: "24px",
                        }}
                      >
                        <IconText
                          icon={DislikeOutlined}
                          text={-item.unfollow}
                          key="list-vertical-dislike"
                        />
                      </Col>
                    </Row>
                  </div>
                }
              </List.Item>
            )}
          />
        </Col>
        <Col span={4}></Col>
      </Row>
      <Footer />
    </Fragment>
  );
};

const Informations = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/informations/" component={InformationsToggle} />
        <Route path="/informations/:iid" component={One} />
      </Switch>
    </Fragment>
  );
};

export default Informations;
