import { useParams } from "react-router-dom";
import EntryForm from "../components/EntryForm";
import { useFetchDataQuery } from "../store/dataApiSlice";
import { hasPermission } from "../utils/hasPermission";

export default function NewEntry() {
  const { data } = useFetchDataQuery();
  const currentTab = useParams().page.toLowerCase();
  const id = useParams().id;
  const entry = data[currentTab].find((tab) => tab.id == id);
  const userPermissions = hasPermission();
  console.log(userPermissions);

  return (
    <>
      {userPermissions[currentTab].create && (
        <div>
          <h1 className='m-2 p-2 text-center text-2xl'>
            {id ? "Edit" : "New"} Entry
          </h1>
          <hr />
          <EntryForm entry={entry} />
        </div>
      )}
      {!userPermissions[currentTab].create && (
        <div>
          <h1 className='m-2 p-2 text-center text-2xl'>
            You do not have permission !!
          </h1>
        </div>
      )}
    </>
  );
}
