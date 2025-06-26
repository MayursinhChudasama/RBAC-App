import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => "data",
      providesTags: ["data"],
    }),
    postData: builder.mutation({
      query: (newUser) => ({
        url: "data",
        method: "PUT",
        body: JSON.stringify(newUser),
      }),
      invalidatesTags: ["data"],
    }),
  }),
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  // refetchOnMountOrArgChange: true,
  // tagTypes: ["Data"],
});
export const { useFetchDataQuery, usePostDataMutation } = dataApi;
