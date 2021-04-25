import React, { useState, useEffect } from "react";
import { Row, Col, Card, Space } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import { HOST, PORT } from "../../config";

const Line = (props) => {
  const { enterprise, length } = props;
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <Card
      title={
        <Row>
          <Col span={18} xl={18} md={18} xs={18}>
            {enterprise ? enterprise.area : null}
          </Col>
          <Col span={6} xl={6} md={6} xs={6}>
            <IconText
              icon={ProfileOutlined}
              text={length ? length.length : null}
              key="list-vertical-star-o"
            />
          </Col>
        </Row>
      }
      style={{
        width: "220px",
        height: "220px",
        marginLeft: "24px",
        marginBottom: "24px",
      }}
      hoverable
    >
      <Row>
        <Col>
          <Row>
            <p>{enterprise ? enterprise.cName : null}</p>
          </Row>
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <img
                src={
                  enterprise
                  ?(
                    enterprise.logo
                    ? `/upload/${enterprise.logo}`
                    : `/img/xiong.jpg`
                    )
                  : null
                }
                alt=""
                style={{
                  height: "90px",
                  width: "100px",
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

const HotEnter = () => {
  const [enterprises, setEnterprises] = useState([]); //指定的十二个公司
  const loadEnterprises = async () => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/hotEnter/homepage`, {
        method: "GET",
      });
      const result = await res.json();
      if (res.ok) {
        setEnterprises(result.data.list);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    loadEnterprises();
  }, []);

  const lines = enterprises.map((enterprise, idx) => {
    return (
      <Line
        key={idx}
        enterprise={enterprise ? enterprise : null}
        length={enterprise ? enterprise.students : null}
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

export default HotEnter;
