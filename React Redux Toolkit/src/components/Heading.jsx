import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import { Link, useParams } from "react-router-dom";

export default function Heading({ heading }) {
  const params = useParams();
  const currentTab = params.page;
  return (
    <div className='border-1 p-2 my-2 mx-1 h-20 flex justify-between'>
      <Link to={`/home/${currentTab}/new`}>
        <button className='hover:cursor-pointer'>Add</button>
      </Link>
      <h2 className='text-2xl'>{heading}</h2>
      <Dropdown />
    </div>
  );
}
