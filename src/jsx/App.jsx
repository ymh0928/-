import React, {
  createContext,
  useEffect,
  useState,
  Fragment,
  useRef,
} from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import NormalLoginFormS from "./Student/SLogin";
import RegistrationFormS from "./Student/SRegister";
import NormalLoginFormE from "./Enterprise/ELogin";
import RegistrationFormE from "./Enterprise/ERegister";
import Informations from "./Information/Informations";
import SearchInfor from "./Information/SearchInfor";
import SearchEnter from "./Information/SearchEnter";
import SHeader from "./SHeader";
import SPer from "./Student/SPer";
import EHeader from "./EHeader";
import EPer from "./Enterprise/EPer";
import { HOST, PORT, DOMAIN } from "../config";

const studentContext = createContext({
  student: {},
  setStudent: () => {},
  authStudent: false,
  setAuthStudent: () => {},
});

const enterpriseContext = createContext({
  enterprise: {},
  setEnterprise: () => {},
  authEnterprise: false,
  setAuthEnterprise: () => {},
});

const allContext = createContext({
  student: {},
  setStudent: () => {},
  authStudent: false,
  setAuthStudent: () => {},
  enterprise: {},
  setEnterprise: () => {},
  authEnterprise: false,
  setAuthEnterprise: () => {},
});

const App = () => {
  const [student, setStudent] = useState({});
  const [enterprise, setEnterprise] = useState({});
  const [authStudent, setAuthStudent] = useState(false);
  const [authEnterprise, setAuthEnterprise] = useState(false);

  const authenticateStudent = async () => {
    try {
      const body = await JSON.parse(localStorage.getItem(DOMAIN));
      const res = await fetch(`${HOST}:${PORT}/api/students/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.ok) {
        setStudent(result.data);
        setAuthStudent(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const authenticateEnterprise = async () => {
    try {
      const body = await JSON.parse(localStorage.getItem(DOMAIN));
      const res = await fetch(`${HOST}:${PORT}/api/enterprises/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.ok) {
        setEnterprise(result.data);
        setAuthEnterprise(true);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    authenticateStudent();
  }, []);

  useEffect(() => {
    authenticateEnterprise();
  }, []);

  const imgRef = useRef();
  document.onmousemove = (e) => {
    let x = e.pageX;
    let y = e.pageY;
    imgRef.current.style.left = x + 3 + "px";
    imgRef.current.style.top = y + 3 + "px";
  };

  return (
    <Fragment>
      {authStudent === false && authEnterprise === false ? (
        <allContext.Provider
          value={{
            student,
            setStudent,
            authStudent,
            setAuthStudent,
            enterprise,
            setEnterprise,
            authEnterprise,
            setAuthEnterprise,
          }}
        >
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home/" component={HomePage} />
            <Route path="/informations/" component={Informations} />
            <Route path="/searchInfor/" component={SearchInfor} />
            <Route path="/searchEnter/" component={SearchEnter} />
            <Route path="/registerS/" component={RegistrationFormS} />
            <Route path="/registerE/" component={RegistrationFormE} />
            <Route path="/loginS/" component={NormalLoginFormS} />
            <Route path="/loginE/" component={NormalLoginFormE} />
          </Switch>
          <img
            src="/img/tianshi.png"
            alt="天使"
            style={{
              position: "absolute",
              height: "50px",
              width: "50px",
            }}
            id="img"
            ref={imgRef}
          />
        </allContext.Provider>
      ) : authStudent === true ? (
        <studentContext.Provider
          value={{
            student,
            setStudent,
            authStudent,
            setAuthStudent,
          }}
        >
          <SHeader />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home/" component={HomePage} />
            <Route path="/informations/" component={Informations} />
            <Route path="/searchInfor/" component={SearchInfor} />
            <Route path="/searchEnter/" component={SearchEnter} />
            <Route path="/student/profile/:sName" component={SPer} />
          </Switch>
          <img
            src="/img/tianshi.png"
            alt="天使"
            style={{
              position: "absolute",
              height: "50px",
              width: "50px",
            }}
            id="img"
            ref={imgRef}
          />
        </studentContext.Provider>
      ) : (
        <enterpriseContext.Provider
          value={{
            enterprise,
            setEnterprise,
            authEnterprise,
            setAuthEnterprise,
          }}
        >
          <EHeader />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home/" component={HomePage} />
            <Route path="/informations/" component={Informations} />
            <Route path="/searchInfor/" component={SearchInfor} />
            <Route path="/searchEnter/" component={SearchEnter} />
            <Route path="/enterprise/profile/:eName" component={EPer} />
          </Switch>
          <img
            src="/img/tianshi.png"
            alt="天使"
            style={{
              position: "absolute",
              height: "50px",
              width: "50px",
            }}
            id="img"
            ref={imgRef}
          />
        </enterpriseContext.Provider>
      )}
    </Fragment>
  );
};

export { studentContext, enterpriseContext, allContext };
export default App;
