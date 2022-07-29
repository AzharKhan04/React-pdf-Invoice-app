import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './feature/AddProduct';
import AddExtraCharges from './feature/AddExtraCharges';
import Dashboard from './feature/Dashboard';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import BillPdf from './feature/BillPdf/BillPdf';
import AddCompany from './feature/AddCompany';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }} maxSnack={3}>
    <Provider store = {store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/creatinvoice" element={<App />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/addextracharges" element={<AddExtraCharges />} />
      <Route path="/addcompany" element={<AddCompany />} />

      <Route path="/billpdf" element={<BillPdf />} />


    </Routes>
  </BrowserRouter>
  </Provider>
  </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
