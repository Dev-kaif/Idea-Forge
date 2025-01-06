import { Route, Routes } from "react-router";

import SignupPage from "../Authorization/Signup";
import Landing from "../Landing Page/Landing";
import LoginPage from "../Authorization/Login";
import DashBoard from "../Dashboard Components/DashBoard";
import Shared from "../Dashboard Components/Shared";

const route = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/dashboard/:filter" element={<DashBoard/>}/>
        <Route path="/:hash" element={<Shared />}/>
    </Routes>
  )
}
export default route
