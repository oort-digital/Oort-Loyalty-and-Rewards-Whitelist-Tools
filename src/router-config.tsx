import FirstPage from "./pages/firstPage";
import Messages from "./pages/messagePage";
import Privacy from "./pages/privacy";
const routes = [
  {
    path: "/",
    pathName: "HomePage",
    component: FirstPage,
    exact: true,
    icon:"dashboard.svg"
},
{
    path: "/Messages",
    pathName: "Messages",
    component: Messages,
    icon:"message.svg"
},
{
    path: "/Events",
    pathName: "Events",
    component: FirstPage,
    icon:"events.svg"
},
{
    path: "/Rankings",
    pathName: "Rankings",
    component: FirstPage,
    icon:"transfer.svg"
},
{
    path: "/Privacy",
    pathName: "Privacy",
    component: Privacy,
    icon:"account.svg"
}
]
export default routes;