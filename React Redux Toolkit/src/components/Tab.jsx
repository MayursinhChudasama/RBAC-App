import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../store/uiSlice";
import { Link } from "react-router-dom";
export default function Tab({ icon, name }) {
  const { isNavOpen, currentTab } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  const { setCurrentTab } = uiSlice.actions;

  return (
    <Link
      to={name}
      className='flex items-center space-x-3 hover:bg-yellow-300 hover:text-black px-3 py-2 rounded-md transition'>
      <span className='text-lg'>{icon}</span>
      <span className='text-lg font-medium'>{isNavOpen ? name : ""}</span>
    </Link>
  );
}
