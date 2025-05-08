import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaSquarePlus, FaListAlt } from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

const Sidebar = ({ setToken }) => (
  <aside className="sm:w-1/5 min-h-screen bg-white p-4 flex flex-col items-center sm:items-start">
    <Link to="/" className="text-2xl font-bold mb-10">
      Brio<span className="text-secondary">Admin</span>
    </Link>
    <nav className="flex flex-col gap-6 w-full">
      <NavItem to="/" icon={<FaSquarePlus />} label="Add Item" />
      <NavItem to="/list" icon={<FaListAlt />} label="List" />
      <NavItem to="/orders" icon={<MdFactCheck />} label="Orders" />
      <button
        onClick={() => setToken("")}
        className="text-red-500 flex items-center gap-2 mt-auto"
      >
        <BiLogOut /> <span className="hidden lg:inline">Logout</span>
      </button>
    </nav>
  </aside>
);

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "active-link"
        : "flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded"
    }
  >
    {icon} <span className="hidden lg:inline">{label}</span>
  </NavLink>
);

export default Sidebar;
