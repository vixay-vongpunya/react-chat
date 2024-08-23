function AppendMessage(message, roomList) {
  console.log("is called");
  const msg = { ...message, format_date: "Now" };
  let updatedRooms = [...roomList];
  const index = updatedRooms.findIndex((room) => {
    if (room.friendship) {
      if (msg.destination_type === "user") {
        return room.friendship.id === msg.destination_id;
      }
      return false;
    } else {
      if (msg.destination_type === "group") {
        return room.id === msg.destination_id;
      }
      return false;
    }
  });

  if (index !== -1) {
    const updatedRoom = { ...updatedRooms[index], latest_message: msg };
    updatedRooms.splice(index, 1);
    updatedRooms.unshift(updatedRoom);
  }

  console.log("before returnning", updatedRooms);
  return updatedRooms;
}

export default AppendMessage;
