import { Route, Routes } from "react-router";

import SignupPage from "../Authorization/Signup";
import Landing from "../Landing Page/Landing";
import LoginPage from "../Authorization/Login";
import DashBoard from "../DashBoard";

const route = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
    </Routes>
  )
}

export default route
