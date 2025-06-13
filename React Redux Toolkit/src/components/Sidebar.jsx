import { useSelector } from "react-redux";
import Tab from "./Tab";

export default function Sidebar() {
  const isNavOpen = useSelector((store) => store.ui.isNavOpen);
  let width = "w-25";
  if (isNavOpen) {
    width = "w-60";
  }

  return (
    <nav
      className={
        "bg-black text-white w-20 h-screen p-6 space-y-4 transition " + width
      }>
      <Tab
        icon='👨🏻‍💼'
        name='Users'
      />
      <Tab
        icon='📄'
        name='Roles'
      />
      <Tab
        icon='⚙️'
        name='Permissions'
      />
      <Tab
        icon='✅'
        name='Todos'
      />
    </nav>
  );
}
