import { useSelector } from "react-redux";
import { useFetchDataQuery } from "../store/dataApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

export default function EntryForm({ entry }) {
  const { data } = useFetchDataQuery();
  const navigate = useNavigate();
  const currentTab = useParams().page.toLowerCase();
  const id = useParams().id;
  const inputRefs = useRef([]);

  const keys = Object.keys(data[currentTab][0]);
  function handleAdd() {
    console.log("add clicked");
    let list = new Array(inputRefs)[0];

    let updatedEntry = {};
    for (const input in list) {
      if (list[input].name) {
        updatedEntry = {
          ...updatedEntry,
          [list[input].name]: list[input].value,
        };
      }
    }
    console.log(updatedEntry);
  }

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
                    defaultValue={entry ? entry[key] : ""}
                    ref={(el) => (inputRefs[index] = el)}
                    className='bg-gray-50 text-[#2F2F2F] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 mx-2'
                  />
                </div>
              </div>
            );
          }
        })}
      <button
        type='button'
        onClick={handleAdd}>
        Add
      </button>
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
