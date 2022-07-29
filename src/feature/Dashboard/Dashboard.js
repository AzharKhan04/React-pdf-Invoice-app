import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getLocalStorageItem } from "../../Service";
import { useNavigate } from "react-router";

const Dashboard = () => {

    const [company,setCompany] = useState(null);
    const [dataReady,setDataReady] = useState(false)
    const [ecReady,setEcReady] = useState(false);
    const [ec,setEc] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        getLocalStorageItem('company').then((res)=>{


            setCompany(res);
            setDataReady(true)
        }).catch((err)=>{
            setDataReady(true)

        })

        getLocalStorageItem('extracharges').then((res)=>{
            setEc(res)
            setEcReady(true)

        }).catch((err)=>{
            setEcReady(true)
        })
    },[])

    return (
        <React.Fragment>
                <Card >
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Company Details
        </Typography>
       {
           company ?
           <React.Fragment>
           <Typography variant="body2" color="text.secondary">
               {company.name}
         </Typography>
         <Typography variant="body2" color="text.secondary">
         {company.address}

         </Typography>
         <Typography variant="body2" color="text.secondary">
         {company.contact}

         </Typography>
         <Typography variant="body2" color="text.secondary">
         {company.email}

         </Typography>
         <Typography variant="body2" color="text.secondary">
         {company.website}

         </Typography>
         </React.Fragment> : null

       }
       {
           dataReady && !company ?
               <Button onClick={()=>{
                   navigate('/addcompany')
               }} variant="outlined">Add Company</Button> :null

       }
      </CardContent>
    </Card>

    <Card >
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
                {'Extra Charges/Discounts Details'}
        </Typography>
       {
            ec.length ?

           <React.Fragment>
               {
                   ec.map((e)=>{
                       return (
                           <React.Fragment>
                        <Typography variant="body2" color="text.secondary">
                        {e.name}
               
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {e.type}
               
                        </Typography><Typography variant="body2" color="text.secondary">
                        {e.value}
               
                        </Typography>
                        </React.Fragment>
                  
                       )
                   })
               }
          
         </React.Fragment> : null

       }
       {
           ecReady && !ec.length ? 
               <Button onClick={()=>{
                   navigate('/addextracharges')
               }} variant="outlined">Add Extra Charges</Button> : null

       }
      </CardContent>
    </Card>

    <div  className="bottom-bar">

        <div style={{display:'flex',justifyContent:'center'}}>

    <Button onClick={()=>{
        navigate('/creatinvoice')
    }} variant={'contained'}>Create New Invoice</Button>
    </div>
    </div>

        </React.Fragment>    
    )

}

export default Dashboard;