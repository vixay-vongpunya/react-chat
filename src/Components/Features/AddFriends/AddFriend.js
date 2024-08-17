import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { styled } from "styled-components";
import { server } from "../../../Actions/Index";
import FriendCard from "./FriendCard";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../Custom/SearchBar";
const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  position: relative;
  padding: 8px 10px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  .friend-card-container {
    height: 90%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
function AddFriend({ friends }) {
  const [email, setEmail] = useState("");
  const [friend, setFriend] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("email");
    if (query) {
      console.log("new send");
      searchFriend(query);
    }
  }, [location.search]);
  const searchFriend = (email) => {
    const found = friends.find((data) => data?.email === email);
    if (!found) {
      console.log("d");
      server
        .post("/friends/search", { email: email })
        .then((response) => {
          console.log(response.data.data);
          setFriend(response.data.data);
        })
        .catch((error) => {
          if (error.response && error.status === 404) {
            alert("user not found");
          }
        });
    } else {
      console.log("found", found);
      setFriend(found);
    }
    setEmail(email);
  };
  const findFriend = (event) => {
    if (email.trim() !== "" && event.key === "Enter") {
      searchFriend(email);
      // navigate(`/friends/search?email=${email}`);
    }
  };
  return (
    <Container>
      <h3>Search Friends</h3>
      <Wrapper>
        <SearchBar
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="search..."
          onKeyDown={findFriend}
        />
        <div className="friend-card-container">
          {friend && <FriendCard friend={friend} setFriend={setFriend} />}
        </div>
      </Wrapper>
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    friends: state.friendStore.data,
  };
}
export default connect(mapStateToProps, {})(AddFriend);
