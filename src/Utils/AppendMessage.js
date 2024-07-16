function AppendMessage(message, roomList) {
  if (message.destination_type === "user") {
    let record = [];
    let array = roomList.filter((room) => {
      if (room.friendship_id === message.destination_id) {
        record = { ...room, latest_message: message };
        return;
      } else return room;
    });
    if (record) return [record, ...array];
  } else {
    //type group
    let record = [];
    let array = roomList.filter((room) => {
      if (room.profile && room.profile.group_id === message.destination_id) {
        record = { ...room, latest_message: message };
        return;
      } else return room;
    });
    if (record) return [record, ...array];
  }
}

export default AppendMessage;
