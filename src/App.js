import './App.css';
import Login from "./pages/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import MainHeader from "./components/MainHeader/MainHeader";
import Register from "./pages/Register/Register";
import CouponsPage from "./pages/CouponsPage/CouponsPage";
import StorePage from "./pages/Store/Store";
import UpdateUserDetails from "./pages/UpdateUserDetails/UpdateUserDetails";

function App() {
    return (
        <div>
            <MainHeader/>
            <Routes>
                <Route path="/" element={<Navigate to={"/login"} />}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/home"} element={<CouponsPage/>}/>
                <Route path={"/store"} element={<StorePage/>}/>
                <Route path={"/updateUserDetails"} element={<UpdateUserDetails/>}/>
            </Routes>
        </div>

    );
}

export default App;


