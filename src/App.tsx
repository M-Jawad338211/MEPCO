
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Home from './screens/Home';
import Verification from './screens/Verification';
import ForgotPassword from './screens/ForgotPassword';
import SmartView from './screens/SmartView';
import LoadProfile from './screens/LoadProfile';
import Consumptions from './screens/ConsumptionsHistory';
import Advisor from './screens/Threshold';
import Services from './screens/Services';
import Outage from './screens/PowerOutage';
import SmartPayment from './screens/SmartPayment';
import NewConnection from './screens/NewConnection';
import ChangeOfName from './screens/ChangeOfName';
import DueDate from './screens/DueDate';
import BillEstimator from './screens/BillEstimator';
import OptForMeter from './screens/OptForMeter';
import Complaints from './screens/Complaints';
import Paybill from './screens/Paybill';
import CnicUpdation from './screens/CnicUpdation';
import MeterChange from './screens/DateBarcode';
import MeterReadingCorrection from './screens/MeterReadingCorrection';
import SetPassword from './screens/SetPassword';
import Verificationotp from './screens/Verificationotp';
import ForgotPasswordotp from './screens/ForgotPasswordotp';
import PaymentHistory from './screens/PaymentHistory';
import Threshold from './screens/Threshold';
import ConsumptionsHistory from './screens/ConsumptionsHistory';
import PowerOutage from './screens/PowerOutage';
import UserProfile from './screens/UserProfile';
import EstimatedBill from './screens/EstimatedBill';
import Barcode from './screens/Barcode';
import DateBarcode from './screens/DateBarcode';
import WrongMeterReading from './screens/WrongMeterReading';
import UserStateProvider from './components/userContextFile/UsersState';


function App() {
  return (

    <>
    <UserStateProvider>
      <BrowserRouter>
        <Routes >
          <Route path='/' >
            <Route index element={<Login />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/SmartView' element={<SmartView />} />
            <Route path='/Verification' element={<Verification />} />
            <Route path='/Verificationotp' element={<Verificationotp />} />
            <Route path='/SetPassword' element={<SetPassword />} />
            <Route path='/ForgotPassword' element={<ForgotPassword />} />
            <Route path='/ForgotPasswordotp' element={<ForgotPasswordotp />} />
            <Route path='/LoadProfile' element={<LoadProfile />} />
            <Route path='/ConsumptionsHistory' element={<ConsumptionsHistory />} />
            <Route path='/PowerOutage' element={<PowerOutage />} />
            <Route path='/SmartPayment' element={<SmartPayment />} />
            <Route path='/Threshold' element={<Threshold />} />
            <Route path='/Services' element={<Services />} />
            <Route path='/OptForMeter' element={<OptForMeter />} />
            <Route path='/Complaints' element={<Complaints />} />
            <Route path='/Paybill' element={<Paybill />} />
            <Route path='/NewConnection' element={<NewConnection />} />
            <Route path='/CnicUpdation' element={<CnicUpdation />} />
            <Route path='/ChangeOfName' element={<ChangeOfName />} />
            <Route path='/DateBarcode' element={<DateBarcode />} />
            <Route path='/DueDate' element={<DueDate />} />
            <Route path='/Barcode ' element={<Barcode />} />
            <Route path='/MeterReadingCorrection' element={<MeterReadingCorrection />} />
            <Route path='/WrongMeterReading' element={<WrongMeterReading />} />
            <Route path='/BillEstimator' element={<BillEstimator />} />
            <Route path='/EstimatedBill' element={<EstimatedBill />} />
            <Route path='/PaymentHistory' element={<PaymentHistory />} />
            <Route path='/UserProfile' element={<UserProfile />} />

          </Route>
        </Routes>
      </BrowserRouter>
      </UserStateProvider>




    </>
  );
}

export default App;