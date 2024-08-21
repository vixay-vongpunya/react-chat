import { Link, Outlet, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { useState, useRef, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  position: relative;
  grid-template-rows: 1fr 4fr;
  gap: 0.3rem;
  overflow: hidden;

  .slide-enter {
    transform: translateX(100%);
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 300ms ease-in-out;
    z-index: 1;
  }

  .slide-enter-active {
    transform: translateX(0);
  }

  .slide-exit {
    transform: translateX(-120%);
  }
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
  a {
    text-decoration: none;
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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  background-color: var(--background-color);
`;
function Friends({ user }) {
  const [showLink, setShowLink] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const createInvitationLink = (email) => {
    const baseUrl = `${process.env.REACT_APP_FRONTEND_API_URL}/friends/search`;
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
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={500} classNames="slide">
          <Wrapper>
            <Outlet />
          </Wrapper>
        </CSSTransition>
      </TransitionGroup>
    </Container>
  );
}
function mapStateToProps(state) {
  return { user: state.userStore.data };
}
export default connect(mapStateToProps, {})(Friends);
