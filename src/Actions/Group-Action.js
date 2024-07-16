import { server } from "./Index";

export function fetchGroups() {
  return (dispatch) => {
    server.get("./groups/").then((response) => {
      console.log("groups", response.data.data);
      dispatch({ type: "FETCH_GROUPS", payload: response.data.data });
    });
  };
}
export function leaveGroup(group) {
  console.log("before", group);
  return (dispatch) => {
    server.delete(`./group/leave/${group.id}`).then((response) => {
      console.log("group", response);
      dispatch({ type: "LEAVE_GROUP", payload: group });
    });
  };
}
export function addMember(groupId, friend) {
  return (dispatch) => {
    server
      .post(`./group/${groupId}/member/add/${friend.id}`)
      .then((response) => {
        console.log("member added", response.data.data);
        dispatch({ type: "ADD_MEMBER", payload: friend });
      });
  };
}
export function addToAdmin(groupId, data) {
  return (dispatch) => {
    server.put(`./group/member/admin/${groupId}`, data).then((response) => {
      console.log("member to admin", response);
      dispatch({
        type: "MEMBER_TO_ADMIN",
        payload: { group_id: groupId, friend_id: data.friend_id },
      });
    });
  };
}
export function removeFromAdmin(groupId, data) {
  return (dispatch) => {
    server.put(`./group/admin/member/${groupId}`, data).then((response) => {
      console.log("admin to member", response.data.data);
      dispatch({ type: "REMOVE_FROM_ADMIN", payload: response.data.data });
    });
  };
}
