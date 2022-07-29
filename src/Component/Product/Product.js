import React from "react";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import './index.css';

const Product = ({data,onChange,onAddProduct,onRemoveProduct}) => {

    return (
        <React.Fragment>
            <div style={{backgroundColor:data.isAdded?'#f8f9fa':'white'}} className="product-root">
            <div className="row">
            <div className="col col-8">
                <Typography variant="subtitle1" display="block" gutterBottom>
                    {data.name}
                </Typography>
            </div> 
            <div className="col col-4">
                {
                    !(data.isAdded) ? 
                    <Button onClick={()=>{

                        if((data.qty && data.price)) {
                            onAddProduct(data.id,data)
                        }

                    }} variant="outlined">Add</Button> : null
        
                }
                {
                    (data.isAdded) ?

            <Button  onClick={()=>{
                onRemoveProduct(data.id,data)
            }} color="error" variant="outlined">X</Button> : null

                }

            </div>    
            </div>
            <div className="margin-bottom row">
            <div className="col col-6">
            <input disabled = {data.isAdded} value={data.price} onChange={(e)=>{
                onChange('price',data.id,e.target.value)
            }} className="form-control" type="number" placeholder="Price" />

            </div>    
            </div>
            <div className="row">
            <div className="col col-6">
            <input disabled = {data.isAdded}  onChange={(e)=>{
                onChange('qty',data.id,e.target.value)
            }} value ={data.qty} className="form-control" type="number" placeholder="Qty" />

            </div>    
            </div>
            </div>
            

        </React.Fragment>    
    )

}

export default Product;