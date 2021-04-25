import mongoose from "mongoose";
import Information from "../model/Information";
import Enterprise from "../model/Enterprise";
import Student from "../model/Student";
import Comment from "../model/Comment";
import Message from "../model/Message";

const informationAPIs = (app) => {
  app.get("/api/informations", async (req, res) => {
    try {
      const informations = await Information.find()
        .populate("enterprise", "eName cName area logo")
        .populate("students", "sName tName sMail sPhone")
        .populate("comments", "comment posttime");
      return res.json({
        data: informations,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.get("/api/informations/enterprises", async (req, res) => {
    try {
      const enterprises = await Enterprise.find().populate(
        "informations",
        "position pay condition postTime"
      );
      return res.json({
        data: {
          enterprises,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.get("/api/enterprises/informations", async (req, res) => {
    try {
      const { cName } = req.query;
      const enterprise = await Enterprise.findOne({ cName }).populate(
        "informations",
        "position pay condition postTime students comments studentsCollect studentsFollow studentsUnFollow"
      );
      return res.json({
        data: {
          enterprise,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.get("/api/hotInfor/homepage", async (req, res) => {
    try {
      const informations = await Information.find()
        .populate("enterprise", "eName cName area logo")
        .populate("students", "sName tName sMail sPhone")
        .populate("comments", "comment posttime");
      const data = [];
      for (let i = 0; i < informations.length; i++) {
        data.push(informations[i]);
      }
      let toggle = 0;
      for (let i = 0; i < data.length; i++) {
        for (let j = i; j < data.length; j++) {
          if (data[i].students.length > data[j].students.length) {
            toggle = data[i];
            data[i] = data[j];
            data[j] = toggle;
          }
        }
      }
      data.reverse();
      const list = [];
      for (let i = 0; i < 12; i++) {
        list.push(data[i]);
      }
      return res.json({
        data: {
          list,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.get("/api/hotEnter/homepage", async (req, res) => {
    try {
      const enterprises = await Enterprise.find()
        .populate("informations", "companyName position pay condition")
        .populate("students", "sName tName sMail sPhone")
        .populate("comments", "comment posttime");
      const data = [];
      for (let i = 0; i < enterprises.length; i++) {
        data.push(enterprises[i]);
      }
      let toggle = 0;
      for (let i = 0; i < data.length; i++) {
        for (let j = i; j < data.length; j++) {
          if (data[i].students.length > data[j].students.length) {
            toggle = data[i];
            data[i] = data[j];
            data[j] = toggle;
          }
        }
      }
      data.reverse();
      const list = [];
      for (let i = 0; i < 12; i++) {
        list.push(data[i]);
      }
      return res.json({
        data: {
          list,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.get("/api/:iid/message", async (req, res) => {
    try {
      const { iid } = req.params;
      const information = await Information.findById(iid)
        .populate("messages", "message uploadTime")
        .populate("enterprise", "messages");
      const message = await Message.find({ information: iid })
        .populate("student", "tName")
        .populate("enterprise", "cName");
      return res.json({
        data: {
          information,
          message,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/informations/search", async (req, res) => {
    try {
      const { search } = req.body;
      if (!search) {
        return res.status(400).json({
          message: "没有获取到搜索内容",
        });
      }
      const reg = new RegExp(search, "i");
      const searchValue = await Information.find({
        $or: [
          { companyName: { $regex: reg } },
          { position: { $regex: reg } },
          { condition: { $regex: reg } },
        ],
      })
        .populate("enterprise", "eName cName area logo")
        .populate("students", "sName tName sMail sPhone")
        .populate("comments", "comment posttime");
      return res.json({
        data: searchValue,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.get("/api/informations/:iid", async (req, res) => {
    try {
      const { iid } = req.params;
      if (!iid) {
        return res.status(400).json({
          message: "没有获取到该招聘信息的id",
        });
      }
      const information = await Information.findById(iid)
        .populate("enterprise", "eName cName area logo")
        .populate("students", "sName")
        .populate("studentsCollect", "sName")
        .populate("studentsFollow", "sName")
        .populate("studentsUnFollow", "sName");
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      const comments = await Comment.find({ target: iid }).populate(
        "author",
        "sName tName sMail sWord"
      );
      return res.json({
        data: {
          information,
          comments,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/informations", async (req, res) => {
    try {
      const { eName, companyName, token, position, pay, condition } = req.body;
      if (!eName) {
        return res.status(400).json({
          message: "请输入用户名",
        });
      }
      if (!companyName) {
        return res.status(400).json({
          message: "请输入公司名",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到用户凭证",
        });
      }
      if (!position) {
        return res.status(400).json({
          message: "请输入招聘职位",
        });
      }
      if (!pay) {
        return res.status(400).json({
          message: "请输入月薪",
        });
      }
      if (!condition) {
        return res.status(400).json({
          message: "请选择招聘条件",
        });
      }
      if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(position)) {
        return res.status(400).json({
          message: "不是规范的职位名！",
        });
      }
      const enterprise = await Enterprise.findOne({ eName, token });
      if (!enterprise) {
        return res.status(400).json({
          message: "用户凭证已经过期，请重新登录",
        });
      }
      const newInformation = {
        companyName,
        position,
        pay,
        condition,
        enterprise,
      };
      const information = new Information(newInformation);
      await information.save();
      enterprise.informations.push(information);
      await enterprise.save();
      return res.json({
        message: "新增招聘信息成功",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.patch("/api/informations/:iid", async (req, res) => {
    try {
      const { iid } = req.params;
      if (!iid) {
        return res.status(400).json({
          message: "没有获取到该招聘信息的id",
        });
      }
      const { eName, token, position, pay, condition } = req.body;
      if (!eName) {
        return res.status(400).json({
          message: "没有获取到用户名",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到用户凭证",
        });
      }
      if (!position) {
        return res.status(400).json({
          message: "还没有输入招聘职位",
        });
      }
      if (!pay) {
        return res.status(400).json({
          message: "还没有输入月薪",
        });
      }
      if (!condition) {
        return res.status(400).json({
          message: "还没有选择招聘条件",
        });
      }
      if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(position)) {
        return res.status(400).json({
          message: "不是规范的职位名！",
        });
      }
      const enterprise = await Enterprise.findOne({
        eName,
        token,
      });
      if (!enterprise) {
        return res.status(400).json({
          message: "用户凭证已经过期，请重新登录",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      if (String(enterprise._id) !== String(information.enterprise)) {
        return res.status(400).json({
          message: "不要操作不属于自己的招聘信息!!!",
        });
      }
      information.position = position;
      information.pay = pay;
      information.condition = condition;
      await information.save();
      return res.json({
        message: "修改成功!!!",
        data: information,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.delete("/api/informations/:iid", async (req, res) => {
    try {
      const { iid } = req.params;
      if (!iid) {
        return res.status(400).json({
          message: "没有获取到该招聘信息的id",
        });
      }
      const { eName, token } = req.body;
      if (!eName) {
        return res.status(400).json({
          message: "没有获取到企业用户名",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到token",
        });
      }
      const enterprise = await Enterprise.findOne({
        eName,
        token,
      });
      if (!enterprise) {
        return res.status(400).json({
          message: "token已过期，请重新登录",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      if (String(enterprise._id) !== String(information.enterprise)) {
        return res.status(400).json({
          message: "不要操作不属于自己的招聘信息!!!",
        });
      }
      const students = await Student.find({ informations: iid });
      if (students.length > 0) {
        students.map(async (student, idx) => {
          enterprise.students.pull(student);
          await enterprise.save();
        });
      }
      if (students.length > 0) {
        students.map(async (student, idx) => {
          student.informations.pull(information);
          await student.save();
        });
      }
      if (students.length > 0) {
        students.map(async (student, idx) => {
          student.enterprises.pull(enterprise);
          await student.save();
        });
      }
      await Comment.deleteMany({
        target: mongoose.Types.ObjectId(iid),
      });
      await Message.deleteMany({
        information: mongoose.Types.ObjectId(iid),
      });
      enterprise.informations.pull(information);
      await enterprise.save();
      await information.remove();
      return res.json({
        message: "删除成功!!!",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/comments/:iid", async (req, res) => {
    try {
      const { iid } = req.params;
      const { sName, token, comment } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有获取到帖子ID",
        });
      }
      if (!sName) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行发表！！",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到身份凭证",
        });
      }
      if (!comment) {
        return res.status(400).json({
          message: "请输入回复内容",
        });
      }
      const student = await Student.findOne({
        sName,
        token,
      });
      if (!student) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行发表！！",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      const newComment = {
        comment,
        author: student,
        target: iid,
      };
      const newcomment = new Comment(newComment);
      student.comments.push(newcomment);
      information.comments.push(newcomment);
      await newcomment.save();
      await student.save();
      await information.save();
      return res.json({
        message: "新增回复成功",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/message/:iid/:sName", async (req, res) => {
    try {
      const { iid } = req.params;
      const { sName, message } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有获取到招聘信息ID",
        });
      }
      if (!sName) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行留言！！",
        });
      }
      if (!message) {
        return res.status(400).json({
          message: "请输入留言内容",
        });
      }
      const student = await Student.findOne({
        sName,
      });
      if (!student) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行留言！！",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      const newMessage = {
        message,
        student: student,
        information: iid,
      };
      const newmessage = new Message(newMessage);
      student.messages.push(newmessage);
      information.messages.push(newmessage);
      await newmessage.save();
      await student.save();
      await information.save();
      return res.json({
        message: "新增留言成功",
        data: {
          information,
          student,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/:iid/:eName/message", async (req, res) => {
    try {
      const { iid } = req.params;
      const { eName, message } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有获取到招聘信息ID",
        });
      }
      if (!eName) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行留言！！",
        });
      }
      if (!message) {
        return res.status(400).json({
          message: "请输入留言内容",
        });
      }
      const enterprise = await Enterprise.findOne({
        eName,
      });
      if (!enterprise) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行留言！！",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      const newMessage = {
        message,
        enterprise: enterprise,
        information: iid,
      };
      const newmessage = new Message(newMessage);
      enterprise.messages.push(newmessage);
      information.messages.push(newmessage);
      await newmessage.save();
      await enterprise.save();
      await information.save();
      return res.json({
        message: "新增留言成功",
        data: {
          information,
          enterprise,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.patch(`/api/description/:iid`, async (req, res) => {
    try {
      const { iid } = req.params;
      const { eName, description } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有获取到招聘信息ID",
        });
      }
      if (!eName) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行备注！！",
        });
      }
      if (!description) {
        return res.status(400).json({
          message: "请输入备注内容",
        });
      }
      const enterprise = await Enterprise.findOne({
        eName,
      });
      if (!enterprise) {
        return res.status(400).json({
          message: "该用户不存在",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      information.description = description;
      await information.save();
      return res.json({
        message: "添加备注成功!!!",
        data: information,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
};

export default informationAPIs;
