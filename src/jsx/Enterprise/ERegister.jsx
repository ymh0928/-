import React, { createRef, useState, useContext, Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  Select,
  AutoComplete,
  Cascader,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { HOST, PORT, DOMAIN } from "../../config";
import Footer from "../Footer";
import { allContext } from "../App";

const RegistrationFormE = (props) => {
  const { history } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const { setEnterprise, setAuthEnterprise } = useContext(allContext);
  const [area, setArea] = useState("");

  const login = async (body) => {
    try {
      const { eName, eWord } = body;
      const res = await fetch(`${HOST}:${PORT}/api/enterprises/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eName,
          eWord,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        const data = {
          eName: result.data.eName,
          token: result.data.token,
        };
        await localStorage.setItem(DOMAIN, JSON.stringify(data));
        setAuthEnterprise(true);
        setEnterprise({
          eName: result.data.eName,
          token: result.data.toke,
        });
        history.push(`/enterprise/profile/${eName}`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const register = async (body) => {
    try {
      const { eName, cName, eWord, confirm, eMail, ePhone, area } = body;
      const res = await fetch(`${HOST}:${PORT}/api/enterprises`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          eName,
          cName,
          eWord,
          confirm,
          eMail,
          ePhone,
          area,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        login(body);
      } else {
        alert(result.message);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const eName = document.querySelector("#eName").value;
    const cName = document.querySelector("#cName").value;
    const eWord = document.querySelector("#eWord").value;
    const confirm = document.querySelector("#confirm").value;
    const eMail = document.querySelector("#eMail").value;
    const ePhone = document.querySelector("#ePhone").value;
    const body = {
      eName,
      cName,
      eWord,
      confirm,
      eMail,
      ePhone,
      area,
    };
    register(body);
  };

  const refName = createRef();
  document.onkeyup = (e) => {
    if (e.target === document.body) {
      if (e.keyCode === 83) {
        refName.current.focus();
      }
    } else if (e.target !== refName.current) {
      if (e.keyCode === 83) {
        return;
      }
    }
  };

  const [result, setResult] = useState([]);
  const handleSearch = (value) => {
    let res = [];
    if (!value || value.indexOf("@") >= 0) {
      res = [];
    } else {
      res = ["qq.com", "163.com", "126.com", "Gmail.com", "Foxmail.com"].map(
        (domain) => `${value}@${domain}`
      );
    }
    setResult(res);
  };

  const options = [
    {
      value: "北京市",
      label: "北京市",
      children: [
        {
          value: "朝阳区",
          label: "朝阳区",
        },
        {
          value: "海淀区",
          label: "海淀区",
        },
        {
          value: "通州区",
          label: "通州区",
        },
        {
          value: "房山区",
          label: "房山区",
        },
        {
          value: "丰台区",
          label: "丰台区",
        },
        {
          value: "昌平区",
          label: "昌平区",
        },
        {
          value: "大兴区",
          label: "大兴区",
        },
        {
          value: "顺义区",
          label: "顺义区",
        },
        {
          value: "西城区",
          label: "西城区",
        },
        {
          value: "延庆县",
          label: "延庆县",
        },
        {
          value: "石景山区",
          label: "石景山区",
        },
        {
          value: "宣武区",
          label: "宣武区",
        },
        {
          value: "怀柔区",
          label: "怀柔区",
        },
        {
          value: "崇文区",
          label: "崇文区",
        },
        {
          value: "密云县",
          label: "密云县",
        },
        {
          value: "东城区",
          label: "东城区",
        },
        {
          value: "平谷区",
          label: "平谷区",
        },
        {
          value: "门头沟区",
          label: "门头沟区",
        },
      ],
    },
    {
      value: "广东省",
      label: "广东省",
      children: [
        {
          value: "东莞市",
          label: "东莞市",
        },
        {
          value: "广州市",
          label: "广州市",
        },
        {
          value: "中山市",
          label: "中山市",
        },
        {
          value: "深圳市",
          label: "深圳市",
        },
        {
          value: "惠州市",
          label: "惠州市",
        },
        {
          value: "江门市",
          label: "江门市",
        },
        {
          value: "珠海市",
          label: "珠海市",
        },
        {
          value: "汕头市",
          label: "汕头市",
        },
        {
          value: "佛山市",
          label: "佛山市",
        },
        {
          value: "湛江市",
          label: "湛江市",
        },
        {
          value: "河源市",
          label: "河源市",
        },
        {
          value: "肇庆市",
          label: "肇庆市",
        },
        {
          value: "清远市",
          label: "清远市",
        },
        {
          value: "潮州市",
          label: "潮州市",
        },
        {
          value: "韶关市",
          label: "韶关市",
        },
        {
          value: "揭阳市",
          label: "揭阳市",
        },
        {
          value: "阳江市",
          label: "阳江市",
        },
        {
          value: "梅州市",
          label: "梅州市",
        },
        {
          value: "云浮市",
          label: "云浮市",
        },
        {
          value: "茂名市",
          label: "茂名市",
        },
        {
          value: "汕尾市",
          label: "汕尾市",
        },
      ],
    },
    {
      value: "山东省",
      label: "山东省",
      children: [
        {
          value: "济南市",
          label: "济南市",
        },
        {
          value: "青岛市",
          label: "青岛市",
        },
        {
          value: "临沂市",
          label: "临沂市",
        },
        {
          value: "济宁市",
          label: "济宁市",
        },
        {
          value: "菏泽市",
          label: "菏泽市",
        },
        {
          value: "烟台市",
          label: "烟台市",
        },
        {
          value: "淄博市",
          label: "淄博市",
        },
        {
          value: "泰安市",
          label: "泰安市",
        },
        {
          value: "潍坊市",
          label: "潍坊市",
        },
        {
          value: "日照市",
          label: "日照市",
        },
        {
          value: "威海市",
          label: "威海市",
        },
        {
          value: "滨州市",
          label: "滨州市",
        },
        {
          value: "东营市",
          label: "东营市",
        },
        {
          value: "聊城市",
          label: "聊城市",
        },
        {
          value: "德州市",
          label: "德州市",
        },
        {
          value: "莱芜市",
          label: "莱芜市",
        },
        {
          value: "枣庄市",
          label: "枣庄市",
        },
      ],
    },
    {
      value: "江苏省",
      label: "江苏省",
      children: [
        {
          value: "苏州市",
          label: "苏州市",
        },
        {
          value: "徐州市",
          label: "徐州市",
        },
        {
          value: "盐城市",
          label: "盐城市",
        },
        {
          value: "无锡市",
          label: "无锡市",
        },
        {
          value: "南京市",
          label: "南京市",
        },
        {
          value: "南通市",
          label: "南通市",
        },
        {
          value: "连云港市",
          label: "连云港市",
        },
        {
          value: "常州市",
          label: "常州市",
        },
        {
          value: "镇江市",
          label: "镇江市",
        },
        {
          value: "扬州市",
          label: "扬州市",
        },
        {
          value: "淮安市",
          label: "淮安市",
        },
        {
          value: "泰州市",
          label: "泰州市",
        },
        {
          value: "宿迁市",
          label: "宿迁市",
        },
      ],
    },
    {
      value: "河南省",
      label: "河南省",
      children: [
        {
          value: "郑州市",
          label: "郑州市",
        },
        {
          value: "南阳市",
          label: "南阳市",
        },
        {
          value: "新乡市",
          label: "新乡市",
        },
        {
          value: "安阳市",
          label: "安阳市",
        },
        {
          value: "洛阳市",
          label: "洛阳市",
        },
        {
          value: "信阳市",
          label: "信阳市",
        },
        {
          value: "平顶山市",
          label: "平顶山市",
        },
        {
          value: "周口市",
          label: "周口市",
        },
        {
          value: "商丘市",
          label: "商丘市",
        },
        {
          value: "开封市",
          label: "开封市",
        },
        {
          value: "焦作市",
          label: "焦作市",
        },
        {
          value: "驻马店市",
          label: "驻马店市",
        },
        {
          value: "濮阳市",
          label: "濮阳市",
        },
        {
          value: "三门峡市",
          label: "三门峡市",
        },
        {
          value: "漯河市",
          label: "漯河市",
        },
        {
          value: "许昌市",
          label: "许昌市",
        },
        {
          value: "鹤壁市",
          label: "鹤壁市",
        },
        {
          value: "济源市",
          label: "济源市",
        },
      ],
    },
    {
      value: "上海市",
      label: "上海市",
      children: [
        {
          value: "松江区",
          label: "松江区",
        },
        {
          value: "宝山区",
          label: "宝山区",
        },
        {
          value: "金山区",
          label: "金山区",
        },
        {
          value: "嘉定区",
          label: "嘉定区",
        },
        {
          value: "南汇区",
          label: "南汇区",
        },
        {
          value: "青浦区",
          label: "青浦区",
        },
        {
          value: "浦东新区",
          label: "浦东新区",
        },
        {
          value: "奉贤区",
          label: "奉贤区",
        },
        {
          value: "徐汇区",
          label: "徐汇区",
        },
        {
          value: "静安区",
          label: "静安区",
        },
        {
          value: "闵行区",
          label: "闵行区",
        },
        {
          value: "黄浦区",
          label: "黄浦区",
        },
        {
          value: "杨浦区",
          label: "杨浦区",
        },
        {
          value: "虹口区",
          label: "虹口区",
        },
        {
          value: "普陀区",
          label: "普陀区",
        },
        {
          value: "闸北区",
          label: "闸北区",
        },
        {
          value: "长宁区",
          label: "长宁区",
        },
        {
          value: "崇明县",
          label: "崇明县",
        },
        {
          value: "卢湾区",
          label: "卢湾区",
        },
      ],
    },
    {
      value: "河北省",
      label: "河北省",
      children: [
        {
          value: "石家庄市",
          label: "石家庄市",
        },
        {
          value: "唐山市",
          label: "唐山市",
        },
        {
          value: "保定市",
          label: "保定市",
        },
        {
          value: "邯郸市",
          label: "邯郸市",
        },
        {
          value: "邢台市",
          label: "邢台市",
        },
        {
          value: "河北区",
          label: "河北区",
        },
        {
          value: "沧州市",
          label: "沧州市",
        },
        {
          value: "秦皇岛市",
          label: "秦皇岛市",
        },
        {
          value: "张家口市",
          label: "张家口市",
        },
        {
          value: "衡水市",
          label: "衡水市",
        },
        {
          value: "廊坊市",
          label: "廊坊市",
        },
        {
          value: "承德市",
          label: "承德市",
        },
      ],
    },
    {
      value: "浙江省",
      label: "浙江省",
      children: [
        {
          value: "温州市",
          label: "温州市",
        },
        {
          value: "宁波市",
          label: "宁波市",
        },
        {
          value: "杭州市",
          label: "杭州市",
        },
        {
          value: "台州市",
          label: "台州市",
        },
        {
          value: "嘉兴市",
          label: "嘉兴市",
        },
        {
          value: "金华市",
          label: "金华市",
        },
        {
          value: "湖州市",
          label: "湖州市",
        },
        {
          value: "绍兴市",
          label: "绍兴市",
        },
        {
          value: "舟山市",
          label: "舟山市",
        },
        {
          value: "丽水市",
          label: "丽水市",
        },
        {
          value: "衢州市",
          label: "衢州市",
        },
      ],
    },
    {
      value: "陕西省",
      label: "陕西省",
      children: [
        {
          value: "西安市",
          label: "西安市",
        },
        {
          value: "咸阳市",
          label: "咸阳市",
        },
        {
          value: "宝鸡市",
          label: "宝鸡市",
        },
        {
          value: "汉中市",
          label: "汉中市",
        },
        {
          value: "渭南市",
          label: "渭南市",
        },
        {
          value: "安康市",
          label: "安康市",
        },
        {
          value: "榆林市",
          label: "榆林市",
        },
        {
          value: "商洛市",
          label: "商洛市",
        },
        {
          value: "延安市",
          label: "延安市",
        },
        {
          value: "铜川市",
          label: "铜川市",
        },
      ],
    },
    {
      value: "湖南省",
      label: "湖南省",
      children: [
        {
          value: "长沙市",
          label: "长沙市",
        },
        {
          value: "邵阳市",
          label: "邵阳市",
        },
        {
          value: "常德市",
          label: "常德市",
        },
        {
          value: "衡阳市",
          label: "衡阳市",
        },
        {
          value: "株洲市",
          label: "株洲市",
        },
        {
          value: "湘潭市",
          label: "湘潭市",
        },
        {
          value: "永州市",
          label: "永州市",
        },
        {
          value: "岳阳市",
          label: "岳阳市",
        },
        {
          value: "怀化市",
          label: "怀化市",
        },
        {
          value: "郴州市",
          label: "郴州市",
        },
        {
          value: "娄底市",
          label: "娄底市",
        },
        {
          value: "益阳市",
          label: "益阳市",
        },
        {
          value: "张家界市",
          label: "张家界市",
        },
        {
          value: "湘西州",
          label: "湘西州",
        },
      ],
    },
    {
      value: "重庆市",
      label: "重庆市",
      children: [
        {
          value: "江北区",
          label: "江北区",
        },
        {
          value: "渝北区",
          label: "渝北区",
        },
        {
          value: "沙坪坝区",
          label: "沙坪坝区",
        },
        {
          value: "九龙坡区",
          label: "九龙坡区",
        },
        {
          value: "万州区",
          label: "万州区",
        },
        {
          value: "永川市",
          label: "永川市",
        },
        {
          value: "南岸区",
          label: "南岸区",
        },
        {
          value: "酉阳县",
          label: "酉阳县",
        },
        {
          value: "北碚区",
          label: "北碚区",
        },
        {
          value: "涪陵区",
          label: "涪陵区",
        },
        {
          value: "秀山县",
          label: "秀山县",
        },
        {
          value: "巴南区",
          label: "巴南区",
        },
        {
          value: "渝中区",
          label: "渝中区",
        },
        {
          value: "石柱县",
          label: "石柱县",
        },
        {
          value: "忠县",
          label: "忠县",
        },
        {
          value: "合川市",
          label: "合川市",
        },
        {
          value: "大渡口区",
          label: "大渡口区",
        },
        {
          value: "开县",
          label: "开县",
        },
        {
          value: "长寿区",
          label: "长寿区",
        },
        {
          value: "荣昌县",
          label: "荣昌县",
        },
        {
          value: "云阳县",
          label: "云阳县",
        },
        {
          value: "梁平县",
          label: "梁平县",
        },
        {
          value: "潼南县",
          label: "潼南县",
        },
        {
          value: "江津市",
          label: "江津市",
        },
        {
          value: "彭水县",
          label: "彭水县",
        },
        {
          value: "綦江县",
          label: "綦江县",
        },
        {
          value: "璧山县",
          label: "璧山县",
        },
        {
          value: "黔江区",
          label: "黔江区",
        },
        {
          value: "大足县",
          label: "大足县",
        },
        {
          value: "巫山县",
          label: "巫山县",
        },
        {
          value: "巫溪县",
          label: "巫溪县",
        },
        {
          value: "垫江县",
          label: "垫江县",
        },
        {
          value: "丰都县",
          label: "丰都县",
        },
        {
          value: "武隆县",
          label: "武隆县",
        },
        {
          value: "万盛区",
          label: "万盛区",
        },
        {
          value: "铜梁县",
          label: "铜梁县",
        },
        {
          value: "南川市",
          label: "南川市",
        },
        {
          value: "奉节县",
          label: "奉节县",
        },
        {
          value: "双桥区",
          label: "双桥区",
        },
        {
          value: "城口县",
          label: "城口县",
        },
      ],
    },
    {
      value: "福建省",
      label: "福建省",
      children: [
        {
          value: "漳州市",
          label: "漳州市",
        },
        {
          value: "厦门市",
          label: "厦门市",
        },
        {
          value: "泉州市",
          label: "泉州市",
        },
        {
          value: "福州市",
          label: "福州市",
        },
        {
          value: "莆田市",
          label: "莆田市",
        },
        {
          value: "宁德市",
          label: "宁德市",
        },
        {
          value: "三明市",
          label: "三明市",
        },
        {
          value: "南平市",
          label: "南平市",
        },
        {
          value: "龙岩市",
          label: "龙岩市",
        },
      ],
    },
    {
      value: "天津市",
      label: "天津市",
      children: [
        {
          value: "和平区",
          label: "和平区",
        },
        {
          value: "北辰区",
          label: "北辰区",
        },
        {
          value: "河北区",
          label: "河北区",
        },
        {
          value: "河西区",
          label: "河西区",
        },
        {
          value: "西青区",
          label: "西青区",
        },
        {
          value: "津南区",
          label: "津南区",
        },
        {
          value: "东丽区",
          label: "东丽区",
        },
        {
          value: "武清区",
          label: "武清区",
        },
        {
          value: "宝坻区",
          label: "宝坻区",
        },
        {
          value: "红桥区",
          label: "红桥区",
        },
        {
          value: "大港区",
          label: "大港区",
        },
        {
          value: "汉沽区",
          label: "汉沽区",
        },
        {
          value: "静海县",
          label: "静海县",
        },
        {
          value: "塘沽区",
          label: "塘沽区",
        },
        {
          value: "宁河县",
          label: "宁河县",
        },
        {
          value: "蓟县",
          label: "蓟县",
        },
        {
          value: "南开区",
          label: "南开区",
        },
        {
          value: "河东区",
          label: "河东区",
        },
      ],
    },
    {
      value: "云南省",
      label: "云南省",
      children: [
        {
          value: "昆明市",
          label: "昆明市",
        },
        {
          value: "红河州",
          label: "红河州",
        },
        {
          value: "大理州",
          label: "大理州",
        },
        {
          value: "文山州",
          label: "文山州",
        },
        {
          value: "德宏州",
          label: "德宏州",
        },
        {
          value: "曲靖市",
          label: "曲靖市",
        },
        {
          value: "昭通市",
          label: "昭通市",
        },
        {
          value: "楚雄州",
          label: "楚雄州",
        },
        {
          value: "保山市",
          label: "保山市",
        },
        {
          value: "玉溪市",
          label: "玉溪市",
        },
        {
          value: "丽江地区",
          label: "丽江地区",
        },
        {
          value: "临沧地区",
          label: "临沧地区",
        },
        {
          value: "思茅地区",
          label: "思茅地区",
        },
        {
          value: "西双版纳州",
          label: "西双版纳州",
        },
        {
          value: "怒江州",
          label: "怒江州",
        },
        {
          value: "迪庆州",
          label: "迪庆州",
        },
      ],
    },
    {
      value: "四川省",
      label: "四川省",
      children: [
        {
          value: "成都市",
          label: "成都市",
        },
        {
          value: "绵阳市",
          label: "绵阳市",
        },
        {
          value: "广元市",
          label: "广元市",
        },
        {
          value: "达州市",
          label: "达州市",
        },
        {
          value: "南充市",
          label: "南充市",
        },
        {
          value: "德阳市",
          label: "德阳市",
        },
        {
          value: "广安市",
          label: "广安市",
        },
        {
          value: "阿坝州",
          label: "阿坝州",
        },
        {
          value: "巴中市",
          label: "巴中市",
        },
        {
          value: "遂宁市",
          label: "遂宁市",
        },
        {
          value: "内江市",
          label: "内江市",
        },
        {
          value: "凉山州",
          label: "凉山州",
        },
        {
          value: "攀枝花市",
          label: "攀枝花市",
        },
        {
          value: "乐山市",
          label: "乐山市",
        },
        {
          value: "自贡市",
          label: "自贡市",
        },
        {
          value: "泸州市",
          label: "泸州市",
        },
        {
          value: "宜宾市",
          label: "宜宾市",
        },
        {
          value: "资阳市",
          label: "资阳市",
        },
        {
          value: "眉山市",
          label: "眉山市",
        },
        {
          value: "甘孜州",
          label: "甘孜州",
        },
      ],
    },
    {
      value: "广西壮族自治区",
      label: "广西壮族自治区",
      children: [
        {
          value: "贵港市",
          label: "贵港市",
        },
        {
          value: "玉林市",
          label: "玉林市",
        },
        {
          value: "北海市",
          label: "北海市",
        },
        {
          value: "南宁市",
          label: "南宁市",
        },
        {
          value: "柳州市",
          label: "柳州市",
        },
        {
          value: "桂林市",
          label: "桂林市",
        },
        {
          value: "梧州市",
          label: "梧州市",
        },
        {
          value: "钦州市",
          label: "钦州市",
        },
        {
          value: "来宾市",
          label: "来宾市",
        },
        {
          value: "河池市",
          label: "河池市",
        },
        {
          value: "百色市",
          label: "百色市",
        },
        {
          value: "贺州市",
          label: "贺州市",
        },
        {
          value: "崇左市",
          label: "崇左市",
        },
        {
          value: "防城港市",
          label: "防城港市",
        },
      ],
    },
    {
      value: "安徽省",
      label: "安徽省",
      children: [
        {
          value: "芜湖市",
          label: "芜湖市",
        },
        {
          value: "合肥市",
          label: "合肥市",
        },
        {
          value: "六安市",
          label: "六安市",
        },
        {
          value: "宿州市",
          label: "宿州市",
        },
        {
          value: "阜阳市",
          label: "阜阳市",
        },
        {
          value: "安庆市",
          label: "安庆市",
        },
        {
          value: "马鞍山市",
          label: "马鞍山市",
        },
        {
          value: "蚌埠市",
          label: "蚌埠市",
        },
        {
          value: "淮北市",
          label: "淮北市",
        },
        {
          value: "淮南市",
          label: "淮南市",
        },
        {
          value: "宣城市",
          label: "宣城市",
        },
        {
          value: "黄山市",
          label: "黄山市",
        },
        {
          value: "铜陵市",
          label: "铜陵市",
        },
        {
          value: "亳州市",
          label: "亳州市",
        },
        {
          value: "池州市",
          label: "池州市",
        },
        {
          value: "巢湖市",
          label: "巢湖市",
        },
        {
          value: "滁州市",
          label: "滁州市",
        },
      ],
    },
    {
      value: "海南省",
      label: "海南省",
      children: [
        {
          value: "三亚市",
          label: "三亚市",
        },
        {
          value: "海口市",
          label: "海口市",
        },
        {
          value: "琼海市",
          label: "琼海市",
        },
        {
          value: "文昌市",
          label: "文昌市",
        },
        {
          value: "东方市",
          label: "东方市",
        },
        {
          value: "昌江县",
          label: "昌江县",
        },
        {
          value: "陵水县",
          label: "陵水县",
        },
        {
          value: "乐东县",
          label: "乐东县",
        },
        {
          value: "保亭县",
          label: "保亭县",
        },
        {
          value: "五指山市",
          label: "五指山市",
        },
        {
          value: "澄迈县",
          label: "澄迈县",
        },
        {
          value: "万宁市",
          label: "万宁市",
        },
        {
          value: "儋州市",
          label: "儋州市",
        },
        {
          value: "临高县",
          label: "临高县",
        },
        {
          value: "白沙县",
          label: "白沙县",
        },
        {
          value: "定安县",
          label: "定安县",
        },
        {
          value: "琼中县",
          label: "琼中县",
        },
        {
          value: "屯昌县",
          label: "屯昌县",
        },
      ],
    },
    {
      value: "江西省",
      label: "江西省",
      children: [
        {
          value: "南昌市",
          label: "南昌市",
        },
        {
          value: "赣州市",
          label: "赣州市",
        },
        {
          value: "上饶市",
          label: "上饶市",
        },
        {
          value: "吉安市",
          label: "吉安市",
        },
        {
          value: "九江市",
          label: "九江市",
        },
        {
          value: "新余市",
          label: "新余市",
        },
        {
          value: "抚州市",
          label: "抚州市",
        },
        {
          value: "宜春市",
          label: "宜春市",
        },
        {
          value: "景德镇市",
          label: "景德镇市",
        },
        {
          value: "萍乡市",
          label: "萍乡市",
        },
        {
          value: "鹰潭市",
          label: "鹰潭市",
        },
      ],
    },
    {
      value: "湖北省",
      label: "湖北省",
      children: [
        {
          value: "武汉市",
          label: "武汉市",
        },
        {
          value: "宜昌市",
          label: "宜昌市",
        },
        {
          value: "襄樊市",
          label: "襄樊市",
        },
        {
          value: "荆州市",
          label: "荆州市",
        },
        {
          value: "恩施州",
          label: "恩施州",
        },
        {
          value: "黄冈市",
          label: "黄冈市",
        },
        {
          value: "孝感市",
          label: "孝感市",
        },
        {
          value: "十堰市",
          label: "十堰市",
        },
        {
          value: "咸宁市",
          label: "咸宁市",
        },
        {
          value: "黄石市",
          label: "黄石市",
        },
        {
          value: "仙桃市",
          label: "仙桃市",
        },
        {
          value: "天门市",
          label: "天门市",
        },
        {
          value: "随州市",
          label: "随州市",
        },
        {
          value: "荆门市",
          label: "荆门市",
        },
        {
          value: "潜江市",
          label: "潜江市",
        },
        {
          value: "鄂州市",
          label: "鄂州市",
        },
        {
          value: "神农架林区",
          label: "神农架林区",
        },
      ],
    },
    {
      value: "山西省",
      label: "山西省",
      children: [
        {
          value: "太原市",
          label: "太原市",
        },
        {
          value: "大同市",
          label: "大同市",
        },
        {
          value: "运城市",
          label: "运城市",
        },
        {
          value: "长治市",
          label: "长治市",
        },
        {
          value: "晋城市",
          label: "晋城市",
        },
        {
          value: "忻州市",
          label: "忻州市",
        },
        {
          value: "临汾市",
          label: "临汾市",
        },
        {
          value: "吕梁市",
          label: "吕梁市",
        },
        {
          value: "晋中市",
          label: "晋中市",
        },
        {
          value: "阳泉市",
          label: "阳泉市",
        },
        {
          value: "朔州市",
          label: "朔州市",
        },
      ],
    },
    {
      value: "辽宁省",
      label: "辽宁省",
      children: [
        {
          value: "大连市",
          label: "大连市",
        },
        {
          value: "沈阳市",
          label: "沈阳市",
        },
        {
          value: "丹东市",
          label: "丹东市",
        },
        {
          value: "辽阳市",
          label: "辽阳市",
        },
        {
          value: "葫芦岛市",
          label: "葫芦岛市",
        },
        {
          value: "锦州市",
          label: "锦州市",
        },
        {
          value: "朝阳市",
          label: "朝阳市",
        },
        {
          value: "营口市",
          label: "营口市",
        },
        {
          value: "鞍山市",
          label: "鞍山市",
        },
        {
          value: "抚顺市",
          label: "抚顺市",
        },
        {
          value: "盘锦市",
          label: "盘锦市",
        },
        {
          value: "本溪市",
          label: "本溪市",
        },
        {
          value: "铁岭市",
          label: "铁岭市",
        },
        {
          value: "阜新市",
          label: "阜新市",
        },
      ],
    },
    {
      value: "台湾省",
      label: "台湾省",
      children: [
        {
          value: "台北市",
          label: "台北市",
        },
        {
          value: "高雄市",
          label: "高雄市",
        },
        {
          value: "台中市",
          label: "台中市",
        },
        {
          value: "新竹市",
          label: "新竹市",
        },
        {
          value: "基隆市",
          label: "基隆市",
        },
        {
          value: "台南市",
          label: "台南市",
        },
        {
          value: "嘉义市",
          label: "嘉义市",
        },
      ],
    },
    {
      value: "黑龙江省",
      label: "黑龙江省",
      children: [
        {
          value: "齐齐哈尔市",
          label: "齐齐哈尔市",
        },
        {
          value: "哈尔滨市",
          label: "哈尔滨市",
        },
        {
          value: "大庆市",
          label: "大庆市",
        },
        {
          value: "佳木斯市",
          label: "佳木斯市",
        },
        {
          value: "双鸭山市",
          label: "双鸭山市",
        },
        {
          value: "牡丹江市",
          label: "牡丹江市",
        },
        {
          value: "鸡西市",
          label: "鸡西市",
        },
        {
          value: "黑河市",
          label: "黑河市",
        },
        {
          value: "绥化市",
          label: "绥化市",
        },
        {
          value: "鹤岗市",
          label: "鹤岗市",
        },
        {
          value: "伊春市",
          label: "伊春市",
        },
        {
          value: "大兴安岭地区",
          label: "大兴安岭地区",
        },
        {
          value: "七台河市",
          label: "七台河市",
        },
      ],
    },
    {
      value: "内蒙古自治区",
      label: "内蒙古自治区",
      children: [
        {
          value: "赤峰市",
          label: "赤峰市",
        },
        {
          value: "包头市",
          label: "包头市",
        },
        {
          value: "通辽市",
          label: "通辽市",
        },
        {
          value: "呼和浩特市",
          label: "呼和浩特市",
        },
        {
          value: "鄂尔多斯市",
          label: "鄂尔多斯市",
        },
        {
          value: "乌海市",
          label: "乌海市",
        },
        {
          value: "呼伦贝尔市",
          label: "呼伦贝尔市",
        },
        {
          value: "兴安盟",
          label: "兴安盟",
        },
        {
          value: "巴彦淖尔盟",
          label: "巴彦淖尔盟",
        },
        {
          value: "乌兰察布盟",
          label: "乌兰察布盟",
        },
        {
          value: "锡林郭勒盟",
          label: "锡林郭勒盟",
        },
        {
          value: "阿拉善盟",
          label: "阿拉善盟",
        },
      ],
    },
    {
      value: "贵州省",
      label: "贵州省",
      children: [
        {
          value: "贵阳市",
          label: "贵阳市",
        },
        {
          value: "黔东南州",
          label: "黔东南州",
        },
        {
          value: "黔南州",
          label: "黔南州",
        },
        {
          value: "遵义市",
          label: "遵义市",
        },
        {
          value: "黔西南州",
          label: "黔西南州",
        },
        {
          value: "毕节地区",
          label: "毕节地区",
        },
        {
          value: "铜仁地区",
          label: "铜仁地区",
        },
        {
          value: "安顺市",
          label: "安顺市",
        },
        {
          value: "六盘水市",
          label: "六盘水市",
        },
      ],
    },
    {
      value: "甘肃省",
      label: "甘肃省",
      children: [
        {
          value: "兰州市",
          label: "兰州市",
        },
        {
          value: "天水市",
          label: "天水市",
        },
        {
          value: "庆阳市",
          label: "庆阳市",
        },
        {
          value: "武威市",
          label: "武威市",
        },
        {
          value: "酒泉市",
          label: "酒泉市",
        },
        {
          value: "张掖市",
          label: "张掖市",
        },
        {
          value: "陇南地区",
          label: "陇南地区",
        },
        {
          value: "白银市",
          label: "白银市",
        },
        {
          value: "定西地区",
          label: "定西地区",
        },
        {
          value: "平凉市",
          label: "平凉市",
        },
        {
          value: "嘉峪关市",
          label: "嘉峪关市",
        },
        {
          value: "临夏回族自治州",
          label: "临夏回族自治州",
        },
        {
          value: "金昌市",
          label: "金昌市",
        },
        {
          value: "甘南州",
          label: "甘南州",
        },
      ],
    },
    {
      value: "青海省",
      label: "青海省",
      children: [
        {
          value: "西宁市",
          label: "西宁市",
        },
        {
          value: "海西州",
          label: "海西州",
        },
        {
          value: "海东地区",
          label: "海东地区",
        },
        {
          value: "海北州",
          label: "海北州",
        },
        {
          value: "果洛州",
          label: "果洛州",
        },
        {
          value: "玉树州",
          label: "玉树州",
        },
        {
          value: "黄南藏族自治州",
          label: "黄南藏族自治州",
        },
      ],
    },
    {
      value: "新疆维吾尔自治区",
      label: "青海省",
      children: [
        {
          value: "乌鲁木齐市",
          label: "乌鲁木齐市",
        },
        {
          value: "伊犁州",
          label: "伊犁州",
        },
        {
          value: "昌吉州",
          label: "昌吉州",
        },
        {
          value: "石河子市",
          label: "石河子市",
        },
        {
          value: "哈密地区",
          label: "哈密地区",
        },
        {
          value: "阿克苏地区",
          label: "阿克苏地区",
        },
        {
          value: "巴音郭楞州",
          label: "巴音郭楞州",
        },
        {
          value: "喀什地区",
          label: "喀什地区",
        },
        {
          value: "塔城地区",
          label: "塔城地区",
        },
        {
          value: "克拉玛依市",
          label: "克拉玛依市",
        },
        {
          value: "和田地区",
          label: "和田地区",
        },
        {
          value: "阿勒泰州",
          label: "阿勒泰州",
        },
        {
          value: "吐鲁番地区",
          label: "吐鲁番地区",
        },
        {
          value: "阿拉尔市",
          label: "阿拉尔市",
        },
        {
          value: "博尔塔拉州",
          label: "博尔塔拉州",
        },
        {
          value: "五家渠市",
          label: "五家渠市",
        },
        {
          value: "克孜勒苏州",
          label: "克孜勒苏州",
        },
        {
          value: "图木舒克市",
          label: "图木舒克市",
        },
      ],
    },
    {
      value: "西藏自治区",
      label: "西藏自治区",
      children: [
        {
          value: "拉萨市",
          label: "拉萨市",
        },
        {
          value: "山南地区",
          label: "山南地区",
        },
        {
          value: "林芝地区",
          label: "林芝地区",
        },
        {
          value: "日喀则地区",
          label: "日喀则地区",
        },
        {
          value: "阿里地区",
          label: "阿里地区",
        },
        {
          value: "昌都地区",
          label: "昌都地区",
        },
        {
          value: "那曲地区",
          label: "那曲地区",
        },
      ],
    },
    {
      value: "吉林省",
      label: "吉林省",
      children: [
        {
          value: "吉林市",
          label: "吉林市",
        },
        {
          value: "长春市",
          label: "长春市",
        },
        {
          value: "白山市",
          label: "白山市",
        },
        {
          value: "延边州",
          label: "延边州",
        },
        {
          value: "白城市",
          label: "白城市",
        },
        {
          value: "松原市",
          label: "松原市",
        },
        {
          value: "辽源市",
          label: "辽源市",
        },
        {
          value: "通化市",
          label: "通化市",
        },
        {
          value: "四平市",
          label: "四平市",
        },
      ],
    },
    {
      value: "宁夏回族自治区",
      label: "宁夏回族自治区",
      children: [
        {
          value: "银川市",
          label: "银川市",
        },
        {
          value: "吴忠市",
          label: "吴忠市",
        },
        {
          value: "中卫市",
          label: "中卫市",
        },
        {
          value: "石嘴山市",
          label: "石嘴山市",
        },
        {
          value: "固原市",
          label: "固原市",
        },
      ],
    },
  ];

  function onChange(value) {
    setArea(value[0] + value[1]);
  }
  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }

  return (
    <Fragment>
      <Row
        style={{
          background: "#C7EDCC",
          height: "700px",
        }}
      >
        <Col span={8}></Col>
        <Col span={8}>
          <Row
            style={{
              height: "100px",
            }}
          ></Row>
          <Row
            style={{
              background: "white",
            }}
          >
            <Col span={4}></Col>
            <Col
              span={16}
              style={{
                paddingTop: "30px",
              }}
            >
              <Form form={form} name="register" scrollToFirstError>
                <Form.Item
                  name="eName"
                  label={<span>用户名&nbsp;</span>}
                  rules={[
                    {
                      required: true,
                      message: "请输入你的用户名!",
                      whitespace: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (/[\u4e00-\u9fa5_a-zA-Z0-9_]{2,10}/.test(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "用户名只能包括中文、英文字母、数字和下划线，并且长度在2-10"
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    ref={refName}
                    id="eName"
                  />
                </Form.Item>
                <Form.Item
                  label="公司名"
                  name="cName"
                  rules={[
                    {
                      required: true,
                      message: "请输入公司名!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject("不是规范的公司名!");
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<HomeOutlined className="site-form-item-icon" />}
                    id="cName"
                  />
                </Form.Item>
                <Form.Item
                  name="eWord"
                  label="密码"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的密码!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (
                          /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
                            value
                          )
                        ) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符!"
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    id="eWord"
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="确认密码"
                  dependencies={["eWord"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "请确认你的密码!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("eWord") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject("两次输入的密码不一致!");
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    id="confirm"
                  />
                </Form.Item>
                <Form.Item
                  name="eMail"
                  label="邮箱"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的邮箱地址!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (
                          /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
                            value
                          )
                        ) {
                          return Promise.resolve();
                        }

                        return Promise.reject("不是规范的邮箱格式!");
                      },
                    }),
                  ]}
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  hasFeedback
                >
                  <AutoComplete
                    onSearch={handleSearch}
                    backfill="true"
                    id="eMail"
                  >
                    {result.map((email) => (
                      <Option key={email} value={email}>
                        {email}
                      </Option>
                    ))}
                  </AutoComplete>
                </Form.Item>
                <Form.Item
                  name="ePhone"
                  label="手机号"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的手机号码!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject("不是规范的手机格式!");
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                    id="ePhone"
                  />
                </Form.Item>
                <Form.Item
                  label="地区"
                  name="area"
                  rules={[
                    {
                      required: true,
                      message: "请选择公司所在地区!",
                    },
                  ]}
                >
                  <Cascader
                    options={options}
                    onChange={onChange}
                    placeholder="请选择公司所在地区"
                    showSearch={{ filter }}
                  />
                </Form.Item>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("请确认同意!"),
                    },
                  ]}
                >
                  <Checkbox>I have read the agreement</Checkbox>
                </Form.Item>
                <center>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={(e) => handleRegister(e)}
                    >
                      注册
                    </Button>
                  </Form.Item>
                </center>
              </Form>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Footer />
    </Fragment>
  );
};

export default withRouter(RegistrationFormE);
