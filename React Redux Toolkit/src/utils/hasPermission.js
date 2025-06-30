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
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = data.roles.find((role) => role.id == user.role);
  const userPermissions = data.permissions.filter((permission) =>
    userRole?.permission.includes(permission.id)
  );
  console.log("user permission check->", userPermissions);
  console.log("----", new Set(userPermissions.map((user) => user.type)));
}
