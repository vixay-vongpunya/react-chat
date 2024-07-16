import Input from "./../Components/Common/Input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Actions/User-Action";
import { connect } from "react-redux";
function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    const data = {
      email,
      password,
    };
    try {
      await props.login(data);
      navigate("/home");
    } catch (error) {
      alert("log in fails ", error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-solid border-black rounded  p-2"
      >
        <label className="grid grid-cols-5 pt-1">
          <span className="flex col-span-2">Email</span>
          <Input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="grid grid-cols-5 pt-1">
          <span className="flex col-span-2">Password</span>
          <Input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Login"
          className="border border-solid border-black rounded m-2"
        ></input>
      </form>
    </div>
  );
}
export default connect(null, { login })(Login);
