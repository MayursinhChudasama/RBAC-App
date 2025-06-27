export default function Login({ ref }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='p-1 h-96 w-4xl bg-[#0e0e0e] rounded-3xl flex'>
        <div className='py-25 px-20 w-1/2'>
          <h1 className='text-4xl'>Sign in</h1>
          <p className='py-4'>Use your email</p>
        </div>
        <div className='py-20'>
          <div>
            <input
              type='email'
              placeholder='Email:'
              className='border-1 rounded border-[#8e918f] my-5 p-5 h-11 w-80 text-[#8e918f] focus:text-[#e3e3e3] focus:border-[#a8c7fa] focus:outline-none'
            />
            <p className='text-[#a8c7fa] hover:cursor-pointer py-3 hover:underline'>
              Forgot email?
            </p>
          </div>
          <div class='flex gap-3 px-20 py-15'>
            <button className='hover:cursor-pointer rounded-2xl text-[#a8c7fa] m-2 w-40 h-9  hover:bg-[rgb(55,57,59)] '>
              Create account
            </button>
            <button className='hover:cursor-pointer rounded-2xl bg-[#a8c7fa] text-[#062e6f] m-2 w-23 h-9 hover:text=[#a8c7fa] hover:bg-[rgb(211,227,253)]'>
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
