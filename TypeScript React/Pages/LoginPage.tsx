import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Login from "../components/Login";
import { useSelector } from "react-redux";
import { User } from "../models/dataModel";

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<
    { name: string; email: string } | User | null
  >(null);
  const [err, setErr] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const data = useSelector((store: any) => store.data);

  function handlePassword() {
    // if (user?.email) {
    setErr(false);
    console.log("email entered, please enter password");
    const inputPassword = passwordRef.current?.value;
    const inputUser = data.users.find(
      (user: User) => user.password === inputPassword
    );
    if (inputUser) {
      localStorage.setItem("user", JSON.stringify(inputUser));
      console.log(
        "successfully logged in:",
        JSON.parse(localStorage.getItem("user") || "")
      );
      const inputUserPass = JSON.parse(localStorage.getItem("user") || "");
      setUser(inputUserPass);
      navigate("/home");
      return;
    }
    setErr(true);
    // }
    return;
  }

  function handleEmail() {
    console.log(emailRef.current?.value);
    const inputEmail = emailRef.current?.value;
    const inputUser = data.users.find(
      (user: User) => user.email === inputEmail
    );
    console.log(inputUser);

    if (inputUser) {
      setErr(false);
      localStorage.setItem(
        "user",
        JSON.stringify({ email: inputUser.email, name: inputUser.name })
      );
      const inputUserEmail = JSON.parse(localStorage.getItem("user") || "");
      setUser(inputUserEmail);
      console.log("email done");
      return;
    }
    setErr(true);
    console.log("email not found");

    return;
  }
  console.log(user);

  return (
    <Login
      obj={{ emailRef, passwordRef, handlePassword, handleEmail, user, err }}
    />
  );
};

export default LoginPage;
