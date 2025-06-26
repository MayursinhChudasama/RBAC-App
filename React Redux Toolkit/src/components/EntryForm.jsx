import { useSelector } from "react-redux";
import { useFetchDataQuery, usePostDataMutation } from "../store/dataApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import Input from "./Input";

export default function EntryForm({ entry }) {
  const [postData, { isLoading, isSuccess, error }] = usePostDataMutation();
  const { data } = useFetchDataQuery();
  const navigate = useNavigate();
  const currentTab = useParams().page.toLowerCase();
  const id = useParams().id;
  const inputRefs = useRef([]);

  const keys = Object.keys(data[currentTab][0]);

  async function handleAdd(event) {
    event.preventDefault();
    console.log("add clicked");

    // let list = new Array(inputRefs)[0];
    let list = inputRefs.current;
    let updatedEntry = {
      id: Date.now(),
    };

    for (const input in list) {
      if (list[input].name && list[input].name === "todos") {
        const selectedTodos = Array.from(list[input].selectedOptions, (item) =>
          Number(item.value)
        );

        updatedEntry = {
          ...updatedEntry,
          [list[input].name]: selectedTodos || [],
        };
        //
      } else if (list[input].name && list[input].name === "permission") {
        const selectedPermissions = Array.from(
          list[input].selectedOptions,
          (item) => Number(item.value)
        );

        updatedEntry = {
          ...updatedEntry,
          [list[input].name]: selectedPermissions,
        };
        //
      } else if (list[input].name && list[input].name === "role") {
        updatedEntry = {
          ...updatedEntry,
          [list[input].name]: Number(list[input].value),
        };
        //
      } else if (list[input].name) {
        updatedEntry = {
          ...updatedEntry,
          [list[input].name]: list[input].value,
        };
      }
    }
    let updatedData = JSON.parse(JSON.stringify(data));
    if (entry) {
      const index = data[currentTab].findIndex((item) => entry.id == item.id);
      console.log("clicked item", data[currentTab][index]);

      updatedData[currentTab][index] = updatedEntry;
    } else {
      updatedData = {
        ...data,
        [currentTab]: [...data[currentTab], updatedEntry],
      };
    }

    try {
      await postData(updatedData).unwrap();
      navigate("..");
    } catch (err) {
      console.log("Failed to create user:", err);
    }
    // console.log("updatedEntry", updatedEntry);
  }

  return (
    <form
      onSubmit={handleAdd}
      className='flex flex-col justify-center'>
      {keys &&
        keys.map((key, index) => {
          // {key,index,type,entry,ref }
          if (key !== "id") {
            return (
              <div
                key={key}
                className='flex text-[#F5F5F5] p-3 justify-between'>
                <div className=''>
                  <label
                    key={key}
                    htmlFor={`key-${index}`}>
                    {key.toUpperCase()}:
                  </label>
                </div>
                <div>
                  <Input
                    obj={{
                      key,
                      index,
                      entry,
                      ref: (el) => (inputRefs.current[index] = el),
                    }}
                  />
                </div>
              </div>
            );
          }
        })}
      <button>{entry ? "Edit" : "Add"}</button>
      <button
        type='button'
        onClick={() => {
          navigate("..");
        }}>
        Cancel
      </button>
    </form>
  );
}
