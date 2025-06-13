import Heading from "./Heading";

export default function Content() {
  return (
    <main className='p-1 m-2 w-screen bg-gray-400 h-200'>
      <Heading heading='heading' />
      <div className='border-1 p-2 my-2 mx-1 h-175'>Content</div>
    </main>
  );
}
