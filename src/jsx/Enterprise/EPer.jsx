import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Divider, Table, Input, Button } from "antd";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { HOST, PORT } from "../../config";
import PostButton from "../Information/PostButton";
import DelButton from "../Information/DelButton";
import EFile from "./EFile";
import One from "../Information/One";
import Footer from "../Footer";

// const Append = (props) => {
//   const { eName, iid, loadPer } = props;

//   const append = async (body) => {
//     try {
//       const { description } = body;
//       const res = await fetch(`${HOST}:${PORT}/api/description/${iid}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           eName,
//           description,
//         }),
//       });
//       if(res.ok){
//         loadPer()
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const onAppend = () => {
//     const description = document.querySelector("#description").value;
//     const body = { description };
//     append(body);
//   };

//   return (
//     <Fragment>
//       <Input id="description" />
//       <Button type="primary" htmlType="submit" onClick={(e) => onAppend(e)}>
//         添加备注
//       </Button>
//     </Fragment>
//   );
// };

const EPerToggle = (props) => {
  const { eName } = props.match.params;
  const [informations, setInformations] = useState([]);
  const [studentInfors, setStudentInfors] = useState([]);
  const [logo, setLogo] = useState("");

  const loadPer = async () => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/enterprises/${eName}`, {
        method: "GET",
      });
      const result = await res.json();
      if (res.ok) {
        setInformations(result.data.informations);
        setStudentInfors(result.data.students);
        setLogo(result.data.logo);
      }
    } catch (error) {
      throw error.message;
    }
  };

  useEffect(() => {
    loadPer();
  }, [informations]);

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
      title: "月薪",
      dataIndex: "pay",
      key: "pay",
    },
    {
      title: "条件",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "发布时间",
      dataIndex: "postTime",
      key: "postTime",
    },
    // {
    //   title: "",
    //   dataIndex: "append",
    //   key: "append",
    // },
    {
      title: "",
      dataIndex: "delete",
      key: "delete",
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
      postTime: new Date(informations[i].postTime).toLocaleDateString(),
      delete: <DelButton iid={informations[i]._id} />,
      // append: <Append iid={informations[i]._id} eName={eName} loadPer={loadPer}/>,
      // description: informations[i].description,
    });
  }

  const column = [
    {
      title: "求职者",
      dataIndex: "tName",
      key: "tName",
    },
    {
      title: "职位",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "月薪",
      dataIndex: "pay",
      key: "pay",
    },
    {
      title: "条件",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "简历",
      dataIndex: "avatar",
      key: "avatar",
    },
  ];

  const arr = [];
  for (let i = 0; i < studentInfors.length; i++) {
    arr.push(studentInfors[i]._id);
  }

  const list = [];
  for (let i = 0; i < informations.length; i++) {
    if(informations[i].students.length > 0){
      for(let j = 0;j < informations[i].students.length; j++){
        if (arr.includes(informations[i].students[j])) {
          list.push({
            tName: studentInfors[j].tName,
            avatar: (
              <a href={`/upload/${studentInfors[j].avatar}`}>
                {`${studentInfors[j].tName}的简历`}
              </a>
            ),
            position: (
              <Link to={`/informations/${informations[i]._id}`}>
                {informations[i].position}
              </Link>
            ),
            pay: informations[i].pay,
            condition: informations[i].condition,
          });
        }
      }
    }
  }

  return (
    <Fragment>
      <Divider dashed orientation="center"></Divider>
      <strong
        style={{
          fontSize: "20px",
          marginRight: "24px",
          marginLeft: "24px",
        }}
      >
        请上传公司logo
      </strong>
      <EFile logo={logo} />
      <Divider dashed orientation="center">
        <p style={{ fontSize: "20px" }}>已发布的招聘</p>
      </Divider>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <PostButton />
        </Col>
        <Col span={4}></Col>
      </Row>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            // expandable={{
            //   expandedRowRender: (record) => (
            //     <p style={{ margin: 0 }}>{record.description}</p>
            //   ),
            // }}
          />
        </Col>
        <Col span={4}></Col>
      </Row>
      <Divider dashed orientation="center">
        <p style={{ fontSize: "20px" }}>已收到的简历</p>
      </Divider>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <Table
            columns={column}
            dataSource={list}
            pagination={{ pageSize: 5 }}
          />
        </Col>
        <Col span={4}></Col>
      </Row>
      <Divider dashed orientation="center"></Divider>
      <Footer />
    </Fragment>
  );
};

const EPer = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/enterprise/profile/:eName" component={EPerToggle} />
        <Route path="/informations/:iid" component={One} />
      </Switch>
    </Fragment>
  );
};

export default EPer;
