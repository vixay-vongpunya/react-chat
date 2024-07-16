import { Dropdown } from "semantic-ui-react";
import ChatImage from "../../Common/ChatImage";
import { VscKebabVertical } from "react-icons/vsc";
import { useRef, useEffect, useState } from "react";
import { styled } from "styled-components";
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
  &:hover {
    background-color: var(--hover-color);
  }
`;
const Wrapper = styled.div`
  max-height: 300px;
  width: 100%;
`;
const Container = styled.div`
  overflow-y: auto;
`;
function GroupMember({ users, user, options, optionType, handleOption }) {
  return (
    <Container className="no-scrollbar">
      <Wrapper>
        {users?.map((friend, index) => (
          <MemberContainer key={friend.id}>
            <ChatImage
              src={friend.profile?.profile_image}
              size="--small-image"
            />
            <div>
              <p>{friend.name}</p>
              <p>{friend.pivot?.role}</p>
            </div>
            <div className="flex-1 flex justify-end items-center">
              {friend.id !== user.id && (
                //fix later dropdown hidden

                <Dropdown
                  icon={null}
                  pointing="right"
                  trigger={<VscKebabVertical className="cursor-pointer" />}
                >
                  <Dropdown.Menu style={{ margin: 0, padding: 0 }}>
                    {options.map((option) => (
                      <Dropdown.Item
                        key={option.key}
                        text={option.text}
                        onClick={() =>
                          handleOption(option.value, friend, optionType)
                        }
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </MemberContainer>
        ))}
      </Wrapper>
    </Container>
  );
}
export default GroupMember;
