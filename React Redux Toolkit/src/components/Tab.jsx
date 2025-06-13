import { useSelector } from "react-redux";
export default function Tab({ icon, name }) {
  const isNavOpen = useSelector((store) => store.ui.isNavOpen);
  return (
    <a
      href='#'
      className='flex items-center space-x-3 hover:bg-yellow-300 hover:text-black px-3 py-2 rounded-md transition'>
      <span className='text-lg'>{icon}</span>
      <span className='text-lg font-medium'>{isNavOpen ? name : ""}</span>
    </a>
  );
}
