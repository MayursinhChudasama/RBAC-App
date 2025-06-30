import { useParams } from "react-router-dom";
import { useFetchDataQuery } from "../store/dataApiSlice";

export function hasPermission() {
  const { data } = useFetchDataQuery();

  const permissions = {
    users: { create: false, read: false, edit: false, delete: false },
    roles: { create: false, read: false, edit: false, delete: false },
    permissions: { create: false, read: false, edit: false, delete: false },
    todos: { create: false, read: false, edit: false, delete: false },
  };
  // const permissionTypes = ["user", "role", "permission", "todo"];
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = data.roles.find((role) => role.id == user.role);
  const userPermissions = data.permissions.filter((permission) =>
    userRole?.permission.includes(permission.id)
  );

  for (let i = 0; i < userPermissions.length; i++) {
    let type = userPermissions[i].type;
    let name = userPermissions[i].name;
    permissions[type][name] = true;
  }

  return permissions;
}
