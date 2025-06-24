import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../store/uiSlice";
import { useParams } from "react-router-dom";
import { useFetchDataQuery } from "../store/dataApiSlice";
import { dataSlice } from "../store/dataSlice";

export default function Dropdown({ label = "Select", items = [] }) {
  const { data, isLoading, isError, error } = useFetchDataQuery();
  const params = useParams();
  const dropdownRef = useRef();
  const { isDropdownOpen } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  const currentTab = params.page.toLowerCase();
  const keyNames = Object.keys(data[currentTab][0]);
  const { openDropdown, closeDropDown } = uiSlice.actions;
  const { setData } = dataSlice.actions;

  function handleColumnNames() {
    let columnNames = [];
    let list = new Array(inputRefs)[0];
    // for (let key of document.getElementsByClassName("inputs")) {

    for (let key in list) {
      if (list[key]?.checked) {
        columnNames.push(list[key].name);
      }
    }

    dispatch(setData(columnNames));
  }

  useEffect(() => {
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
                  name={key}
                  type='checkbox'
                  id={`key-${index}`}
                  onChange={handleColumnNames}
                  defaultChecked
                  className='mr-2 cursor-pointer inputs'
                  ref={(el) => (inputRefs[index] = el)}
                />
                {key}
              </label>
            ))}
          </div>
        </div>
      )}
      {/* <button className='p-2 m-2 hover:bg-blue-300 rounded-md hover:cursor-pointer'>
        Filter
      </button> */}
    </div>
  );
}
