import React, { useEffect, useState } from "react";
import Header from "../Header";
import Button from '@mui/material/Button';
import { setLocalStorageItem ,getLocalStorageItem } from "../../Service/Util/localstorage.service";
import debounce from "@mui/utils/debounce";
import { uid } from 'uid';
import getAllExtraCharges from "./AddExtraCharges.service";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const AddExtraCharges = ({data}) => {

    const [extraChargres,setExtraCharges] = useState({});
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const  navigate = useNavigate();

    const defaultExtraCharges = {
        name:'',
        type:'PERCENTAGE',
        value:''
    }



    useEffect(()=>{

        if(data) {
            setExtraCharges(data)
        } else {
            
            setExtraCharges(defaultExtraCharges)
        }

    },[]);



    const updateProduct = (key,val) => {

        setExtraCharges((preCharges)=>{
            return {
                ...preCharges,
                [key]:val
            }
        })

    }

    const _saveExtraCharges = async() => {


        if(!extraChargres.name || !extraChargres.type || !extraChargres.value) {
            return ;
        }

        let allExtraCharges = [];
        try {

            let data =  await getAllExtraCharges();
            if(data) {
                allExtraCharges = data;
            }

            allExtraCharges.push({...extraChargres,id:uid()});


            setLocalStorageItem('extracharges',allExtraCharges).then((res)=>{

                setExtraCharges(defaultExtraCharges)

                const message = 'Extra Charge Added !';
                enqueueSnackbar(message, { variant: 'success' })
                navigate('/')
    
            }).catch((err)=>{
    
            })
    



        } catch(err) {

            console.log(err)

        }

    }

    const saveExtraCharges = debounce(_saveExtraCharges,300)


    return (
        <React.Fragment>
            <Header data= {{name:'Add Extra Charges/Taxes'}}/>
<div className="container container-fuild">
            <form>
  <div className="margin-bottom form-group">
    <input onChange={(e)=>{
        updateProduct('name',e.target.value)
    }} value={extraChargres.name } type="text" className="form-control form-control-lg"  placeholder="Charges Name"/>
  </div>

   <div className="margin-bottom form-group">
   <select onChange={(e)=>{
       console.log(e.target.value)
       updateProduct('type',e.target.value)
   }} className="form-select" aria-label="type">
  <option value="PERCENTAGE">Percentage (%)</option>
  <option value="AMOUNT">Amount</option>
</select>
  </div>
   <div className="margin-bottom form-group">
    <input type={"number"}  onChange={(e)=>{
        updateProduct('value',e.target.value)
    }} value={extraChargres.value}  className="form-control form-control-lg"  placeholder="Value"/>
  </div>
    
  
</form>
  

</div>

<div className="bottom-bar">
    <div className="text-center">
    <Button onClick={saveExtraCharges}  variant="contained">Add Charges</Button>

</div>
 </div> 

         </React.Fragment>   
    )

}
export default AddExtraCharges;