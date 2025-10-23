import Input from "./../Components/Common/Input";
import { useState } from "react";
import { signup } from "../Actions/User-Action";
import { useAuth } from "./../Utils/useAuth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Components/Common/Button";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ece9e6, #ffffff);
  background-image: url('/default.jpg');
`;

const Card = styled.form`
  background-color: #fff;
  width: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
  }

  h2 {
    text-align: center;
    font-size: 1.6rem;
    color: #333;
    margin-bottom: 10px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.9rem;
    color: #555;
  }

  .error {
    color: red;
    font-size: 0.85rem;
    margin-top: 4px;
  }

  .footer {
    display: flex;
    justify-content: center;
    gap: 6px;
    font-size: 0.9rem;
  }

  a {
    color: #0078ff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  a:hover {
    color: #0056cc;
    text-decoration: underline;
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
    event.preventDefault();

    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match", type: "password" });
      return;
    }

    const data = { name, email, password };

    try {
      setLoading(true);
      const token = await props.signup(data);
      if (token) {
        login(token);
      }
    } catch (err) {
      if (err.response?.status === 422) {
        setError({ message: err.response.data.message, type: "email" });
      } else {
        setError({ message: "An unexpected error occurred", type: "general" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <label>
          Username
          <Input
            type="text"
            value={name}
            width="100%"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email
          <Input
            type="text"
            value={email}
            width="100%"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.type === "email" && <p className="error">{error.message}</p>}
        </label>

        <label>
          Password
          <Input
            type="password"
            value={password}
            width="100%"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Confirm Password
          <Input
            type="password"
            value={confirmPassword}
            width="100%"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error.type === "password" && (
            <p className="error">{error.message}</p>
          )}
        </label>

        {error.type === "general" && <p className="error">{error.message}</p>}

        <Button
          type="submit"
          text={loading ? "Loading..." : "Sign Up"}
          primary={!loading}
        />

        <div className="footer">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </Card>
    </Container>
  );
}

export default connect(null, { signup })(Signup);
