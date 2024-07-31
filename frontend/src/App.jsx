import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Layouts
import LayoutLogin from "./layouts/LayoutLogin";
import LayoutAdmin from "./layouts/LayoutAdmin";
//import LayoutClient from "./layouts/LayoutWriter";

//public
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
import UserCreate from "./pageadmin/UserCreate";
import SowDetails from "./pageadmin/SowDetails";
import LayoutWriter from './layouts/LayoutWriter';

//Writer
import SowsAll from './pagewriter/SowAll';
import SowsCreate from './pagewriter/SowCreate';
import SowsDetails from './pagewriter/SowDetails';

//Reader
import LayoutReader from './layouts/LayoutReader'
import SowsAlls from './pagereader/SowAll';
import SowsDetailis from './pagereader/SowDetails';
import PanelReader from './pagereader/PanelReader';
import PanelWriter from './pagewriter/PanelWriter';
import ResetRequest from './pageauth/PasswordReset';
import ResetRequests from './pageadmin/ResetRequests';


const App = () => {
    return (
      <Router>
        <Routes>
            <Route path="/" element={<LayoutLogin/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/reset-password' element={<ResetRequest/>}/>
            
           <Route element={<ProtectedRoutes/>}>

           <Route path="/admin" element={<LayoutAdmin/>}>
                <Route index element={<PanelAdmin/>}/>
                <Route path="user" element={<UserAll/>}/>
                <Route path="user/edit/:id" element={<UserUpdate/>}/>
                <Route path="user/create" element={<UserCreate/>}/>
                <Route path='user/password' element={<ResetRequests />}/>
                <Route path="sow" element={<SowAll/>}/>
                <Route path="sow/create" element={<SowCreate/>}/>
                <Route path="sow/details/:id" element={<SowDetails/>}/>
                <Route path="sow/edit/:id" element={<SowDetails/>}/>
            </Route>

            <Route path="/writer" element={<LayoutWriter/>}>
            <Route index element={<PanelWriter/>}/>
              <Route path="sow" element={<SowsAll/>}/>
              <Route path="sow/create" element={<SowsCreate/>}/>
              <Route path="sow/details/:id" element={<SowsDetails/>}/>
              <Route path="sow/edit/:id" element={<SowsDetails/>}/>
            </Route>

            <Route path="/reader" element={<LayoutReader/>}> 
            <Route index element={<PanelReader/>}/>
              <Route path='sow' element={<SowsAlls/>}/>  
              <Route path="sow/details/:id" element={<SowsDetailis/>}/>
            </Route>

           </Route>
        </Routes>
      </Router>
    )
}

export default App