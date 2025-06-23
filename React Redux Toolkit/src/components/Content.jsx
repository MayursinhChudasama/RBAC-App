import Heading from "./Heading";
import { useFetchDataQuery } from "../store/dataApiSlice";
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import ContentTable from "./ContentTable";
import { dataSlice } from "../store/dataSlice";
import { useDispatch } from "react-redux";

export default function Content() {
  const params = useParams();
  // const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useFetchDataQuery();
  const currentTab = params.page;
  // const { setData } = dataSlice.actions;

  // useEffect(() => {
  //   dispatch(setData(data));
  // }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  // console.log("currentTab", currentTab);

  return (
    <main className='p-1 m-2 w-screen  h-200'>
      <Heading heading={currentTab} />
      <div className='border-1 p-2 my-2 mx-1 h-175 flex justify-center'>
        <Outlet />
      </div>
    </main>
  );
}
