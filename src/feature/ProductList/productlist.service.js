import { getLocalStorageItem } from "../../Service";

const getAllProducts = () => {

 return new Promise((resolve,reject)=>{
   
    getLocalStorageItem('products').then((res)=>{
        resolve(res)

    }).catch((err)=>{
        resolve([])
    })
 })

}

export default getAllProducts;