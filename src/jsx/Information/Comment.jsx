import React, {
  createRef,
  useState,
  useEffect,
  useContext,
  Fragment,
} from "react";
import { Input, Button, Form, List, Row, Col, Divider } from "antd";
import { HOST, PORT, DOMAIN } from "../../config";
import BulletScreen, { StyledBullet } from "rc-bullets"; //引入弹幕的第三方库
import { enterpriseContext } from "../App";

const Comment = (props) => {
  const { iid, loadOneInformation, comments } = props;
  const { authEnterprise } = useContext(enterpriseContext);
  // 弹幕屏幕
  const [screen, setScreen] = useState(null);
  // 弹幕内容
  const [bullet, setBullet] = useState("");
  //防止刷屏
  const [submit, setSubmit] = useState(false);

  const reply = async (body) => {
    try {
      const res = await fetch(`${HOST}:${PORT}/api/comments/${iid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        loadOneInformation();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const sub = document.querySelector("#submit");
  const listData = [];
  const handleComment = async (e) => {
    e.preventDefault();
    // screen.push(bullet);
    //得到评论的内容，大学生用户姓名以及发送的时间
    for (let i = 0; i < comments.length; i++) {
      listData.push({
        comment: bullet, //bullet 就是发送的评论内容
        sName: comments[i].author.sName,
        posttime: new Date(comments[i].posttime).toLocaleString(),
      });
    }
    //60秒倒计时防止刷屏
    const value = document.querySelector("#comment");
    value.innerHTML = "";
    setSubmit(true);
    let time = 60;
    let timer = setInterval(() => {
      sub.innerHTML = `还剩${time}秒`;
      time--;
      if (time === 0) {
        clearInterval(timer);
        setSubmit(false);
        sub.innerHTML = `提交`;
      }
    }, 1000);
    const storage = await localStorage.getItem(DOMAIN);
    const { sName, token } = JSON.parse(storage);
    const comment = document.querySelector("#comment").value;
    const body = {
      sName,
      token,
      comment,
    };
    reply(body);
  };

  for (let i = 0; i < comments.length; i++) {
    listData.push({
      comment: comments[i].comment,
      sName: comments[i].author.sName,
      posttime: new Date(comments[i].posttime).toLocaleString(),
    });
  }

  const handleChange = ({ target: { value } }) => {
    setBullet(value);
  };
  useEffect(() => {
    let s = new BulletScreen(".screen", { duration: 8 });
    setScreen(s);
  }, []);

  const [push, setPush] = useState(false); //开启
  const [clear, setClear] = useState(true); //清除
  const [pause, setPause] = useState(true); //暂停
  const [go, setGo] = useState(true); //继续

  //控制弹幕开启
  const handlePush = (e) => {
    e.preventDefault();
    listData.map((comments, idx) => {
      screen.push(
        <StyledBullet
          key={idx}
          msg={comments.comment}
          backgroundColor={"#FFFFFF"}
        />
      );
    });
    setPush(true);
    setGo(true);
    setClear(false);
    setPause(false);
  };

  //控制弹幕清除
  const handleClear = (e) => {
    e.preventDefault();
    screen.clear();
    setClear(true);
    setPause(true);
    setGo(true);
    setPush(false);
  };

  //控制弹幕暂停
  const handlePause = (e) => {
    e.preventDefault();
    screen.pause();
    setPause(true);
    setPush(true);
    setClear(true);
    setGo(false);
  };

  //控制弹幕继续
  const handleGo = (e) => {
    e.preventDefault();
    screen.resume();
    setGo(true);
    setPush(true);
    setClear(false);
    setPause(false);
  };

  const refName = createRef();
  document.onkeyup = (e) => {
    if (e.keyCode == 83) {
      refName.current.focus();
    }
  };

  return (
    <Fragment>
      <div
        className="screen"
        style={{
          width: "100%",
          height: "200px",
        }}
      ></div>
      <Divider dashed></Divider>
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handlePush(e)}
        disabled={push}
      >
        开启
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handleClear(e)}
        disabled={clear}
      >
        清除
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handlePause(e)}
        disabled={pause}
      >
        暂停
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handleGo(e)}
        disabled={go}
      >
        继续
      </Button>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {},
          pageSize: 5,
        }}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item key={item.sName}>
            {
              <Col>
                <Row>
                  <span
                    style={{
                      fontWeight: "bolder",
                    }}
                  >
                    {item.sName}
                  </span>
                  <small
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    {item.posttime}
                  </small>
                </Row>
                <Row
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <p
                    style={{
                      paddingLeft: "20px",
                    }}
                  >
                    {item.comment}
                  </p>
                </Row>
              </Col>
            }
          </List.Item>
        )}
      />
      <Divider dashed></Divider>
      <Form name="basic">
        {authEnterprise === true ? null : (
          <Fragment>
            <Form.Item label="" name="comment">
              <Input
                ref={refName}
                maxLength={100}
                style={{ width: "100%", height: "100px" }}
                id="comment"
                value={bullet}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={(e) => handleComment(e)}
                id="submit"
                disabled={submit}
              >
                提交
              </Button>
            </Form.Item>
          </Fragment>
        )}
      </Form>
    </Fragment>
  );
};

export default Comment;
