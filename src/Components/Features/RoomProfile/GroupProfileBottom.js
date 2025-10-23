import Accordion from "react-bootstrap/Accordion";
import { connect } from "react-redux";
import { server } from "../../../Actions/Index";
import SharedFile from "../SharedFile";
import { fetchGroupDetail } from "../../../Actions/Group-Action";
import { useState, useEffect } from "react";
import GroupMember from "./GroupMember";
import RoomProfilePlaceholder from "../../Custom/RoomProfilePlaceholder";
import GroupDetail from "./GroupDetail";
import { styled } from "styled-components";
import FriendProfileModal from "../../../Pages/FriendProfileModal";

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;
const DetailWrapper = styled.div``;

const Title = styled.div`
  display: flex;
  align-content: center;
  p {
    margin: 0px;
  }
`;
const CustomAccordion = styled(Accordion)`
  margin: 0px;
  .accordion-button {
    padding: 4px 8px;
    background-color: transparent;
    box-shadow: none;
    margin: 8px 0px;
  }

  .acordion-header {
    padding: 0px;
    margin: 0px;
  }
  .accordion-item {
    border: none;
    background-color: transparent;
  }
  .accordion-body {
    padding: 0px;
  }
`;
const hasAuthMember = [
  { text: "add to admin", value: 1 },
  { text: "remove from admin", value: 2 },
  { text: "view profile", value: 3 },
  { text: "remove", value: 4 },
];

const noAuthMember = [{ text: "view profile", value: 3 }];

const friendOptions = [
  { text: "add to group", value: 1 },
  { text: "view profile", value: 2 },
];

const filterFriends = (users, friends) => {
  return friends.filter(
    (friend) => !users?.some((user) => user.id === friend.id)
  );
};

function GroupProfileBottom({ user, room, friends, fetchGroupDetail }) {
  const [loading, setLoading] = useState(false);
  const [roomDetail, setRoomDetail] = useState({});
  const [friendList, setFriendList] = useState([]);
  const [profileOpened, setProfileOpened] = useState(false);
  const [openedProfile, setOpenedProfile] = useState([]);

  let memberOptions = "";

  useEffect(() => {
    if (!room.users && room.pivot) {
      setLoading(true);
      fetchGroupDetail(room.id);
    } else {
      setLoading(false);
      setRoomDetail(room);
      setFriendList(filterFriends(room.users, friends));
    }
  }, [fetchGroupDetail, friends, room]);

  const handleOption = (value, friend, optionType) => {
    if (optionType === "friendOptions") {
      if (value === 1) {
        server
          .post(`./group/${roomDetail.id}/member/add/${friend.id}`)
          .then(() => {
            let newMember = {
              ...friend,
              pivot: { ...friend.pivot, role: "member" },
            };
            setRoomDetail((prevDetail) => ({
              ...prevDetail,
              users: [...prevDetail.users, newMember],
            }));
            setFriendList((prev) =>
              prev.filter((user) => user.id !== friend.id)
            );
          });
      } else if (value === 2) {
        server.get(`./user/${friend.id}`).then((response) => {
          setOpenedProfile(response.data.data);
          setProfileOpened(true);
        });
      }
    } else {
      const data = { friend_id: friend.id };
      if (value === 1) {
        server.put(`./group/member/admin/${roomDetail.id}`, data).then(() => {
          setRoomDetail((prev) => ({
            ...prev,
            users: prev.users.map((user) =>
              user.id === friend.id
                ? { ...user, pivot: { ...user.pivot, role: "admin" } }
                : user
            ),
          }));
        });
      } else if (value === 2) {
        server.put(`./group/admin/member/${roomDetail.id}`, data).then(() => {
          setRoomDetail((prev) => ({
            ...prev,
            users: prev.users.map((user) =>
              user.id === friend.id
                ? { ...user, pivot: { ...user.pivot, role: "member" } }
                : user
            ),
          }));
        });
      } else if (value === 3) {
        server.get(`./user/${friend.id}`).then((response) => {
          setOpenedProfile(response.data.data);
          setProfileOpened(true);
        });
      } else if (value === 4) {
        server
          .delete(`./group/${roomDetail.id}/member/delete/${friend.id}`)
          .then(() => {
            setRoomDetail((prev) => ({
              ...prev,
              users: prev.users.filter((user) => user.id !== friend.id),
            }));
            setFriendList((prev) => [...prev, friend]);
          });
      }
    }
  };

  const userAuth = roomDetail.users?.find((member) => member.id === user.id);
  if (userAuth?.pivot.role === "creator" || userAuth?.pivot.role === "admin") {
    memberOptions = hasAuthMember;
  } else {
    memberOptions = noAuthMember;
  }

  return (
    <Container className="no-scrollbar">
      <DetailWrapper>
        {loading ? (
          <RoomProfilePlaceholder />
        ) : (
          <CustomAccordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Title>
                  <p>Group Detail</p>
                </Title>
              </Accordion.Header>
              <Accordion.Body>
                <GroupDetail room={roomDetail} />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <Title>
                  <p>Members</p>
                </Title>
              </Accordion.Header>
              <Accordion.Body>
                <GroupMember
                  users={roomDetail.users}
                  options={memberOptions}
                  optionType="memberOptions"
                  user={user}
                  handleOption={handleOption}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <Title>
                  <p>Add Friends</p>
                </Title>
              </Accordion.Header>
              <Accordion.Body>
                <GroupMember
                  users={friendList}
                  options={friendOptions}
                  optionType="friendOptions"
                  user={user}
                  handleOption={handleOption}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>
                <Title>
                  <p>Files</p>
                </Title>
              </Accordion.Header>
              <Accordion.Body>
                <SharedFile room={room} height="290" />
              </Accordion.Body>
            </Accordion.Item>
          </CustomAccordion>
        )}
      </DetailWrapper>
      {profileOpened && (
        <FriendProfileModal
          profile={openedProfile}
          setProfileOpened={setProfileOpened}
        />
      )}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userStore.data,
    friends: state.friendStore.data,
  };
}

export default connect(mapStateToProps, { fetchGroupDetail })(
  GroupProfileBottom
);
