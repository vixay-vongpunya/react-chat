import { useCallback, useState, useEffect } from "react";
import { styled } from "styled-components";
import { server } from "../../../Actions/Index";
import FriendCard from "./FriendCard";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchBar from "../../Custom/SearchBar";
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  h4{
    padding-left:1rem;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1rem;
  .friend-card-container {
    height: 90%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 576px) {
    border-radius: 0;
  }
  
`;
function AddFriend({ friends }) {
  const [email, setEmail] = useState("");
  const [friend, setFriend] = useState(null);
  const location = useLocation();

  const searchFriend = useCallback(
    (email) => {
      const found = friends.find((data) => data?.email === email);
      if (!found) {
   
        server
          .post("/friends/search", { email: email })
          .then((response) => {
   
            setFriend(response.data.data);
          })
          .catch((error) => {
            if (error.response && error.status === 404) {
              alert("User not found");
            }
          });
      } else {
   
        setFriend(found);
      }
      setEmail(email);
    },
    [friends]
  );
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("email");
    if (query) {
   
      searchFriend(query);
    }
  }, [location.search, searchFriend]);

  const findFriend = (event) => {
    if (email.trim() !== "" && event.key === "Enter") {
      searchFriend(email);
      // navigate(`/friends/search?email=${email}`);
    }
  };
  return (
    <Container>
      <h4>Search friends</h4>
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
