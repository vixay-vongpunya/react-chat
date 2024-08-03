import { Accordion, ModalActions, ModalContent } from "semantic-ui-react";
import { connect } from "react-redux";

import { server } from "../../../Actions/Index";
import { fetchGroupDetail } from "../../../Actions/Group-Action";
import { useState, useEffect } from "react";
import GroupMember from "./GroupMember";
import RoomProfilePlaceholder from "../../Custom/RoomProfilePlaceholder";
import GroupDetail from "./GroupDetail";
import { styled } from "styled-components";
import { FaUserFriends } from "react-icons/fa";
import FriendProfileModal from "../../../Pages/FriendProfileModal";
const DetailWrapper = styled.div`
  pading: 10px;
  .accordion {
    padding: 10px;
  }
`;
const Title = styled.div`
  display: flex;
  aign-items: center;
  p {
    margin-left: 10px;
  }
`;
const hasAuthMember = [
  { key: 1, text: "add to addmin", value: 1 },
  { key: 2, text: "remove from addmin", value: 2 },
  { key: 3, text: "view profile", value: 3 },
  { key: 4, text: "delete", value: 4 },
];
const noAuthMember = [{ key: 3, text: "view profile", value: 3 }];
const friendOptions = [
  { key: 1, text: "add to group", value: 1 },
  { key: 2, text: "view profile", value: 2 },
];

const filterFriends = (users, friends) => {
  console.log("users", users);
  return friends.filter(
    (friend) => !users?.some((user) => user.id == friend.id)
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
    console.log("2", room);
    if (!room.users && room.pivot) {
      console.log("is trigeered");
      setLoading(true);
      fetchGroupDetail(room.id);
    } else {
      setLoading(false);
      setRoomDetail(room);
      console.log("friends", room);
      setFriendList(filterFriends(room.users, friends));
    }
  }, [room]);

  const handleOption = (value, friend, optionType) => {
    console.log(optionType);
    if (optionType === "friendOptions") {
      //better with switch
      if (value === 1) {
        console.log("here t");
        server
          .post(`./group/${roomDetail.id}/member/add/${friend.id}`)
          .then((response) => {
            let newMember = {
              ...friend,
              pivot: { ...friend.pivot, role: "member" },
            };
            setRoomDetail((prevDetail) => ({
              ...prevDetail,
              users: [...prevDetail.users, newMember],
            }));
            setFriendList((prev) =>
              prev.filter((user) => user.id != friend.id)
            );
          });
      } else if (value === 2) {
        server.get(`./user/${friend.id}`).then((response) => {
          console.log("the res", response);
          setOpenedProfile(response.data.data);
          setProfileOpened(true);
          console.log(openedProfile);
        });
      }
    } else {
      const data = { friend_id: friend.id };
      if (value === 1) {
        console.log("addtoadmin");
        server
          .put(`./group/member/admin/${roomDetail.id}`, data)
          .then((response) => {
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
        console.log("admintomember");
        server
          .put(`./group/admin/member/${roomDetail.id}`, data)
          .then((response) => {
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
          console.log("the res", response);
          setOpenedProfile(response.data.data);
          setProfileOpened(true);
          console.log(openedProfile);
        });
        // handleProfileOpened,/>
      } else if (value === 4) {
        {
          console.log(friend.id);
          server
            .delete(`./group/${roomDetail.id}}/member/delete/${friend.id}`)
            .then((response) => {
              setRoomDetail((prev) => ({
                ...prev,
                users: prev.users.filter((user) => user.id !== friend.id),
              }));
              const data = friend;
              delete data.pivot;
              setFriendList((prev) => [...prev, friend]);
            });
        }
      }
    }
  };

  const userAuth = roomDetail.users?.find((member) => member.id === user.id);
  if (userAuth?.pivot.role === "creator" || userAuth?.pivot.role === "admin") {
    memberOptions = hasAuthMember;
  } else {
    memberOptions = noAuthMember;
  }

  const groupInfo = [
    {
      key: "detail",
      title: {
        children: (
          <Title>
            <FaUserFriends /> <p>group detail</p>
          </Title>
        ),
      },
      content: {
        content: <GroupDetail room={roomDetail} />,
      },
    },
    {
      key: "members",
      title: {
        children: (
          <Title>
            <FaUserFriends /> <p>members</p>
          </Title>
        ),
      },
      content: {
        content: (
          <GroupMember
            users={roomDetail.users}
            options={memberOptions}
            optionType="memberOptions"
            user={user}
            handleOption={handleOption}
          />
        ),
      },
    },
    {
      key: "add-friend",
      title: {
        children: (
          <Title>
            <FaUserFriends /> <p>add friends</p>
          </Title>
        ),
      },
      content: {
        content: (
          <GroupMember
            users={friendList}
            options={friendOptions}
            optionType="friendOptions"
            user={user}
            handleOption={handleOption}
          />
        ),
      },
    },
  ];

  return (
    <div className="h-full w-full overflow-auto no-scrollbar">
      <ul>
        <li>
          <DetailWrapper>
            {loading ? (
              <RoomProfilePlaceholder />
            ) : (
              <Accordion
                fluid
                defaultActiveIndex={0}
                panels={groupInfo}
                style={{ outline: "none", border: "none" }}
                className="accordion"
              />
            )}
          </DetailWrapper>
        </li>
      </ul>
      {profileOpened && (
        <FriendProfileModal
          profile={openedProfile}
          setProfileOpened={setProfileOpened}
        />
      )}
    </div>
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
