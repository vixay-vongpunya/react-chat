import Input from "./../Components/Common/Input";
import { useState } from "react";
import { signup } from "../Actions/User-Action";
import { useAuth } from "./../Utils/useAuth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Button from "../Components/Common/Button";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  .form {
    height: fit;
    width: 30%;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 16px 32px;
    gap: 10px;
  }
  label {
    display: flex;
    flex-direction: column;
  }
  input-box {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
  }
  .button {
    height: 30px;
    border: solid 1px var(--border-color);
    border-radius: var(--small-border-radius);
    cursor: pointer;
  }
  .error {
    color: red;
  }
`;

function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "", type: "" });
  const { login } = useAuth();
  const handleSubmit = async (event) => {
    console.log("api", process.env.REACT_APP_BACKEND_API_URL)
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log(password, confirmPassword)
      setError({ message: "password does not match", type: "password" });
      return;
    }
    const data = {
      name,
      email,
      password,
    };
    try {
      setLoading(true);
      const token = await props.signup(data);
      if (token) {
        console.log("token", token);
        login(token);
      }
    } catch (error) {
      if (error.response.status === 422) {
        setError({ message: error.response.data.message, type: "email" });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>Username</span>
          <Input
            type="text"
            value={name}
            width="100%"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          <span>Email</span>
          <Input
            type="text"
            value={email}
            width="100%"
            onChange={(event) => setEmail(event.target.value)}
          />

          {error.type === "email" && <p className="error">{error.message}</p>}
        </label>
        <label>
          <span>Password</span>
          <Input
            type="password"
            value={password}
            width="100%"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          <span>Confirm Password</span>
          <Input
            type="password"
            value={confirmPassword}
            width="100%"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {error.type === "password" && (
            <p className="error">{error.message}</p>
          )}
        </label>
        <Button
          type="submit"
          text={loading ? "loading..." : "Sign Up"}
          primary={!loading}
        />
        <div className="flex justify-center gap-2">
          <p>Already have an account?</p>
          <Link to="/login">
            <p className="">Login</p>
          </Link>
        </div>
      </form>
    </Container>
  );
}
export default connect(null, { signup })(Signup);
