function AppendMessage(message, roomList) {
  const msg = { ...message, format_date: "Now" };
  let updatedRooms = [...roomList];

  const index = updatedRooms.findIndex((room) => {
    if (msg.destination_type === "user") {
      return room.friendship_id === msg.destination_id;
    } else {
      return room.id === msg.destination_id && !room.email;
    }
  });

  if (index !== -1) {
    const updatedRoom = { ...updatedRooms[index], latest_message: msg };
    updatedRooms.splice(index, 1);
    updatedRooms.unshift(updatedRoom);
  }

  return updatedRooms;
}

export default AppendMessage;
