import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://regel-medical-be.vercel.app/api",

    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState().auth.token;
      // console.log(endpoint, "endpoint");
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
    getAllStudyCenterWithOutPagination: builder.query({
      query: () => ({
        url: `/studyCenter/get-all`,
        method: "GET",
      }),
      providesTags: ["studyCenter"],
    }),
    getRadiusBasedStudyCenter: builder.query({
      query: (zipVCode) => ({
        url: `/studyCenter/get-nearest/${zipVCode}`,
        method: "GET",
      }),
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
    getAllQuestionsForWebView: builder.query({
      query: () => ({
        url: `/question/getAllQuestions`,
        method: "GET",
      }),
      providesTags: ["allQuestions"],
    }),
    getLatestBatchNo: builder.query({
      query: () => ({
        url: `/answer/getLatestBatch`,
        method: "GET",
      }),
    }),

    addSectionsQuestions: builder.mutation({
      query: (payload) => ({
        url: "/question/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["allQuestions"],
    }),
    addAnswersOfSections: builder.mutation({
      query: (payload) => ({
        url: "/answer/add-answers",
        method: "POST",
        body: payload,
      }),
    }),
    evaluateAnswers: builder.mutation({
      query: (payload) => ({
        url: "/answer/evaluate-answers",
        method: "POST",
        body: payload,
      }),
    }),

    //////////////////////////// pre screener
    addNewMvp: builder.mutation({
      query: (payload) => ({
        url: "/mvp",
        method: "POST",
        body: payload,
      }),
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
  useLazyGetRadiusBasedStudyCenterQuery,
  useGetAllQuestionsForWebViewQuery,
  useGetLatestBatchNoQuery,
  useAddAnswersOfSectionsMutation,
  useEvaluateAnswersMutation,
  useAddNewMvpMutation,
  useGetAllStudyCenterWithOutPaginationQuery,
} = api;
