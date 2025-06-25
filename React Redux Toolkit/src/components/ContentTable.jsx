import { useParams } from "react-router-dom";
import { useFetchDataQuery } from "../store/dataApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dataSlice } from "../store/dataSlice";
import Dropdown from "./ViewOptions";
import renderKeyList from "../utils/renderKeyList";
import Buttons from "./Buttons";

export default function ContentTable() {
  const { data, isLoading, isError, error } = useFetchDataQuery();

  const currentTab = useParams().page.toLowerCase();
  // const keysList = renderKeyList(currentTab);
  const keysListRendered = renderKeyList(currentTab);

  const keysListUpdated = useSelector((store) => store.data);
  const keysListUpdatedNotFrozen = JSON.parse(JSON.stringify(keysListUpdated));

  const keysList =
    keysListUpdatedNotFrozen.length > 0
      ? keysListUpdatedNotFrozen
      : keysListRendered;
  if (!keysList.includes("Action")) {
    keysList.push("Action");
  }

  const keys = keysList.map((item) => item.toLowerCase());

  return (
    <div>
      <table className='text-center border-collapse table-auto'>
        <thead>
          <tr>
            {keysList.map((item, i) => {
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
                {keys.map((keyName, j) => {
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
                  } else if (keyName === "status") {
                    if (content == true) {
                      content = "Completed";
                    } else {
                      content = "Pending";
                    }
                  } else if (keyName === "action") {
                    content = <Buttons id={data[currentTab][i].id} />;
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
