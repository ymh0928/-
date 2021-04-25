import React, { Fragment } from "react";
import { Row, Col, Carousel, Divider } from "antd";
import HotInfor from "./Information/HotInfor";
import HotEnter from "./Information/HotEnter";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <Fragment>
      <div
        style={{
          background: "#C7EDCC",
          paddingTop: "48px",
        }}
      >
        <Row gutter={[0, 0]}>
          <Col span={4}></Col>
          <Col
            span={16}
            style={{
              padding: "10px",
              background: "#ffffff",
            }}
          >
            <Carousel autoplay>
              <div>
                <img
                  src="/img/p1.jpg"
                  width="100%"
                  height="300px"
                  alt="First slide"
                />
              </div>
              <div>
                <img
                  src="/img/zhuye.jpg"
                  width="100%"
                  height="300px"
                  alt="Second slide"
                />
              </div>
              <div>
                <img
                  src="/img/setting2.jpg"
                  width="100%"
                  height="300px"
                  alt="Third slide"
                />
              </div>
            </Carousel>
          </Col>
          <Col span={4}></Col>
        </Row>
        <Divider dashed orientation="center">
          <p
            style={{
              color: "#FC9D99",
              fontSize: "28px",
            }}
          >
            热门招聘
          </p>
        </Divider>
        <HotInfor />
        <Divider dashed orientation="center">
          <p
            style={{
              color: "#84AF9B",
              fontSize: "28px",
            }}
          >
            热门企业
          </p>
        </Divider>
        <HotEnter />
      </div>
      <Footer />
    </Fragment>
  );
};

export default HomePage;
