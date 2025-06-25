import { Link, useParams } from "react-router-dom";

export default function Buttons({ id }) {
  //   const { data } = useFetchDataQuery();
  const currentTab = useParams().page;

  return (
    <div className='flex gap-5 p-1 m-1'>
      <Link to={`/home/${currentTab}/edit/${id}`}>
        <button className='hover:cursor-pointer hover:text-amber-200'>
          Edit
        </button>
      </Link>
      <button className='hover:cursor-pointer hover:text-red-300'>
        Delete
      </button>
    </div>
  );
}
