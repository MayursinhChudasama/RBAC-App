import { useParams } from "react-router-dom";
import { useFetchDataQuery } from "../store/dataApiSlice";

export default function renderKeyList(currentTab) {
  let finalKeysList = [];
  if (currentTab == "users") {
    finalKeysList = [
      "ID",
      "Name",
      "Email",
      "Password",
      "Role",
      "Todos",
      "Action",
    ];
  } else if (currentTab == "roles") {
    finalKeysList = ["ID", "Name", "Permission", "Action"];
  } else if (currentTab == "permissions") {
    finalKeysList = ["ID", "Name", "Type", "Action"];
  } else if (currentTab == "todos") {
    finalKeysList = ["ID", "Title", "Status", "Action"];
  }

  return finalKeysList;
}
