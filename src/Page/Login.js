import Input from "./../Components/Input";
import { useState } from "react";
function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="flex justify-center items-center">
      <form className="flex flex-col border border-solid border-black rounded  p-2">
        <label className="grid grid-cols-5 pt-1">
          <span className="flex col-span-2">Name</span>
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
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
        <label className="grid grid-cols-5 pt-1">
          <span className="flex col-span-2">Confirm Password</span>
          <Input
            type="text"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
      </form>
    </div>
  );
}
export default Login;
