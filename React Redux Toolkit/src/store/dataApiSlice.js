import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => "data",
    }),
    postUsers: builder.mutation({
      query: (newUser) => ({
        url: `users`,
        method: "POST",
        body: newUser,
      }),
    }),
  }),
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  // refetchOnMountOrArgChange: true,
  // tagTypes: ["Data"],
});
export const { useFetchDataQuery } = dataApi;
