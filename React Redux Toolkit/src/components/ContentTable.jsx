import { useParams } from "react-router-dom";
import { useFetchDataQuery } from "../store/dataApiSlice";

export default function ContentTable() {
  const { data, isLoading, isError, error } = useFetchDataQuery();
  const params = useParams();
  const currentTab = params.page.toLowerCase();
  const listItems = Object.keys(data[currentTab][0]);
  console.log(data[currentTab]);

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
                {listItems.map((row) => {
                  return (
                    <td
                      className='border-1 m-1 p-1'
                      key={row}>
                      {data[currentTab][i][row]}
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
