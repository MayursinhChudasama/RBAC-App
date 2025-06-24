import { useSelector } from "react-redux";
import { useFetchDataQuery } from "../store/dataApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EntryForm({ entry }) {
  entry = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    password: "alice@123",
    role: 1,
    todos: [1, 3, 5],
  };
  const { data } = useFetchDataQuery();
  console.log(data);

  const params = useParams();
  const currentTab = params.page.toLowerCase();
  const navigate = useNavigate();

  const keys = Object.keys(data[currentTab][0]);
  return (
    <form className='flex flex-col justify-center'>
      {keys &&
        keys?.map((key, index) => {
          if (key !== "id") {
            return (
              <div
                key={key}
                className='flex text-[#F5F5F5] p-3 justify-end'>
                <div className=''>
                  <label
                    key={key}
                    htmlFor={`key-${index}`}>
                    {key.toUpperCase()}:
                  </label>
                </div>
                <div>
                  <input
                    name={key}
                    id={`key-${index}`}
                    type='text'
                    defaultValue={entry[key] || ""}
                    className='bg-gray-50 text-[#2F2F2F] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 mx-2'
                  />
                </div>
              </div>
            );
          }
        })}
      <button type='button'>Add</button>
      <button
        type='button'
        onClick={() => {
          navigate("..");
        }}>
        Cancel
      </button>
    </form>
  );
}
