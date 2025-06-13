import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../store/uiSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { openNav, closeNav } = uiSlice.actions;
  const isNavOpen = useSelector((store) => store.ui.isNavOpen);
  let btn1 = "hidden";
  let btn2 = "block";
  if (isNavOpen) {
    btn1 = "block";
    btn2 = "hidden";
  }

  return (
    <header className='pb-2 bg-black'>
      <div className='px-10 py-2 '>
        <nav className='flex items-center justify-between h-16'>
          <button
            onClick={() => {
              if (isNavOpen) {
                dispatch(closeNav());
              } else {
                dispatch(openNav());
              }
            }}
            type='button'
            className='inline-flex p-2 text-white transition-all duration-200 rounded-md hover:bg-yellow-300 hover:text-black hover:cursor-pointer'>
            <svg
              className={btn2 + " w-6 h-6"}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 8h16M4 16h16'
              />
            </svg>
            <svg
              className={btn1 + " w-6 h-6"}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>

          <div className='flex items-center ml-auto space-x-10'>
            <a
              href='#'
              className='text-xl font-medium text-white transition-all duration-200 hover:text-yellow-200 focus:text-yellow-200'>
              Home
            </a>

            <a
              href='#'
              className='text-xl font-medium text-white transition-all duration-200 hover:text-yellow-200 focus:text-yellow-200'>
              About
            </a>

            <a
              href='#'
              className='text-xl font-medium text-white transition-all duration-200 hover:text-yellow-200 focus:text-yellow-200'>
              User
            </a>
          </div>

          <a
            href='#'
            className='items-center justify-center px-4 py-3 ml-10 text-xl font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700'
            role='button'>
            Log-out
          </a>
        </nav>
      </div>
    </header>
  );
}
