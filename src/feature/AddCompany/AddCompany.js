import React, { useEffect, useState } from "react";
import Header from "../Header";
import Button from '@mui/material/Button';
import { setLocalStorageItem ,getLocalStorageItem } from "../../Service/Util/localstorage.service";
import debounce from "@mui/utils/debounce";
import { uid } from 'uid';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const AddCompany = ({data}) => {

    const [company,setCompany] = useState({});
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const  navigate = useNavigate();

    const defaulCompany = {
        name:'',
        address:'',
        contact:'',
        email:'',
        website:'',
    }



    useEffect(()=>{

        if(data) {
            setCompany(data)
        } else {
            
            setCompany(defaulCompany)
        }

    },[]);



    const updateCompany = (key,val) => {

        setCompany((preCompany)=>{
            return {
                ...preCompany,
                [key]:val
            }
        })

    }

    const _saveCompany = async() => {


        if(!company.name || !company.contact || !company.address) {
            return ;
        }

        try {

            setLocalStorageItem('company',company)
            let message = 'Company Details Updated'
            enqueueSnackbar(message,{variant:'success'})
            navigate('/')

        } catch(err) {


        }

    }

    const saveCompany = debounce(_saveCompany,300)


    return (
        <React.Fragment>
            <Header data= {{name:'Add Company Details'}}/>
<div className="container container-fuild">
            <form>
  <div className="margin-bottom form-group">
    <input onChange={(e)=>{
        updateCompany('name',e.target.value)
    }} value={company.name } type="text" className="form-control form-control-lg"  placeholder="Company Name"/>
  </div>

  <div className="margin-bottom form-group">
    <input onChange={(e)=>{
        updateCompany('address',e.target.value)
    }} value={company.address } type="textarea" className="form-control form-control-lg"  placeholder="Company Address"/>
  </div>

   
   <div className="margin-bottom form-group">
    <input type={"number"}  onChange={(e)=>{
        updateCompany('contact',e.target.value)
    }} value={company.contact}  className="form-control form-control-lg"  placeholder="Contact Number"/>
  </div>
  <div className="margin-bottom form-group">
    <input onChange={(e)=>{
        updateCompany('email',e.target.value)
    }} value={company.email } type="text" className="form-control form-control-lg"  placeholder="Company Email"/>
  </div>

  <div className="margin-bottom form-group">
    <input onChange={(e)=>{
        updateCompany('website',e.target.value)
    }} value={company.website } type="text" className="form-control form-control-lg"  placeholder="Company Website"/>
  </div>

    
  
</form>
  

</div>

<div className="bottom-bar">
    <div className="text-center">
    <Button onClick={saveCompany}  variant="contained">Add Company</Button>

</div>
 </div> 

         </React.Fragment>   
    )

}
export default AddCompany;