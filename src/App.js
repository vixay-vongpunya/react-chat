import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AuthProvider, useAuth } from "./Utils/useAuth";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Friends from "./Pages/Friends";
import CreateGroup from "./Pages/CreateGroup";
import UserProfile from "./Pages/UserProfile";
import Layout from "./Pages/Layout";
import AddFriend from "./Components/Features/AddFriends/AddFriend";
import FriendRequest from "./Components/Features/AddFriends/FriendRequest";
import Loading from "./Pages/Loading";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" /> : element;
};

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();
  console.log("auth", isAuthenticated);
  if (loading) {
    return;
  }
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/signup"
          element={<GuestRoute element={<Signup />} />}
        ></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/pending/authentification" element={<Loading />} />
        <Route element={<ProtectedRoute element={<Layout />} />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="friends" element={<Friends />}>
            <Route index element={<FriendRequest />} />
            <Route path="search" element={<AddFriend />} />
          </Route>
          <Route path="/create/group" element={<CreateGroup />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
