import { Link, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import { Dropdown } from "semantic-ui-react";
import { GoPaperclip } from "react-icons/go";
import { useState, useRef, useEffect } from "react";
const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 5fr;
  padding: 0px 5px;
  gap: 10px;
`;

const AddFriendContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  padding: 10px;
`;
const MenuContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  .link-container {
    display: ${(props) => (props.$showLink ? "flex" : "none")};
    z-index: 10;
    position: fixed;
    margin-top: 110px;
    margin-left: 50px;
  }
  .link-wrapper {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 5px;
    gap: 10px;
    border-radius: var(--small-border-radius);
    .icon {
      cursor: pointer;
    }
  }
  .link-wrapper span {
    border: solid var(--background-color) 2px;
    padding: 5px;
  }
`;

const MenuCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 10px;
  color: var(--text-color);
`;
function Friends({ user }) {
  const [showLink, setShowLink] = useState(false);
  const dropdownRef = useRef(null);
  const createInvitationLink = (email) => {
    const baseUrl = "localhost:3000/friends/search";
    return `${baseUrl}?email=${encodeURIComponent(email)}`;
  };

  const invitationLink = createInvitationLink(user.email);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowLink(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Container>
      <AddFriendContainer>
        <h4>Add Friends</h4>
        <MenuContainer $showLink={showLink}>
          <MenuCard onClick={() => setShowLink((prev) => !prev)}>
            <BsLink45Deg size={34} />
            <p>Link</p>
          </MenuCard>
          <div className="link-container" ref={dropdownRef}>
            <div className="link-wrapper">
              <span>{invitationLink}</span>
              <GoPaperclip
                className="icon"
                size={22}
                onClick={() => navigator.clipboard.writeText(invitationLink)}
              />
            </div>
          </div>
          <Link to="search">
            <MenuCard>
              <BsSearch size={34} />
              <p>search</p>
            </MenuCard>
          </Link>
        </MenuContainer>
      </AddFriendContainer>
      <Outlet />
    </Container>
  );
}
function mapStateToProps(state) {
  return { user: state.userStore.data };
}
export default connect(mapStateToProps, {})(Friends);
