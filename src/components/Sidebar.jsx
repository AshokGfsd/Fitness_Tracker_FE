import { NavLink } from "react-router-dom";
import {
  RxDashboard,
  RxAvatar,
  RxTarget,
  RxOpacity,
  RxLightningBolt,
  RxCopy,
} from "react-icons/rx";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="navbar">
      <div>
        <NavLink className="links" to="/">
          <RxDashboard className="link__icons" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink className="links" to="/exercises">
          <RxLightningBolt className="link__icons" />
          <span>Exercises</span>
        </NavLink>
        <NavLink className="links" to="/foods">
          <RxOpacity className="link__icons" />
          <span>Foods</span>
        </NavLink>
        <NavLink className="links" to="/goals">
          <RxTarget className="link__icons" />
          <span>Goals</span>
        </NavLink>
        <NavLink className="links" to="/suggestion">
          <RxCopy className="link__icons" />
          <span>Suggestion</span>
        </NavLink>
        <NavLink className="links" to="/user">
          <RxAvatar className="link__icons" />
          <span>User</span>
        </NavLink>
      </div>
      {/* <div class="navigation">
      <ul>
        <li class="list active">
          <a href="#">
            <span class="icon">A</span>
            <span class="text">Home</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">A</span>
            <span class="text">Profile</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">A</span>
            <span class="text">Mesaage</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">A</span>
            <span class="text">Profile</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">A</span>
            <span class="text">Mesaage</span>
          </a>
        </li>
        <div class="indicator"></div>
      </ul>
    </div> */}
    </nav>
  );
};
export default Sidebar;
