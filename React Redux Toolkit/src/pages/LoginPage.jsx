import { useRef, useState } from "react";
import { useFetchDataQuery } from "../store/dataApiSlice";
import { useNavigate } from "react-router-dom";

import Login from "../components/Login";
export default function LoginPage() {
  // localStorage.removeItem("user");
  const [user, setUser] = useState(false);
  const [err, setErr] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useFetchDataQuery();
  //

  function handleEmail() {
    console.log(emailRef.current.value);
    const inputEmail = emailRef.current.value;
    const inputUser = data.users.find((user) => user.email === inputEmail);
    if (inputUser) {
      setErr(false);
      localStorage.setItem(
        "user",
        JSON.stringify({ email: inputUser.email, name: inputUser.name })
      );
      const inputUserEmail = JSON.parse(localStorage.getItem("user"));
      setUser(inputUserEmail);
      console.log("email done");
      return;
    }
    setErr(true);
    console.log("email not found");

    return;
  }
  console.log(user);

  function handlePassword() {
    // if (user?.email) {
    setErr(false);
    console.log("email entered, please enter password");
    const inputPassword = passwordRef.current.value;
    const inputUser = data.users.find(
      (user) => user.password === inputPassword
    );
    if (inputUser) {
      localStorage.setItem("user", JSON.stringify(inputUser));
      console.log(
        "successfully logged in:",
        JSON.parse(localStorage.getItem("user"))
      );
      const inputUserPass = JSON.parse(localStorage.getItem("user"));
      setUser(inputUserPass);
      navigate("/home");
      return;
    }
    setErr(true);
    // }
    return;
  }
  //
  return (
    <Login
      obj={{ emailRef, passwordRef, handlePassword, handleEmail, user, err }}
    />
  );
}
