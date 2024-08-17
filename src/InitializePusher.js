import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Config from "./Config";
import { server } from "./Actions/Index";
//for pusher, user-user and user-group event is only broadcast toOthers since i can just update event at frontend on sender side
// only, messages,
function InitializePusher() {
  if (localStorage.getItem("chat_token")) {
    window.Pusher = Pusher;
    Pusher.logToConsole = true;
    window.Echo = new Echo({
      broadcaster: "pusher",
      authEndpoint:
        "https://chatapp-backend-ftdubcg7bafzfucf.japanwest-01.azurewebsites.net/api/broadcasting/auth",
      auth: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("chat_token"),
        },
      },

      key: Config.REACT_APP_PUSHER_APP_KEY,
      cluster: Config.REACT_APP_PUSHER_APP_CLUSTER,
      forceTLS: true,
      encrypted: true,
    });
  }
  // for broadcast toOthers() in laravel
  const socketId = window.Echo.socketId();
  server.defaults.headers.common["X-Socket-ID"] = socketId;
}
export default InitializePusher;
