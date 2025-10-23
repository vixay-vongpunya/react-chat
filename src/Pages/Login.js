import Input from "./../Components/Common/Input";
import { useState } from "react";
import { pendingLogin } from "../Actions/User-Action";
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
  width: 380px;
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

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email, password };
    try {
      setLoading(true);
      const token = await props.pendingLogin(data);
      if (token) {
        login(token);
      }
    } catch (error) {
      alert("Login failed: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <label>
          Email
          <Input
            type="text"
            value={email}
            width="100%"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <Input
            type="password"
            value={password}
            width="100%"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <Button
          type="submit"
          text={loading ? "Loading..." : "Login"}
          primary={!loading}
        />
        <div className="footer">
          <p>Don’t have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </Container>
  );
}

export default connect(null, { pendingLogin })(Login);
