import { useParams } from "react-router-dom";
import { useFetchDataQuery } from "../store/dataApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dataSlice } from "../store/dataSlice";
import Dropdown from "./Dropdown";

export default function ContentTable() {
  const { data, isLoading, isError, error } = useFetchDataQuery();
  const params = useParams();
  const columnNames = useSelector((store) => store.data);
  const dispatch = useDispatch();

  const { setData } = dataSlice.actions;
  const currentTab = params.page.toLowerCase();
  let listItems =
    columnNames.length > 0 ? columnNames : Object.keys(data[currentTab][0]);

  useEffect(() => {
    dispatch(setData(Object.keys(data[currentTab][0])));
  }, [currentTab]);
  // console.log(data[currentTab]);
  console.log("all todos", data.todos);
  console.log(data.todos.filter((item) => item.id == 3));

  return (
    <div>
      <table className='text-center border-collapse table-auto'>
        <thead>
          <tr>
            {listItems.map((item, i) => {
              return (
                <th
                  key={item}
                  className='border-1 m-1 p-1 '>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data[currentTab].map((item, i) => {
            return (
              <tr
                key={item.id}
                className='m-1 p-1'>
                {listItems.map((keyName, j) => {
                  let content = data[currentTab][i][keyName];
                  if (keyName === "todos") {
                    let userTodosId = data[currentTab][i][keyName];
                    let userTodoList = data.todos
                      .filter((item, i) => userTodosId?.includes(item.id))
                      .map((todo) => todo.title);
                    content = userTodoList[0] ? (
                      <Dropdown itemList={userTodoList} />
                    ) : (
                      <div className='m-1 p-1'>{`No ${keyName}`}</div>
                    );
                  } else if (keyName === "role") {
                    let userRole = data[currentTab][i][keyName];
                    let userRoleName = data.roles.find(
                      (role) => role.id == userRole
                    )?.name;

                    content = userRoleName;
                  }
                  return (
                    <td
                      className='border-1 m-1 p-1'
                      key={keyName}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
