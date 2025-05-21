import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://regel-medical-be.duckdns.org/api",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // headers.set("ngrok-skip-browser-warning", "skip-browser-warning");

      return headers;
    },
  }),
  tagTypes: [
    "studyCenter",
    "allQuestions",
    "Mvps",
    "MvpEmails",
    "ReferralEmails",
  ],
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
    updateStudyCenterStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/studyCenter/${id}/update-status`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["studyCenter"],
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
    //////////////////////////// Report
    getDashboardReport: builder.query({
      query: () => ({
        url: "/report/dashboard",
        method: "GET",
      }),
    }),
    generatePreScreeningExcelReport: builder.query({
      query: () => ({
        url: "/report/generateExcelReport",
        method: "GET",
      }),
    }),
    getPreScreeningReport: builder.query({
      query: ({ fromDate, studyCenterId, toDate }) => ({
        url: "/report",
        method: "GET",
        params: {
          fromDate,
          studyCenterId,
          toDate,
        },
      }),
    }),
    //////////////////////////// Mvp
    getAllMvpList: builder.query({
      query: ({ page, limit, studyCenterStatus }) => ({
        url: "/mvp",
        method: "GET",
        params: {
          page,
          limit,
          studyCenterStatus,
        },
      }),
      providesTags: ["Mvps"],
    }),
    getMvpDetail: builder.query({
      query: (id) => ({
        url: `/mvp/${id}/mvpReport`,
        method: "GET",
      }),
    }),

    //////////////////////////// Emails
    getMvpEmails: builder.query({
      query: () => ({
        url: "/email/mvp",
        method: "GET",
      }),
      providesTags: ["MvpEmails"],
    }),
    getReferralEmails: builder.query({
      query: () => ({
        url: "/email/referral",
        method: "GET",
      }),
      providesTags: ["ReferralEmails"],
    }),
    getEmailById: builder.query({
      query: (id) => ({
        url: `/email/${id}`,
        method: "GET",
      }),
    }),
    deleteEmailById: builder.mutation({
      query: (id) => ({
        url: `/email/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReferralEmails", "MvpEmails"],
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
  useGetDashboardReportQuery,
  useGetAllMvpListQuery,
  useGetMvpDetailQuery,
  useGetMvpEmailsQuery,
  useGetPreScreeningReportQuery,
  useGetReferralEmailsQuery,
  useGetEmailByIdQuery,
  useDeleteEmailByIdMutation,
  useLazyGeneratePreScreeningExcelReportQuery,
  useUpdateStudyCenterStatusMutation,
} = api;
