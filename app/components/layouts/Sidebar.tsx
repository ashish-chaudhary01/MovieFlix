import { IoHome } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { FiTv } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
// import { FaUserCircle } from "react-icons/fa";
import { NavLink, Link } from "react-router";

const menuList = [
  {
    icon: <IoSearch />,
    label: "Search",
    link: "/search",
  },
  {
    icon: <IoHome />,
    label: "Home",
    link: "/",
  },
  {
    icon: <BiMoviePlay />,
    label: "Movies",
    link: "/movies",
  },
  {
    icon: <FiTv />,
    label: "TV Shows",
    link: "/tv",
  },
  {
    icon: <FaRegBookmark />,
    label: "Watchlist",
    link: "/watchlist",
  },
];

function Sidebar() {
  return (
    <>
      <aside className="group hidden md:flex fixed top-0 left-0 z-999 w-21 hover:w-60 bg-[#111111] h-screen duration-300 flex-col justify-evenly border-r border-white/10">
        {/* header */}
        <div className="p-4">
          <Link to="/" className="flex items-center mt-4 gap-2">
            <button className="flex items-center justify-center p-4 rounded-2xl cursor-pointer bg-red-600 text-white drop-shadow-2xl">
              <FaPlay size={15} />
            </button>
            <h2 className="opacity-0 text-2xl font-bold leading-tight tracking-tight drop-shadow-md group-hover:opacity-100 duration-200 pointer-events-none">
              Movie<span className="text-red-500">Flix</span>
            </h2>
          </Link>
        </div>
        {/* menu  */}
        <nav className="flex flex-col gap-4 px-3 items-center justify-center pb-25">
          {menuList.map((item) => (
            // adding NavLink component for active link
            <NavLink key={item.label} to={item.link} className={`w-full`}>
              {({ isActive }) => (
                <button
                  title={item.label}
                  className={`flex gap-2 px-2.5 py-3 items-center w-full font-semibold tracking-wide rounded-2xl text-[14px] outline-none border ${isActive ? "bg-white text-black border-white shadow-lg" : "border-white/10 text-gray-400 whitespace-nowrap hover:text-white hover:bg-white/5 duration-200"}`}
                >
                  <span className="text-xl p-2">{item.icon}</span>
                  <span className="opacity-0 group-hover:opacity-100 duration-300 whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                </button>
              )}
            </NavLink>
          ))}
        </nav>
        {/* user details */}
        {/* <div className="flex gap-3 px-2 py-6 border-t border-white/10 whitespace-nowrap">
          <button className="flex items-center py-2.5 px-2 rounded-lg text-gray-300 hover:text-white text-3xl outline-none shrink-0">
            <FaUserCircle />
          </button>
          <div className="opacity-0 flex flex-col group-hover:opacity-100 duration-300 pointer-events-none whitespace-nowrap">
            <h2 className="text-xl text-gray-200">John Doe</h2>
            <p className="text-gray-300 text-sm">johndoe@example.com</p>
          </div>
        </div> */}
      </aside>

      {/* mobile nav */}

      <div className="md:hidden flex items-center z-999 justify-around fixed bottom-0 left-0 right-0 w-full bg-[#111111] border-t border-white/10 pt-2 px-2 pb-1">
        {menuList.map((item) => (
          <NavLink key={item.label} to={item.link}>
            {({ isActive }) => (
              <button
                className={`flex flex-col gap-1 px-3 py-1.5 items-center font-semibold tracking-wide rounded-xl text-[30px] outline-none ${isActive ? "text-red-400 shadow-lg" : "text-gray-400 whitespace-nowrap hover:text-white duration-200"}`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            )}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
