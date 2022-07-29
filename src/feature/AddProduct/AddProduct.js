import React, { useEffect, useState } from "react";
import Header from "../Header";
import Button from '@mui/material/Button';
import { setLocalStorageItem ,getLocalStorageItem } from "../../Service/Util/localstorage.service";
import debounce from "@mui/utils/debounce";
import getAllProducts from "../ProductList/productlist.service";
import { uid } from 'uid';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({data}) => {

    const [product,setProduct] = useState({});
    const  navigate = useNavigate();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(()=>{

        if(data) {
            setProduct(data)
        } else {
            let defaultProduct = {
                name:'',
                price:'',
                unit:''
            }
            setProduct(defaultProduct)
        }

    },[]);



    const updateProduct = (key,val) => {

        setProduct((preProduct)=>{
            return {
                ...preProduct,
                [key]:val
            }
        })

    }

    const _saveProduct = async() => {

        let allProducts = [];
        try {

            let data =  await getAllProducts();
            if(data) {
                allProducts = data;
            }

            allProducts.push({...product,id:uid()});

            setLocalStorageItem('products',allProducts).then((res)=>{

                const message = 'New Product Added !';
                enqueueSnackbar(message, { variant: 'success' })
                navigate('/')


    
            }).catch((err)=>{
    
            })
    



        } catch(err) {

            console.log(err)

        }

    }

    const saveProduct = debounce(_saveProduct,300)


    return (
        <React.Fragment>
            <Header data= {{name:'Add Product'}}/>
<div className="container container-fuild">
            <form>
  <div className="margin-bottom form-group">
    <input onChange={(e)=>{
        updateProduct('name',e.target.value)
    }} value={product.name } type="text" className="form-control form-control-lg"  placeholder="Product Name"/>
  </div>

  <div className="margin-bottom form-group">
    <input  onChange={(e)=>{
        updateProduct('price',e.target.value)
    }} value={product.price} type="number" className="form-control form-control-lg"  placeholder="Price"/>
  </div>
  <div className="margin-bottom form-group">
    <input  onChange={(e)=>{
        updateProduct('unit',e.target.value)
    }} value={product.unit} type="text" className="form-control form-control-lg"  placeholder="Unit (Kg , Brace , Piece etc ...)"/>
  </div>
  
  
</form>
  

</div>
<div className="bottom-bar">
    <div className="text-center">
    <Button onClick={saveProduct} variant="contained">Add Product</Button>

</div>
 </div> 

         </React.Fragment>   
    )

}
export default AddProduct;