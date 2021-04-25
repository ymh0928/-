import Student from "../model/Student";
import Information from "../model/Information";
import Enterprise from "../model/Enterprise";
import Crypto from "crypto";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const upload = multer({
  dest: "./static/upload",
});

const studentAPIs = (app) => {
  app.post("/api/students", async (req, res) => {
    try {
      const { sName, tName, sWord, confirm, sMail, sPhone } = req.body;
      if (!sName) {
        return res.status(400).json({
          message: "请输入用户名",
        });
      }
      if (!tName) {
        return res.status(400).json({
          message: "请输入真实姓名",
        });
      }
      if (!sWord) {
        return res.status(400).json({
          message: "请输入密码",
        });
      }
      if (!confirm) {
        return res.status(400).json({
          message: "请输入验证密码",
        });
      }
      if (!sMail) {
        return res.status(400).json({
          message: "请输入邮箱",
        });
      }
      if (!sPhone) {
        return res.status(400).json({
          message: "请输入手机号",
        });
      }
      if (!/[\u4e00-\u9fa5_a-zA-Z0-9_]{2,10}/.test(sName)) {
        return res.status(400).json({
          message: "这不是规范的用户名格式",
        });
      }
      if (
        !/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
          sWord
        )
      ) {
        return res.status(400).json({
          message: "这不是规范的密码格式",
        });
      }
      if (sWord !== confirm) {
        return res.status(400).json({
          message: "两次输入的密码不一致",
        });
      }
      if (
        !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
          sMail
        )
      ) {
        return res.status(400).json({
          message: "这不是规范的邮箱格式",
        });
      }
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(sPhone)) {
        return res.status(400).json({
          message: "这不是规范的手机格式",
        });
      }
      const student = await Student.findOne({ sName });
      if (student) {
        return res.status(400).json({
          message: "该用户名已被注册",
        });
      }
      const studentMail = await Student.findOne({ sMail });
      if (studentMail) {
        return res.status(400).json({
          message: "该邮箱已被注册",
        });
      }
      const studentPhone = await Student.findOne({ sPhone });
      if (studentPhone) {
        return res.status(400).json({
          message: "该手机号已被注册",
        });
      }
      const sWordCrypto = Crypto.createHash("sha1").update(sWord).digest("hex");
      const newStudent = {
        sName,
        tName,
        sWord: sWordCrypto,
        sMail,
        sPhone,
      };
      const newstudent = new Student(newStudent);
      await newstudent.save();
      return res.json({
        message: "注册成功!!!",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/students/login", async (req, res) => {
    try {
      const { sName, sWord } = req.body;
      if (!sName) {
        return res.status(400).json({
          message: "请输入用户名",
        });
      }
      if (!sWord) {
        return res.status(400).json({
          message: "请输入密码",
        });
      }
      const sWordCrypto = Crypto.createHash("sha1").update(sWord).digest("hex");
      const student = await Student.findOne({ sName });
      if (!sName) {
        return res.status(400).json({
          message: "该用户不存在!!!",
        });
      }
      if (sWordCrypto !== student.sWord) {
        return res.status(400).json({
          message: "密码错误，请重新输入!!!",
        });
      }
      const tokenstr = uuidv4();
      const token = Crypto.createHash("sha1").update(tokenstr).digest("hex");
      student.token = token;
      await student.save();
      return res.json({
        message: "登录成功!!!",
        data: {
          sName: student.sName,
          token: student.token,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/students/auth", async (req, res) => {
    try {
      const { sName, token } = req.body;
      if (!sName) {
        return res.status(400).json({
          message: "没有获取到用户名",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到token",
        });
      }
      const student = await Student.findOne({
        sName,
        token,
      });
      if (!student) {
        return res.status(400).json({
          message: "token已经过期，请重新登陆",
        });
      }
      return res.json({
        message: "成功验证",
        data: student,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/students/logout", async (req, res) => {
    try {
      const { sName, token } = req.body;
      if (!sName) {
        return res.status(400).json({
          message: "没有获取到用户名",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到token",
        });
      }
      const student = await Student.findOne({
        sName,
        token,
      });
      if (!student) {
        return res.status(400).json({
          message: "已经处于登出状态",
        });
      }
      student.token = null;
      await student.save();
      return res.json({
        message: "成功退出登录",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.get("/api/students/:sName", async (req, res) => {
    try {
      const { sName } = req.params;
      if (!sName) {
        return res.status(400).json({
          message: "没有获取到用户名",
        });
      }
      const student = await Student.findOne({ sName })
        .populate(
          "informations",
          "companyName position pay condition postTime reply"
        )
        .populate(
          "informationsCollect",
          "companyName position pay condition postTime"
        );
      if (!student) {
        return res.status(400).json({
          message: "该用户不存在",
        });
      }
      student.sWord = null;
      student.token = null;
      return res.json({
        data: student,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.patch(
    "/api/students/:iid/deliver",
    upload.single("avatar"),
    async (req, res) => {
      try {
        const { iid } = req.params;
        const { sName, token } = req.body;
        if (!iid) {
          return res.status(400).json({
            message: "没有得到该招聘信息的id",
          });
        }
        if (!sName) {
          return res.status(400).json({
            message: "请先注册或登陆账号再进行投递！！",
          });
        }
        if (!token) {
          return res.status(400).json({
            message: "没有获取到用户凭证",
          });
        }
        const student = await Student.findOne({
          sName,
          token,
        });
        if (!student) {
          return res.status(400).json({
            message: "请先注册或登陆账号再进行投递！！",
          });
        }
        const information = await Information.findById(iid);
        if (!information) {
          return res.status(400).json({
            message: "该招聘信息不存在",
          });
        }
        if (student.informations.includes(information._id)) {
          return res.status(400).json({
            message: "您已经投递过该招聘信息了!!!",
          });
        }
        if (!req.file) {
          return res.status(400).json({
            message: "请上传简历!!!",
          });
        }
        if (req.file) {
          student.avatar = req.file.filename;
        }
        const enterprise = await Enterprise.findOne({
          informations: iid,
        });
        if (student.enterprises.includes(enterprise._id)) {
          return res.status(400).json({
            message: "您已经投递过该企业的其他招聘信息了!!!",
          });
        }
        student.informations.push(information);
        student.enterprises.push(enterprise);
        information.students.push(student);
        enterprise.students.push(student);
        await student.save();
        await enterprise.save();
        await information.save();
        return res.json({
          message: "上传简历成功!",
          data: {
            student,
            information,
            enterprise,
          },
        });
      } catch (error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  );
  app.patch("/api/students/:sName/collect/:iid", async (req, res) => {
    try {
      const { iid } = req.params;
      const { sName, token } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有得到该招聘信息的id",
        });
      }
      if (!sName) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到用户凭证",
        });
      }
      const student = await Student.findOne({
        sName,
        token,
      });
      if (!student) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      if (student.informationsCollect.includes(information._id)) {
        return res.status(400).json({
          message: "您已经收藏过该招聘信息了!!!",
        });
      }
      student.informationsCollect.push(information);
      information.studentsCollect.push(student);
      await information.save();
      await student.save();
      return res.json({
        message: "收藏成功!!!",
        data: {
          student,
          information,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.patch("/api/students/:sName/cancel/:iid", async (req, res) => {
    try {
      const { iid } = req.params;
      const { sName, token } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有得到该招聘信息的id",
        });
      }
      if (!sName) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到用户凭证",
        });
      }
      const student = await Student.findOne({
        sName,
        token,
      });
      if (!student) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      if (!student.informationsCollect.includes(information._id)) {
        return res.status(400).json({
          message: "您已经取消收藏该招聘信息了",
        });
      }
      student.informationsCollect.pull(information);
      information.studentsCollect.pull(student);
      await information.save();
      await student.save();
      return res.json({
        message: "取消收藏成功!!!",
        data: {
          student,
          information,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.patch("/api/students/:sName/follow/:iid", async (req, res) => {
    try {
      const { iid } = req.params;
      const { sName, token } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有得到该招聘信息的id",
        });
      }
      if (!sName) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到用户凭证",
        });
      }
      const student = await Student.findOne({
        sName,
        token,
      });
      if (!student) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      student.informationsFollow.push(information);
      information.studentsFollow.push(student);
      await information.save();
      await student.save();
      return res.json({
        data: {
          student,
          information,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.patch("/api/students/:iid/followdelete/:sName", async (req, res) => {
    try {
      const { iid } = req.params;
      const { sName, token } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有得到该招聘信息的id",
        });
      }
      if (!sName) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到用户凭证",
        });
      }
      const student = await Student.findOne({
        sName,
        token,
      });
      if (!student) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      student.informationsFollow.pull(information);
      information.studentsFollow.pull(student);
      await information.save();
      await student.save();
      return res.json({
        data: {
          student,
          information,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.patch("/api/students/:sName/unfollow/:iid", async (req, res) => {
    try {
      const { iid } = req.params;
      const { sName, token } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有得到该招聘信息的id",
        });
      }
      if (!sName) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到用户凭证",
        });
      }
      const student = await Student.findOne({
        sName,
        token,
      });
      if (!student) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      student.informationsUnFollow.push(information);
      information.studentsUnFollow.push(student);
      await information.save();
      await student.save();
      return res.json({
        data: {
          student,
          information,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.patch("/api/students/:iid/unfollowdelete/:sName", async (req, res) => {
    try {
      const { iid } = req.params;
      const { sName, token } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有得到该招聘信息的id",
        });
      }
      if (!sName) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      if (!token) {
        return res.status(400).json({
          message: "没有获取到用户凭证",
        });
      }
      const student = await Student.findOne({
        sName,
        token,
      });
      if (!student) {
        return res.status(400).json({
          message: "请先注册或登陆账号再进行操作！！",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "该招聘信息不存在",
        });
      }
      student.informationsUnFollow.pull(information);
      information.studentsUnFollow.pull(student);
      await information.save();
      await student.save();
      return res.json({
        data: {
          student,
          information,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
};

export default studentAPIs;
