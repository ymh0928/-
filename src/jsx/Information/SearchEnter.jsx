import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, List, Space, Menu } from "antd";
import {
  MessageOutlined,
  ProfileOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { HOST, PORT } from "../../config";
import One from "../Information/One";

const { SubMenu } = Menu;
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const SearchEnterToggle = () => {
  const [enterprises, setEnterprises] = useState([]);
  const [informations, setInformations] = useState([]);
  const [enterprise, setEnterprise] = useState({});

  const searchEnter = async () => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/informations/enterprises`, {
        method: "GET",
      });
      const result = await res.json();
      if (res.ok) {
        setEnterprises(result.data.enterprises);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    searchEnter();
  }, []);

  const list = enterprises.map((item, idx) => {
    return (
      <Fragment key={idx}>
        <Menu.Item key={item.length}>{item.cName}</Menu.Item>
      </Fragment>
    );
  });

  const onClick = async (cName) => {
    try {
      const res = await fetch(
        `${HOST}:${PORT}/api/enterprises/informations?cName=${cName}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      if (res.ok) {
        setInformations(result.data.enterprise.informations);
        setEnterprise(result.data.enterprise);
      }
    } catch (error) {}
  };

  const listData = [];
  for (let i = 0; i < informations.length; i++) {
    listData.push({
      href: (
        <Link to={`/informations/${informations[i]._id}`}>
          {`${enterprise.cName}(${enterprise.area})`}
        </Link>
      ),
      position: informations[i].position,
      pay: informations[i].pay,
      condition: informations[i].condition,
      logo: enterprise.logo,
      delivered: informations[i].students.length,
      comments: informations[i].comments.length,
      follow: informations[i].studentsFollow.length,
      unfollow: informations[i].studentsUnFollow.length,
      time: new Date(informations[i].postTime).toLocaleDateString(),
    });
  }
  listData.reverse()

  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const rootSubmenuKeys = ["sub1"];
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col span={4}>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
              width: 256,
            }}
          >
            <SubMenu
              key="sub1"
              title="企业列表"
              onClick={(e) => onClick(e.domEvent.target.innerHTML)}
            >
              {list}
            </SubMenu>
          </Menu>
        </Col>
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
    </Fragment>
  );
};

const SearchEnter = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/searchEnter/" component={SearchEnterToggle} />
        <Route path="/informations/:iid" component={One} />
      </Switch>
    </Fragment>
  );
};

export default SearchEnter;
