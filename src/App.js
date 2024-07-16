import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Friends from "./Pages/Friends";
import CreateGroup from "./Pages/CreateGroup";
import UserProfile from "./Pages/UserProfile";
import Layout from "./Pages/Layout";
import AddFriend from "./Components/Features/AddFriends/AddFriend";
import FriendRequest from "./Components/Features/AddFriends/FriendRequest";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="friends" element={<Friends />}>
            <Route index element={<FriendRequest />} />
            <Route path="search" element={<AddFriend />} />
          </Route>
          <Route path="/create/group" element={<CreateGroup />}></Route>
          <Route path="/user/profile" element={<UserProfile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
