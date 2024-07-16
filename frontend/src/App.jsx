
//import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Layouts
import LayoutLogin from "./layouts/LayoutLogin";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient";

//public
import PageHome from "./pagecls/PageHome";
import ProtectedRoutes from "./pageauth/ProtectedRoutes";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//auth
import Login from "./pageauth/Login";
import PanelAdmin from "./pageadmin/PanelAdmin";

//Admin
import UserAll from "./pageadmin/UserAll";
import UserUpdate from "./pageadmin/UserUpdate";
import SowAll from "./pageadmin/SowAll";
import SowCreate from "./pageadmin/SowCreate";
import PanelUser from "./pageuser/PanelClient";
import UserCreate from "./pageadmin/UserCreate";
import SowDetails from "./pageadmin/SowDetails";
import SearchBar from "./components/SearchBar";


const App = () => {
    return (
      <Router>
        <Routes>
            <Route path="/" element={<LayoutLogin/>}/>
            <Route path='/login' element={<Login/>}/>
            
           <Route element={<ProtectedRoutes/>}>
            <Route path="/n"element={<SearchBar/>}/>
           <Route path="/admin" element={<LayoutAdmin/>}>
                <Route index element={<PanelAdmin/>}/>
                <Route path="user" element={<UserAll/>}/>
                <Route path="user/edit/:id" element={<UserUpdate/>}/>
                <Route path="user/create" element={<UserCreate/>}/>
                <Route path="sow" element={<SowAll/>}/>
                <Route path="sow/create" element={<SowCreate/>}/>
                <Route path="sow/details/:id" element={<SowDetails/>}/>
                <Route path="sow/edit/:id" element={<SowDetails/>}/>
            </Route>
            <Route path="/user" element={<LayoutClient/>}>
                <Route index element={<PageHome/>}/>\
                <Route index element={<PanelUser/>}/>
            </Route>
           </Route>
        </Routes>
      </Router>
    )
}

export default App
