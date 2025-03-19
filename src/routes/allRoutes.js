import React from "react"
import { Navigate } from "react-router-dom"

// Dashboard
import Dashboard from "../pages/Dashboard/Index"
import Deceased from "../pages/Cases/Deceased"
import ResetPassword from "../pages/Authentication/ResetPassword"
// Authentication related pages
import Login from "../pages/Authentication/Login"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import DeceasedRecord from "../pages/Cases/DeceasedDetails"
import NonResidential from "../pages/Cases/NonResidential"
import UserProfile from "../pages/Authentication/UserProfile"
import PagesFaqs from "../pages/Cases/Faq"

export const Path = {
  dashboard:"/dashboard",
  deceasedRecord:"/cases/deceased/:id",
  login:"/login",
  nonResidential:"/cases/non-residential",
  deceased:"/cases/deceased",
  faq:"/resources/faq"
}


const userRoutes = [
  { path: Path.dashboard, component: <Dashboard /> },
  { path: "/cases/deceased/:id", component: <DeceasedRecord /> },
  { path: "/cases/non-residential", component: <NonResidential />, },
  { path: "/resources/faq", component: <PagesFaqs />, },
  { path: "/cases/deceased", component: <Deceased />, },



  // //profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const authRoutes = [
  { path: Path.login, component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/reset-password/:token", component: < ResetPassword /> },


]

export { userRoutes, authRoutes }