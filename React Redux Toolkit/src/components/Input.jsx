import { useFetchDataQuery } from "../store/dataApiSlice";

export default function Input({ obj }) {
  const { key, index, entry, ref } = obj;
  const baseClasses =
    "bg-gray-50 text-[#2F2F2F] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 mx-2 ";

  const { data } = useFetchDataQuery();

  let type;
  if (key == "email") {
    type = "email";
  } else if (key == "password") {
    type = "password";
  }

  let input = (
    <input
      name={key}
      id={key}
      type={type ?? "text"}
      defaultValue={entry ? entry[key] : ""}
      ref={ref}
      required
      className={baseClasses}
    />
  );

  if (key == "role") {
    input = (
      <select
        name={key}
        id={key}
        ref={ref}
        defaultValue={entry ? entry[key] : ""}
        required
        className={baseClasses + "w-48"}>
        {data.roles.map((role) => (
          <option
            key={role.id}
            value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    );
  } else if (key == "todos") {
    input = (
      <select
        name={key}
        id={key}
        ref={ref}
        defaultValue={entry?.todos || []}
        multiple
        required
        className={baseClasses + "w-50 h-75 "}>
        {data.todos.map((todo) => (
          <option
            key={todo.title}
            value={todo.id}>
            {todo.title}
          </option>
        ))}
      </select>
    );
  } else if (key == "permission") {
    input = (
      <select
        name={key}
        id={key}
        ref={ref}
        defaultValue={entry?.permission || []}
        multiple
        required
        className={baseClasses + "w-50 h-75"}>
        {data.permissions.map((permission) => (
          <option
            key={permission.id}
            value={permission.id}>
            {`${permission.type} : ${permission.name}`}
          </option>
        ))}
      </select>
    );
  } else if (key == "status") {
    input = (
      <select
        name={key}
        id={key}
        ref={ref}
        defaultValue={entry ? entry[key] : ""}
        required
        className={baseClasses + "w-48"}>
        <option value='Completed'>Completed</option>
        <option value='Pending'>Pending</option>
      </select>
    );
  }

  return <>{input}</>;
}
