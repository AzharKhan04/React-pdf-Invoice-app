import React, { useCallback, useEffect, useState } from "react";
import Product from "../../Component/Product";
import getAllProducts from "./productlist.service";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageItem } from "../../Service/Util/localstorage.service";
import { Document, Page, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import BillPdf from "../BillPdf/BillPdf";
import { View, Text } from '@react-pdf/renderer'
import { useNavigate } from 'react-router-dom';
import Template from '../../feature/BillPdf/Template';
import { setLocalStorageItem } from "../../Service/Util/localstorage.service";

const ProductList = () => {

    const [products,setProducts] = useState([]);

    const [extraCharges,setExtraCharges] = useState([]);
    const [company,setCompany] = useState({})

   const addedProducts =  useSelector((state)=>state.addedProducts)
   const dispatch = useDispatch()
   const navigate = useNavigate();



    useEffect(()=>{
        getProducts();
        getExtrChargesaDetails();
        getCompany();
    },[]);



    useEffect(()=>{

        let newAddedProducts = [];

        products.forEach((p)=>{
            if(p.isAdded) {
                newAddedProducts.push(p)
            }            
        })
        dispatch({type:'ADDED_PRODUCTS',payload:newAddedProducts})


    },[products]);

    const getExtrChargesaDetails = () => {

        getLocalStorageItem('extracharges').then((res)=>{

            setExtraCharges(res);

        }).catch((err)=>{

        })
    }

    const  getProducts = () => {

        getAllProducts().then((res)=>{
            setProducts(res)
        }).catch((err)=>{
        })
    }

    const onAddProduct =(productId,data) => {

        let newProducts = products.map((p)=>{
            if(p.id === productId) {
                p.isAdded=true
                p.total = (p.qty*p.price)
            }
            return p
        });
        setProducts(newProducts);
    }

    const onChange = (key,productId,val) => {

        let newProducts = products.map((p)=>{
            if(p.id===productId) {
                p[key] = val
            }
            return p;
        })

        setProducts(newProducts);
    }

    const onRemoveProduct = (productId) => {

        let newProducts = products.map((p)=>{
            if(p.id === productId) {
                p.isAdded=false
            }
            return p
        });
        setProducts(newProducts);

    }

    const gettotal = useCallback(()=>{



        if(!addedProducts) {
            return null
        }

        let total = 0;

        addedProducts.forEach((ap)=>{

            let _price = Number(ap.price)

            if(isNaN(_price)) {
                return null
            }

            let _qty = Number(ap.qty)

            if(isNaN(_qty)) {
                return null
            }

            total = total+(_price*_qty)



        })

        return total

    },[addedProducts]);

    const getGrandTotal = ()=>{

        let _extraCharges =0;
        if(extraCharges && extraCharges.length) {
            extraCharges.forEach((ec)=>{

                _extraCharges = _extraCharges+getExtraCharge(ec.type,ec.value);


            })

        }

        return _extraCharges+gettotal()

        
        
            
            
        
    }

    const addInvoice = () =>{

        getLocalStorageItem('invoices').then((res)=>{

            if(res) {
                res.push(...addedProducts)
                setLocalStorageItem('invoices',res)
            } else {
                setLocalStorageItem('invoices',addedProducts)

            }

        }).catch((err)=>{
            setLocalStorageItem('invoices',addedProducts)

        })
    }

    const getExtraCharge = (type,val) => {

        switch (type) {
            case 'PERCENTAGE':
            return (gettotal()*Number(val))/100;
            case 'AMOUNT':
                return val
            default:
                return 0;

        }

    }

    const getCompany = () => {
        getLocalStorageItem('company').then((res)=>{
            setCompany(res)
        })
    }

    return (
        <React.Fragment>
            {
                <div style={{display:'flex',justifyContent:'right'}}>
                <Button onClick={()=>{
                    navigate('/addproduct')
                }} variant="contained">Add New Product</Button>
                </div>

            }
            
            {
                products && products.length ?
                products.map((product,index) => {
                    return (
                        <div key = {product.id || index}>
                            <Product onRemoveProduct = {onRemoveProduct} onChange={onChange} onAddProduct={onAddProduct} data = {product}/>
                         </div>   
                    )
                }) : null
            }
            {
                products && !products.length &&
                <div className="center-div">{'No Products Found '}</div>
            }
            {
                  addedProducts && addedProducts.length ?
                <div style={{lineHeight:'28px',bottom:0,position:'fixed',padding:'12px',backgroundColor:"#f8f9fa",width:'100%'}} >
                   
                   <div style={{display:'flex',justifyContent:'space-between'}}>

                   <div>
                            {'Total'}
                         </div>
                         <div>
                             <div>
                                 <span>&#8377;</span>
                                 {gettotal()}</div>


                          </div>   

                    </div>   

                    {
                        extraCharges && extraCharges.length ?
                        extraCharges.map((ec,i)=>{

                            return (
                                <div key={ec.id||i} style={{display:'flex',justifyContent:'space-between'}}>

                                <div>
                                         {ec.name} ({ec.value}{ec.type ==='PERCENTAGE'?'%':''}) 
                                      </div>
                                      <div>

                                          {getExtraCharge(ec.type,ec.value)}
                                
                                
                                       </div>   
                                
                                 </div>
                            )



                        })
                       
                        : null
                        
                    }


                   <div style={{display:'flex',justifyContent:'space-between'}}>

<div>
         {'Grand Total'}
      </div>
      <div>
          <strong>
              <span>&#8377;</span>
              {getGrandTotal()}</strong>


       </div>   

 </div> 
                   
                    <div style={{display:'flex',justifyContent:'center'}}>
                    

                    <div style={{display:'flex',justifyContent:'center'}}>
                        {
                            gettotal() ?


                            <PDFDownloadLink
                            document={<Template addedProducts = {addedProducts} extraCharges ={extraCharges} company = {company}  />}
                            fileName='bil.pdf'
                          >
                            {({ loading }) => (loading ? 'Loading document...' :            
<Button onClick={()=>{
   addInvoice() 
}}   variant = {'outlined'} size="large">
    {"Generate Bill"}
</Button>)}
                          </PDFDownloadLink>
          :null
                        }

   </div> 



                     </div>    
                    </div> : null
            }
           

        
        </React.Fragment>    
    )

}
  

export default ProductList;