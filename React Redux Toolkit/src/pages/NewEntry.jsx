import EntryForm from "../components/EntryForm";

export default function NewEntry() {
  return (
    <>
      <div>
        <h1 className='m-2 p-2 text-center text-2xl'>New Entry</h1>
        <hr />
        <EntryForm />
      </div>
    </>
  );
}
