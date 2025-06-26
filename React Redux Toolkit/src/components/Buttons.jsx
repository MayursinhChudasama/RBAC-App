import { Link, useParams } from "react-router-dom";
import { useFetchDataQuery, usePostDataMutation } from "../store/dataApiSlice";

export default function Buttons({ id }) {
  const [postData, { isLoading, isSuccess, error }] = usePostDataMutation();
  const { data } = useFetchDataQuery();

  const currentTab = useParams().page;
  const currentTabLower = currentTab.toLowerCase();
  async function handleDelete() {
    console.log("clicked on Delete");
    const updatedCurrentTab = data[currentTabLower].filter(
      (tab) => tab.id !== id
    );
    const updatedData = {
      ...data,
      [currentTabLower]: updatedCurrentTab,
    };
    console.log("updatedData", updatedData);
    const confirm = window.confirm("Are you sure you want to delete?");
    try {
      if (confirm) {
        await postData(updatedData).unwrap();
      }
    } catch (err) {
      console.log("Failed to create user:", err);
    }
  }

  return (
    <div className='flex gap-5 p-1 m-1'>
      <Link to={`/home/${currentTab}/edit/${id}`}>
        <button className='hover:cursor-pointer hover:text-amber-200'>
          Edit
        </button>
      </Link>
      <button
        className='hover:cursor-pointer hover:text-red-300'
        onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
