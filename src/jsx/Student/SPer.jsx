import React, { useState, useEffect, Fragment } from "react";
import { Modal } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Table, Row, Col, Divider, Button, Input, List, Avatar } from "antd";
import { HOST, PORT } from "../../config";
import One from "../Information/One";
import Cancel from "../Information/Cancel";
import Footer from "../Footer";

const SPerToggle = (props) => {
  const { sName } = props.match.params;
  const [informations, setInformations] = useState([]);
  const [informationsCollect, setInformationsCollect] = useState([]);

  const loadPer = async () => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/students/${sName}`, {
        method: "GET",
      });
      const result = await res.json();
      if (res.ok) {
        setInformations(result.data.informations);
        setInformationsCollect(result.data.informationsCollect);
      }
    } catch (error) {
      throw error.message;
    }
  };

  useEffect(() => {
    loadPer();
  }, [informationsCollect]);

  const columns = [
    {
      title: "公司名",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "职位",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "薪水",
      dataIndex: "pay",
      key: "pay",
    },
    {
      title: "条件",
      dataIndex: "condition",
      key: "condition",
    },
  ];
  const data = [];
  for (let i = 0; i < informations.length; i++) {
    data.push({
      companyName: (
        <Link to={`/informations/${informations[i]._id}`}>
          {informations[i].companyName}
        </Link>
      ),
      position: informations[i].position,
      pay: informations[i].pay,
      condition: informations[i].condition,
    });
  }

  const columns2 = [
    {
      title: "公司名",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "职位",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "薪水",
      dataIndex: "pay",
      key: "pay",
    },
    {
      title: "条件",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "",
      dataIndex: "cancel",
      key: "cancel",
    },
  ];
  const list = [];
  for (let i = 0; i < informationsCollect.length; i++) {
    list.push({
      companyName: (
        <Link to={`/informations/${informationsCollect[i]._id}`}>
          {informationsCollect[i].companyName}
        </Link>
      ),
      position: informationsCollect[i].position,
      pay: informationsCollect[i].pay,
      condition: informationsCollect[i].condition,
      cancel: <Cancel iid={informationsCollect[i]._id} />,
    });
  }

  return (
    <Fragment>
      <Divider dashed orientation="center">
        <p
          style={{
            fontSize: "20px",
          }}
        >
          已收藏的简历
        </p>
      </Divider>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <Table
            columns={columns2}
            dataSource={list}
            pagination={{
              pageSize: 5,
            }}
          />
        </Col>
        <Col span={4}></Col>
      </Row>
      <Divider dashed orientation="center">
        <p
          style={{
            fontSize: "20px",
          }}
        >
          已投递的企业
        </p>
      </Divider>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 5,
            }}
          />
        </Col>
        <Col span={4}></Col>
      </Row>
      <Divider dashed orientation="center"></Divider>
      <Footer />
    </Fragment>
  );
};

const SPer = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/student/profile/:sName" component={SPerToggle} />
        <Route path="/informations/:iid" component={One} />
      </Switch>
    </Fragment>
  );
};

export default SPer;
