import { useEffect, useRef, useState } from "react";

export default function Dropdown({ itemList }) {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
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
        onClick={() => setIsOpen((open) => !open)}
        className='px-4 py-2 text-white  rounded-md hover:bg-blue-400 focus:outline-none'>
        view
      </button>

      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5'>
          <div className='py-1'>
            {itemList.map((item, index) => (
              <p
                key={item}
                className='flex items-center px-4 py-2 hover:bg-blue-200 text-black cursor-pointer'>
                {item}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
