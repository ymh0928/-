import Enterprise from "../model/Enterprise";
import Information from "../model/Information";
import Student from "../model/Student";
import Crypto from "crypto";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const upload = multer({
  dest: "./static/upload",
});

const enterpriseAPIs = (app) => {
  app.post("/api/enterprises", async (req, res) => {
    try {
      const { eName, cName, eWord, confirm, area, eMail, ePhone } = req.body;
      if (!eName) {
        return res.status(400).json({
          message: "请输入用户名",
        });
      }
      if (!cName) {
        return res.status(400).json({
          message: "请输入用户名",
        });
      }
      if (!eWord) {
        return res.status(400).json({
          message: "请输入密码",
        });
      }
      if (!confirm) {
        return res.status(400).json({
          message: "请输入验证密码",
        });
      }
      if (!area) {
        return res.status(400).json({
          message: "请选择公司所在省份",
        });
      }
      if (!eMail) {
        return res.status(400).json({
          message: "请输入邮箱",
        });
      }
      if (!ePhone) {
        return res.status(400).json({
          message: "请输入手机号",
        });
      }
      if (!/[\u4e00-\u9fa5_a-zA-Z0-9_]{2,10}/.test(eName)) {
        return res.status(400).json({
          message: "这不是规范的用户名格式",
        });
      }
      if (
        !/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
          eWord
        )
      ) {
        return res.status(400).json({
          message: "这不是规范的密码格式",
        });
      }
      if (eWord !== confirm) {
        return res.status(400).json({
          message: "两次输入的密码不一致",
        });
      }
      if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(cName)) {
        return res.status(400).json({
          message: "没有输入规范的公司名",
        });
      }
      if (
        !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
          eMail
        )
      ) {
        return res.status(400).json({
          message: "这不是规范的邮箱格式",
        });
      }
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(ePhone)) {
        return res.status(400).json({
          message: "这不是规范的手机格式",
        });
      }
      const enterpriseName = await Enterprise.findOne({ eName });
      if (enterpriseName) {
        return res.status(400).json({
          message: "该用户名已被注册",
        });
      }
      const enterpriseCName = await Enterprise.findOne({ cName });
      if (enterpriseCName) {
        return res.status(400).json({
          message: "该公司名已被注册",
        });
      }
      const enterpriseMail = await Enterprise.findOne({ eMail });
      if (enterpriseMail) {
        return res.status(400).json({
          message: "该邮箱已被注册",
        });
      }
      const enterprisePhone = await Enterprise.findOne({ ePhone });
      if (enterprisePhone) {
        return res.status(400).json({
          message: "该手机号已被注册",
        });
      }
      const eWordCrypto = Crypto.createHash("sha1").update(eWord).digest("hex");
      const newEnterprise = {
        eName,
        cName,
        eWord: eWordCrypto,
        area,
        eMail,
        ePhone,
      };
      const newenterprise = new Enterprise(newEnterprise);
      await newenterprise.save();
      return res.json({
        message: "注册成功!!!",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/enterprises/login", async (req, res) => {
    try {
      const { eName, eWord } = req.body;
      if (!eName) {
        return res.status(400).json({
          message: "请输入用户名",
        });
      }
      if (!eWord) {
        return res.status(400).json({
          message: "请输入密码",
        });
      }
      const eWordCrypto = Crypto.createHash("sha1").update(eWord).digest("hex");
      const enterprise = await Enterprise.findOne({ eName });
      if (!eName) {
        return res.status(400).json({
          message: "该用户不存在!!!",
        });
      }
      if (eWordCrypto !== enterprise.eWord) {
        return res.status(400).json({
          message: "密码错误，请重新输入!!!",
        });
      }
      const tokenstr = uuidv4();
      const token = Crypto.createHash("sha1").update(tokenstr).digest("hex");
      enterprise.token = token;
      await enterprise.save();
      return res.json({
        message: "登录成功!!!",
        data: {
          eName: enterprise.eName,
          token: enterprise.token,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/enterprises/auth", async (req, res) => {
    try {
      const { eName, token } = req.body;
      if (!eName) {
        return res.status(400).json({
          message: "没有获取到用户名",
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
          message: "token已经过期，请重新登陆",
        });
      }
      return res.json({
        message: "成功验证",
        data: enterprise,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.post("/api/enterprises/logout", async (req, res) => {
    try {
      const { eName, token } = req.body;
      if (!eName) {
        return res.status(400).json({
          message: "没有获取到用户名",
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
          message: "已经处于登出状态",
        });
      }
      enterprise.token = null;
      await enterprise.save();
      return res.json({
        message: "成功退出!!!",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.patch("/api/enterprises", upload.single("logo"), async (req, res) => {
    try {
      const { eName, token } = req.body;
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
      const enterprise = await Enterprise.findOne({
        eName,
        token,
      });
      if (!enterprise) {
        return res.status(400).json({
          message: "token已经过期，请重新登录",
        });
      }
      if (req.file) {
        enterprise.logo = req.file.filename;
      } else {
        return res.status(400).json({
          message: "请上传logo!",
        });
      }
      await enterprise.save();
      return res.json({
        message: "上传logo成功!",
        data: enterprise,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.get("/api/enterprises/:eName", async (req, res) => {
    try {
      const { eName } = req.params;
      if (!eName) {
        return res.status(400).json({
          message: "没有获取到用户名",
        });
      }
      const enterprise = await Enterprise.findOne({ eName })
        .populate(
          "informations",
          "companyName position pay condition postTime description students"
        )
        .populate("students", "sName tName avatar informations");
      if (!enterprise) {
        return res.status(400).json({
          message: "该用户不存在",
        });
      }
      enterprise.eWord = null;
      enterprise.token = null;
      return res.json({
        data: enterprise,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.patch("/api/enterprises/reply/:iid", async (req, res) => {
    try {
      const { eName, token, reply, iid } = req.body;
      if (!iid) {
        return res.status(400).json({
          message: "没有获取到投递者信息",
        });
      }
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
      if (!reply) {
        return res.status(400).json({
          message: "请输入回复!!!",
        });
      }
      const enterprise = await Enterprise.findOne({ eName, token });
      if (!enterprise) {
        return res.status(400).json({
          message: "用户凭证已经过期，请重新登录",
        });
      }
      const information = await Information.findById(iid);
      if (!information) {
        return res.status(400).json({
          message: "没有找到这条招聘信息",
        });
      }
      information.reply = reply;
      await information.save();
      return res.json({
        message: "回复成功!!!",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
  app.get("/api/enterprises", async (req, res) => {
    try {
      const enterprises = await Enterprise.find();
      return res.json({
        data: enterprises,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });
};

export default enterpriseAPIs;
