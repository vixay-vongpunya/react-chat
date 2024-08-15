import ChatImage from "../../Common/ChatImage";
import { VscKebabVertical } from "react-icons/vsc";
import { styled } from "styled-components";
import CustomDropdown from "../../Custom/CustomDropdown";

const Container = styled.div`
  overflow-y: auto;
  padding: 5px;

  p {
    margin: 0px;
  }
`;
const MemberContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  height: 20%;
  cursor: pointer;
  padding: 5px 10px;
  margin-bottom: 2px;
  align-items: center;
  border-radius: 5px;
  gap: 8px;
  &:hover {
    background-color: var(--hover-color);
  }
`;
const Wrapper = styled.div`
  max-height: 290px;
`;

function GroupMember({ users, user, options, optionType, handleOption }) {
  //need to handle updating member role at roomsStore not selected room
  return (
    <Container className="no-scrollbar">
      <Wrapper>
        {users?.map((friend, index) => (
          <MemberContainer key={friend.id}>
            <ChatImage
              src={friend.profile?.profile_image}
              size="--small-image"
            />
            <div className="profile-box">
              <p>{friend.name}</p>
              <p>{friend.pivot?.role}</p>
            </div>
            <div className="flex-1 flex justify-end items-center">
              {friend.id !== user.id && (
                <CustomDropdown
                  item={friend}
                  options={options}
                  handleOption={handleOption}
                  optionType={optionType}
                  title={<VscKebabVertical />}
                />
              )}
            </div>
          </MemberContainer>
        ))}
      </Wrapper>
    </Container>
  );
}
export default GroupMember;
