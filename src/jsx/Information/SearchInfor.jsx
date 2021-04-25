import React, { Fragment, useState, createRef } from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Row, Col, List, Space } from "antd";
import {
  MessageOutlined,
  ProfileOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { HOST, PORT } from "../../config";
import One from "./One";
import Footer from "../Footer";

const SearchInforToggle = () => {
  const [searchInformations, setSearchInformations] = useState([]);

  const searchValue = async (body) => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/informations/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.ok) {
        setSearchInformations(result.data);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = document.forms.searchForm;
    const search = form.search.value;
    const body = {
      search,
    };
    searchValue(body);
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const listData = [];
  for (let i = 0; i < searchInformations.length; i++) {
    listData.push({
      href: (
        <Link to={`/informations/${searchInformations[i]._id}`}>
          {`${searchInformations[i].enterprise.cName}(${searchInformations[i].enterprise.area})`}
        </Link>
      ),
      position: searchInformations[i].position,
      pay: searchInformations[i].pay,
      condition: searchInformations[i].condition,
      delivered: searchInformations[i].students.length,
      comments: searchInformations[i].comments.length,
      logo: searchInformations[i].enterprise.logo,
      follow: searchInformations[i].studentsFollow.length,
      unfollow: searchInformations[i].studentsUnFollow.length,
      time: new Date(searchInformations[i].postTime).toLocaleDateString(),
    });
  }
  listData.reverse()

  const ref = createRef();
  document.onkeyup = (e) => {
    if (e.keyCode == 83) {
      ref.current.focus();
    }
  };

  return (
    <Fragment>
      <Row>
        <Col span={4}></Col>
        <Col
          span={16}
          style={{
            padding: "50px",
          }}
        >
          <Form id="searchForm">
            <Form.Group controlId="search">
              <Form.Control type="text" placeholder="我想找工作..." ref={ref} />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSearch(e)}
            >
              搜索
            </Button>
          </Form>
        </Col>
        <Col span={4}></Col>
      </Row>
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

const SearchInfor = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/searchInfor/" component={SearchInforToggle} />
        <Route path="/searchInfor/:iid" component={One} />
      </Switch>
    </Fragment>
  );
};

export default SearchInfor;
