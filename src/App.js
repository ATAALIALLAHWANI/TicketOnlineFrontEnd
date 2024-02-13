import './App.css';
import {Route,Routes} from "react-router-dom";
import TripSchedule2 from './components/TripSchedule2/TripSchedule2.js';
import SignUp from './components/SignUp/SignUp.js';
import Login from './components/Login/Login.js';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Services from './routes/Services';
import Modal from './components/ChooseSeat/Modal.js';
import TicketDetails from './components/TicketDetails/TicketDetails.js';
import PaymentPage from './components/PaymentPage/PaymentPage.js';
import CreditCard from './components/CreditCard/CreditCard.js';
import Messages from './components/Messages/Messages.js';
import Notification from './components/Notification/Notification.js';
import Profile from './components/Profile/Profile.js';
import BoardingPoints from './components/BoardingPoints/BoardingPoints.js';
import UnpaidTickets from './components/UnpaidTickets/UnpaidTickets.js';
import BusTickets from './components/BusTickets/BusTickets.js';
import TripScheduleAdmin from './components/TripScheduleAdmin/TripScheduleAdmin.js';
import AdminPage from './components/AdminPage/AdminPage.js';
import Users from './components/Users/Users.js';
import Drivers from './components/Drivers/Drivers.js';
import AddDriver from './components/AddDriver/AddDriver.js';
import Journey from './components/Journey/Journey.js';
import Buses from './components/Buses/Buses.js';
import DriverPage from './components/DriverPage/DriverPage.js';

function App() {
  return ( 
    <Routes>
        <Route path='/SignUp' element={<SignUp />}></Route>
        <Route path='/Login'  element={<Login />}></Route>
        <Route path='/'   element={<Home/>}/>
        <Route path='/about'  element={<About/>}/>
        <Route path='/service'element={<Services/>}/>
        <Route path='/contact'element={<Contact/>}/>
        <Route path='/TripSchedule2'  element={<TripSchedule2 />}></Route>
        <Route path='/Modal'  element={<Modal />}></Route>
        <Route path='/TicketDetails'  element={<TicketDetails />}></Route>
        <Route path='/PaymentPage'  element={<PaymentPage />}></Route>
        <Route path='/CreditCard'  element={<CreditCard />}></Route>
        <Route path='/Messages'  element={<Messages />}></Route>
        <Route path='/Notification'  element={<Notification />}></Route>
        <Route path='/Profile'  element={<Profile />}></Route>
        <Route path='/BoardingPoints'  element={<BoardingPoints />}></Route>
        <Route path='/UnpaidTickets'  element={<UnpaidTickets />}></Route>
        <Route path='/BusTickets'  element={<BusTickets />}></Route>
        <Route path='/TripScheduleAdmin'  element={<TripScheduleAdmin />}></Route>
        <Route path='/AdminPage'  element={<AdminPage />}></Route>
        <Route path='/Users'  element={<Users />}></Route>
        <Route path='/Drivers'  element={<Drivers />}></Route>
        <Route path='/AddDriver'  element={<AddDriver />}></Route>
        <Route path='/Journey'  element={<Journey />}></Route>
        <Route path='/Buses'  element={<Buses />}></Route>
        <Route path='/DriverPage'  element={<DriverPage />}></Route>
    </Routes>
  );
}

export default App;