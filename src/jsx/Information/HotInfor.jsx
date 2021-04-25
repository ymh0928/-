import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Card, Space } from "antd";
import {
  SearchOutlined,
  MessageOutlined,
  ProfileOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { HOST, PORT } from "../../config";
import One from "../Information/One";

const Line = (props) => {
  const { information, length } = props;
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <Card
      title={information ? `${information.enterprise.cName}(${information.enterprise.area})` : null}
      extra={
        <Link to={information ? `/informations/${information._id}` : null}>
          <SearchOutlined />
        </Link>
      }
      hoverable
      style={{
        marginLeft: "24px",
        marginBottom: "24px",
        height: "220px",
        width: "220px",
      }}
    >
      <p
        style={{
          color: "#af0065",
        }}
      >
        {information ? information.position : null}
      </p>
      <p>{information ? information.pay : null}</p>
      <p>{information ? information.condition : null}</p>
      <Row>
        <Col>
          <IconText
            icon={ProfileOutlined}
            text={length ? length.length : null}
            key="list-vertical-star-o"
          />
        </Col>
        <Col
          style={{
            marginLeft: "12px",
          }}
        >
          <IconText
            icon={MessageOutlined}
            text={information ? information.comments.length : null}
            key="list-vertical-message"
          />
        </Col>
        <Col
          style={{
            marginLeft: "12px",
          }}
        >
          <IconText
            icon={LikeOutlined}
            text={information ? information.studentsFollow.length : null}
            key="list-vertical-like"
          />
        </Col>
        <Col
          style={{
            marginLeft: "12px",
          }}
        >
          <IconText
            icon={DislikeOutlined}
            text={information ? -information.studentsUnFollow.length : null}
            key="list-vertical-dislike"
          />
        </Col>
      </Row>
    </Card>
  );
};

const HotInforToggle = () => {
  const [informations, setInformations] = useState([]); //指定的12条招聘信息
  const loadInformations = async () => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/hotInfor/homepage`, {
        method: "GET",
      });
      const result = await res.json();
      if (res.ok) {
        setInformations(result.data.list);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadInformations();
  }, []);

  const lines = informations.map((information, idx) => {
    return (
      <Line
        key={idx}
        information={information ? information : null}
        length={information ? information.students : null}
      />
    );
  });

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Row>{lines}</Row>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

const HotInfor = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" component={HotInforToggle} />
        <Route exact path="/informations/:iid" component={One} />
      </Switch>
    </Fragment>
  );
};

export default HotInfor;
