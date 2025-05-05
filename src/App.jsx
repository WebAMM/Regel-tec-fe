import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomeLayout, AdminLayout } from "./components";
import { ContactForm, Home, Prescreener } from "./pages";
import { AddPrescreener, Dashboard, MvpsList, PreScreenerList, StudyCenter } from "./pages/AdminPages";
import { Login, ForgotPassword, ChangePassword } from "./pages/AuthPages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="/prescreen" element={<Prescreener />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/change-password" element={<ChangePassword />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="study-center" element={<StudyCenter />} />
          <Route path="prescreener" element={<PreScreenerList />} />
          <Route path="add-prescreener" element={<AddPrescreener />} />
          <Route path="mvps" element={<MvpsList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
