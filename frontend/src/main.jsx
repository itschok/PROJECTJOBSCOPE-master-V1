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
    path:"/Jobseekerhome",
    element:<Jobseekerhome/>
  },
  {
    path:"/Profile/:username",
    element:<Jobseekerprofilepage/>
  },
  {
    path:"/Editprofile",
    element:<Jobseekereidtprofile/>
  },
  {
    path:"/Myjob",
    element:<Myjobpage/>
  },
  {
    path:"/Companyhome",
    element:<Companyhomepage/>
  },
  {
    path:"/Companyprofile",
    element:<Companyprofilepage/>
  }

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
