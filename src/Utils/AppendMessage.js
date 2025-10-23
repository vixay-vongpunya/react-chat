function AppendMessage(message, roomList) {
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
   
    let messages = [message];
    if (Array.isArray(updatedRooms[index].messages)) {
        messages = [message, ...updatedRooms[index].messages];
    }

    const updatedRoom = {
      ...updatedRooms[index],
      messages: messages,
      latest_message: msg,
    };
    updatedRooms.splice(index, 1);
    updatedRooms.unshift(updatedRoom);
  }

   
  return updatedRooms;
}

export default AppendMessage;
