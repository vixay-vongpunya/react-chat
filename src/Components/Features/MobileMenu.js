import { VscAccount } from "react-icons/vsc";
import { FaUserFriends } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { BsBoxArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { styled } from "styled-components";

import { connect } from "react-redux";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  border-right: solid 1px white;
  background-color: var(--background-color);
  padding: 10px;
  padding-top: 20%;
  ul {
    display: flex;
    flex-direction: row;
    gap: 5px;
    padding-top: 20px;
    padding-right: 5px;
  }
  .menu-header {
    padding-left: 10px;
  }
  .menu-header p {
    padding-bottom: 5px;
    border-bottom: solid 2px var(--border-color);
  }
  .menu {
    color: var(--text-color);
  }
`;
const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background-color: ${(props) =>
    props.$isActive ? "var(--hover-color)" : "none"};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--hover-color);
  }
  p {
    color: red;
  }
`;

function MobileMenu({ user }) {
  const [clickedItem, setClickedItem] = useState("");
  return (
    <Nav>
      <ul className="outer-list">
        <li>
          <Link to="/home">
            <StyledItem
              $isActive={clickedItem === "/home"}
              onClick={() => setClickedItem("/home")}
            >
              <span>
                <BsChatDots size={16} color="var(--text-color)" />
              </span>
              <p className="menu">Home</p>
            </StyledItem>
          </Link>
        </li>
        <li>
          <Link to="/friends">
            <StyledItem
              $isActive={clickedItem === "/friends"}
              onClick={() => setClickedItem("/friends")}
            >
              <span>
                <VscAccount size={16} color="var(--text-color)" />
              </span>
              <p className="menu">Friends</p>
            </StyledItem>
          </Link>
        </li>
        <li>
          <Link to="/create/group">
            <StyledItem
              $isActive={clickedItem === "/create/group"}
              onClick={() => setClickedItem("/create/group")}
            >
              <span>
                <FaUserFriends size={16} color="var(--text-color)" />
              </span>
              <p className="menu">Group</p>
            </StyledItem>
          </Link>
        </li>
        <li>
          <ul>
            <li className="menu-header">
              <p>Account</p>
            </li>

            <li>
              <Link to="/user/Profile">
                <StyledItem
                  $isActive={clickedItem === "/user/Profile"}
                  onClick={() => setClickedItem("/user/Profile")}
                >
                  <span>
                    <VscAccount size={16} color="var(--text-color)" />
                  </span>
                  <p className="menu">Profile</p>
                </StyledItem>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <StyledItem
            $isActive={clickedItem === "logOut"}
            onClick={() => setClickedItem("logOut")}
          >
            <span>
              <BsBoxArrowLeft size={16} color="red" />
            </span>
            <p>Log out</p>
          </StyledItem>
        </li>
      </ul>
    </Nav>
  );
}
function mapStatToProps(state) {
  return {
    user: state.userStore.data,
  };
}
export default connect(mapStatToProps, {})(MobileMenu);
