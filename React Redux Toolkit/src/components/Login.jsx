import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ obj }) {
  const { emailRef, passwordRef, handlePassword, handleEmail, user, err } = obj;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='p-1 h-96 w-4xl bg-[#0e0e0e] rounded-3xl flex'>
        <div className='py-25 px-20 w-1/2'>
          <h1 className='text-4xl'>
            {user ? `Welcome ${user?.name}!` : "Sign in"}
          </h1>
          <p className='py-4'>
            {user ? <Link to='/'>{`< ${user?.email}`}</Link> : "Use your email"}
          </p>
        </div>

        <div className='py-20'>
          <div>
            {!user && (
              <input
                type='email'
                ref={emailRef}
                // onChange={handleEmail}
                defaultValue={emailRef.current?.value || ""}
                placeholder='Email:'
                className='border-1 rounded border-[#8e918f] my-5 p-5 h-11 w-80 text-[#8e918f] focus:text-[#e3e3e3] focus:border-[#a8c7fa] focus:outline-none'
              />
            )}
            {user && (
              <>
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  // onChange={handlePassword}
                  defaultValue={passwordRef.current?.value || ""}
                  placeholder='Enter your password:'
                  className='border-1 rounded border-[#8e918f] my-5 p-5 h-11 w-80 text-[#8e918f] focus:text-[#e3e3e3] focus:border-[#a8c7fa] focus:outline-none'
                />
                <div className='mt-2 flex items-center gap-2'>
                  <input
                    id='showPassword'
                    type='checkbox'
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className='accent-blue-500'
                  />
                  <label
                    htmlFor='showPassword'
                    className='text-sm text-gray-600'>
                    Show Password
                  </label>
                </div>
              </>
            )}
            {err && (
              <p className='text-[#fabba8] hover:cursor-pointer py-3 hover:underline'>
                Your {user.email ? "password" : "email"} is wrong.
              </p>
            )}

            <p className='text-[#a8c7fa] hover:cursor-pointer py-3 hover:underline'>
              Forgot {user.email ? "password" : "email"} ?
            </p>
          </div>
          <div className='flex gap-3 px-20 py-15'>
            <button className='hover:cursor-pointer rounded-2xl text-[#a8c7fa] m-2 w-40 h-9  hover:bg-[rgb(55,57,59)] '>
              Create account
            </button>
            <button
              className='hover:cursor-pointer rounded-2xl bg-[#a8c7fa] text-[#062e6f] m-2 w-23 h-9 hover:text=[#a8c7fa] hover:bg-[rgb(211,227,253)]'
              onClick={() => {
                console.log("clicked");

                if (!user) {
                  handleEmail();
                } else {
                  handlePassword();
                }
              }}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className='py-2 text-[#e3e3e3] '>
        <span className='pr-125'>
          <span className='text-xs hover:text-[#a8c7fa] hover:cursor-pointer'>
            English
          </span>
        </span>
        <span className='px-5 text-xs hover:text-[#a8c7fa] hover:cursor-pointer'>
          Help
        </span>
        <span className='px-3 text-xs hover:text-[#a8c7fa] hover:cursor-pointer'>
          Privacy
        </span>
        <span className='px-3 text-xs hover:text-[#a8c7fa] hover:cursor-pointer'>
          Terms
        </span>
      </div>
    </div>
  );
}
