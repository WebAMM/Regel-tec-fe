import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { HomeLayout, AdminLayout } from "./components";
import { ContactForm, Home, Prescreener } from "./pages";
import { AddPrescreener, Dashboard, MvpsList, PreScreenerList, StudyCenter } from "./pages/AdminPages";
import { Login, ForgotPassword, ChangePassword } from "./pages/AuthPages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPreScreenerQuestions from "./pages/AdminPages/AddPreScreenerQuestions";
import SampleScreener from "./pages/Prescreener/SampleScreener";
import MvpDetail from "./pages/AdminPages/MvpDetail";
import Emails from "./pages/Email";
import Reports from "./pages/Reports";
import PreScreeningReport from "./pages/Reports/PreScreeningReport";
import Settings from "./pages/Settings";

function App() {
  // Define router with createBrowserRouter
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    {
      path: "/prescreen",
      // element: <Prescreener />
      element: <SampleScreener />

    },
    {
      path: "/contact",
      element: <ContactForm />
    },
    {
      path: "/admin/login",
      element: <Login />
    },
    {
      path: "/admin/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/admin/change-password",
      element: <ChangePassword />
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: "study-center",
          element: <StudyCenter />
        },
        {
          path: "prescreener",
          element: <PreScreenerList />

        },
        {
          path: "add-prescreener",
          // element: <AddPrescreener />
          element: <AddPreScreenerQuestions />
        },
        {
          path: "mvps",
          element: <MvpsList />
        },
        {
          path: "mvp/detail",
          element: <MvpDetail />
        },
        {
          path: "referral-emails",
          element: <Emails />
        },
        {
          path: "reports",
          element: <Reports />
        },
        {
          path: "pre-screening-report",
          element: <PreScreeningReport />
        },
        {
          path: "settings",
          element: <Settings />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;