import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://regel-medical-be.vercel.app/api",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // headers.set("ngrok-skip-browser-warning", "skip-browser-warning");

      return headers;
    },
  }),
  tagTypes: ["studyCenter", "allQuestions"],
  endpoints: (builder) => ({
    //////////////////////////// auth
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),
    updatePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/update-password",
        method: "PATCH",
        body: payload,
      }),
    }),
    resetToken: builder.query({
      query: (token) => ({
        url: `/auth/reset-password/${token}`,
        method: "GET",
      }),
    }),
    //////////////////////////// study center
    getAllStudyCenter: builder.query({
      query: ({ status, page, limit }) => ({
        url: `/studyCenter`,
        method: "GET",
        params: {
          status,
          page,
          limit,
        },
      }),
      providesTags: ["studyCenter"],
    }),
    addStudyCenter: builder.mutation({
      query: (payload) => ({
        url: "/studyCenter",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["studyCenter"],
    }),

    //////////////////////////// pre screener

    getAllQuestions: builder.query({
      query: () => ({
        url: `/question`,
        method: "GET",
        // params: {
        //   status,
        //   page,
        //   limit,
        // },
      }),
      providesTags: ["allQuestions"],
    }),
    addSectionsQuestions: builder.mutation({
      query: (payload) => ({
        url: "/question/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["allQuestions"],
    }),
  }),
});
export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResetTokenQuery,
  useUpdatePasswordMutation,
  useGetAllStudyCenterQuery,
  useAddStudyCenterMutation,
  useGetAllQuestionsQuery,
  useAddSectionsQuestionsMutation,
} = api;
