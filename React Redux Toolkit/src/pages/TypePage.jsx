import { useParams } from "react-router-dom";
import ContentTable from "../components/ContentTable";
import { hasPermission } from "../utils/hasPermission";

export default function TypePage() {
  const userPermissions = hasPermission();
  const currentTab = useParams().page.toLowerCase();

  if (userPermissions[currentTab]?.read) {
    return <ContentTable />;
  } else {
    return <h1>You do not have permission.</h1>;
  }
}
