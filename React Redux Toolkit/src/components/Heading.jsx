import Dropdown from "./Dropdown";

export default function Heading({ heading }) {
  return (
    <div className='border-1 p-2 my-2 mx-1 h-20 flex justify-between'>
      <button>Add</button>
      <h3>{heading}</h3>
      <Dropdown />
    </div>
  );
}
