import { VscAccount } from "react-icons/vsc";
import { FaUserFriends } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { BsBoxArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { connect } from "react-redux";
import { useAuth } from "./../../Utils/useAuth";
import { clearState } from "../../Actions/User-Action";
import { useState } from "react";
import { VscChevronLeft } from "react-icons/vsc";

const Container = styled.div`
  background-color: white;
  height: 100vh;
  padding:1rem 1rem 0 0;
  .arrow-icon-box{
    width: 100%;
    display: none;
  }

  .arrow-icon{
    cursor: pointer;
    right:0;
    top:1rem;
    margin-left:auto;
    rotate:180deg;
  }
  @media (max-width: 576px) {
   .arrow-icon-box{
    display: block;
    }
  }
`;
const Nav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  // border-right: solid 1px white;
  
  padding: 10px;
  padding-top: 20%;
  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0px;
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
    margin: 0px;
    font-size: 15px;
    font-weight: 400;
  }
  a {
    text-decoration: none;
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
    margin: 0px;
  }
`;

function SideBar({ user, clearState, setShowHam, showHam }) {
    const [clickedItem, setClickedItem] = useState("/home");
  const { logout } = useAuth();

  const handleClick = ({item}) => {
    setClickedItem(item);
    if(showHam) setShowHam(false)
  }
  return (
    <Container>
      <div className="arrow-icon-box">
        <VscChevronLeft
          className="arrow-icon"
          size={32}
        onClick={() => setShowHam(!showHam)}
      />
      </div>
      <Nav>
      <ul className="outer-list">
        <li>
          <Link to="/home">
            <StyledItem
              $isActive={clickedItem === "/home"}
              onClick={() => handleClick("/home")}
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
              onClick={() => handleClick("/friends")}
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
              onClick={() => handleClick("/create/group")}
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
                  onClick={() => handleClick("/user/Profile")}
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
            onClick={() => {
              logout();
              clearState();
            }}
          >
            <span>
              <BsBoxArrowLeft size={16} color="red" />
            </span>
            <p>Log out</p>
          </StyledItem>
        </li>
      </ul>
    </Nav>
    </Container>
    
  );
}
function mapStatToProps(state) {
  return {
    user: state.userStore.data,
  };
}
export default connect(mapStatToProps, { clearState })(SideBar);
