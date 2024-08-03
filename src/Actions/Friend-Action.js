import { server } from "./Index";

export function fetchFriends() {
  //duplicate action in case needed not being used at the moment
  return async (dispatch) => {
    const response = await server.get("./friends");
    const friends = response.data.data.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    console.log("f", response);
    dispatch({ type: "FETCH_FRIEND", payload: friends });
  };
}
export function sendFriendRequest() {
  return (dispatch) => {
    server.post("./friendship/request").then((response) => {
      console.log(response);
      dispatch({ type: "SENDING_FRIENDSHIP", payload: response.data.data });
    });
  };
}
export function unFriend(friend) {
  return (dispatch) => {
    server
      .delete(`./friendship/delete/${friend.friendship_id}`)
      .then((response) => {
        console.log(response);
        dispatch({ type: "DELETE_FRIENDSHIP", payload: friend });
      });
  };
}

export function fetchPendingFriendship() {
  return (dispatch) => {
    server.get("./friendship/pending").then((response) => {
      const friends = response.data.data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      dispatch({ type: "FETCH_PENDING_FRIENDSHIP", payload: friends });
    });
  };
}

export function acceptFriendship(friend) {
  return (dispatch) => {
    server
      .post(`./friendship/accept/${friend.friendship_id}`)
      .then((response) => {
        console.log("accept", response);
        dispatch({ type: "ACCEPT_FRIENDSHIP", payload: friend });
      });
  };
}
export function declineFriendship(friend) {
  return (dispatch) => {
    server
      .post(`./friendship/decline/${friend.friendship_id}`)
      .then((response) => {
        console.log("decline", response);
        dispatch({ type: "DECLINE_FRIENDSHIP", payload: friend });
      });
  };
}
