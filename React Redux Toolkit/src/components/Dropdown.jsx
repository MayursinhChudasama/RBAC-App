import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../store/uiSlice";
import { useParams } from "react-router-dom";
import { useFetchDataQuery } from "../store/dataApiSlice";

export default function Dropdown({ label = "Select", items = [] }) {
  const { data, isLoading, isError, error } = useFetchDataQuery();
  const params = useParams();
  const dropdownRef = useRef();
  const inputRefs = useRef([]);

  console.log(inputRefs.current[0]?.value);

  const { isDropdownOpen } = useSelector((store) => store.ui);
  const dispatch = useDispatch();

  const currentTab = params.page.toLowerCase();
  const keyNames = Object.keys(data[currentTab][0]);
  const [columnNames, setColumnNames] = useState(keyNames);
  console.log("keyNames", keyNames);
  const { openDropdown, closeDropDown } = uiSlice.actions;

  useEffect(() => {
    // setColumnNames(keyNames);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(closeDropDown());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleColumnNames(item, checked) {
    let updatedColNames = [...keyNames];
    console.log("updatedColNames before", updatedColNames);

    if (checked) {
      console.log("yes");
      // updatedColNames = updatedColNames.filter((key) => key !== item);
      console.log(updatedColNames);
    } else {
      console.log("no");
      updatedColNames.push(item);
      console.log(updatedColNames);
    }

    console.log("item", item);
    console.log("value", checked);

    // setColumnNames((prev) => [...prev]);
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div
      className='relative inline-block text-left'
      ref={dropdownRef}>
      <button
        onClick={() => {
          if (isDropdownOpen) {
            dispatch(closeDropDown());
          } else {
            dispatch(openDropdown());
          }
        }}
        className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none'>
        {label}
      </button>

      {isDropdownOpen && (
        <div className='absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5'>
          <div className='py-1'>
            {keyNames?.map((key, index) => (
              <label
                key={key}
                className='flex items-center px-4 py-2 hover:bg-blue-200 text-black cursor-pointer'
                htmlFor={`key-${index}`}>
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type='checkbox'
                  id={`key-${index}`}
                  onChange={(e) => {
                    handleColumnNames(key, e.target.checked);
                  }}
                  defaultChecked
                  className='mr-2 cursor-pointer'
                />
                {key}
              </label>
            ))}
          </div>
        </div>
      )}
      <button className='p-2 m-2 hover:bg-blue-300 rounded-md hover:cursor-pointer'>
        Filter
      </button>
    </div>
  );
}
