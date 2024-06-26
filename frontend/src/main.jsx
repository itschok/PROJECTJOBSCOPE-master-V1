import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Pagess/Home'
import Registerpage from './Pagess/Registerpage'
import Loginpage from './Pagess/Loginpage'
import Company from './Pagess/Companypage'
import Companylogin from './Pagess/Companlogin'
import CompanyRegis from './Pagess/CompanyRegis'
import Jobseekerhome from './Pagess/Jobseekerhome'
import Jobseekerprofilepage from './Pagess/Jobseekerprofilepage'
import Jobseekereidtprofile from './Pagess/Jobseekereditprofile'
import Myjobpage from './Pagess/Myjobpage'
import Companyhomepage from './Pagess/Companyhomepage'
import Companyprofilepage from './Pagess/Companyprofilepage'
import Postjobpage from './Pagess/Postjob'
import Mypostpage from './Pagess/Mypostpage'
import Applicantpage from './Pagess/Applicantpage'
import Editcompanypage from './Pagess/Editcompanypage'
import Editcompanyprofilepage from './Pagess/Editcompanyprofilepage'
import Viewcompanypage from './Pagess/Viewcompanypage'
import Adminpage from './Pagess/Adminpage'
const router=createBrowserRouter([
  {
    path:"/",
    element:<Home />
  },
  {
    path:"/Register",
    element:<Registerpage/>
  },
  {
    path:"/Login",
    element:<Loginpage/>
  },
  {
    path:"/Company",
    element:<Company/>
  },
  {
    path:"/CompanyLogin",
    element:<Companylogin/>
  },
  {
    path:"/CompanyRegister",
    element:<CompanyRegis/>
  },
  {
    path:"/Jobseekerhome/:jobseekerusername",
    element:<Jobseekerhome/>
  },
  {
    path:"/Profile/:jobseekerusername",
    element:<Jobseekerprofilepage/>
  },
  {
    path:"/Editprofile/:jobseekerusername",
    element:<Jobseekereidtprofile/>
  },
  {
    path:"/Myjob/:jobseekerusername",
    element:<Myjobpage/>
  },
  {
    path:"/Companyhome/:companyusername",
    element:<Companyhomepage/>
  },
  {
    path:"/Companyprofile/:companyusername",
    element:<Companyprofilepage/>
  },
  {
    path:"/Postjobpage/:companyusername",
    element:<Postjobpage/>
  },
  {
    path:"/Mypostpage/:companyusername",
    element:<Mypostpage/>
  },
  {
    path:"/Applicant/:companyusername",
    element:<Applicantpage/>
  },
  {
    path:"/Mypostpage/:companyusername/Editpost/:jobid",
    element:<Editcompanypage/>
  },
  {
    path:"/Editcompanyprofile/:companyusername",
    element:<Editcompanyprofilepage/>
  },
  {
    path:"/ViewProfile/:jobseekerusername/:companyusername",
    element:<Viewcompanypage/>
  },
  {
    path:"/onlyAdmin",
    element:<Adminpage/>
  }

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
