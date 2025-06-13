import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../store/uiSlice";

export default function Dropdown({ label = "Menu", items = ["one", "two"] }) {
  const dropdownRef = useRef();
  const isDropdownOpen = useSelector((store) => store.ui.isDropdownOpen);
  const dispatch = useDispatch();
  const { openDropdown, closeDropDown } = uiSlice.actions;

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
            {items.map((item, index) => (
              <div
                key={index}
                className='flex items-center px-4 py-2 hover:bg-blue-200'>
                <input
                  type='checkbox'
                  id={`item-${index}`}
                  className='mr-2 cursor-pointer'
                />
                <label
                  htmlFor={`item-${index}`}
                  className='text-black cursor-pointer'>
                  {item}
                </label>
              </div>
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
