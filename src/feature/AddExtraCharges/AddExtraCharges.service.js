import { getLocalStorageItem } from "../../Service";

const getAllExtraCharges = () => {

 return new Promise((resolve,reject)=>{
   
    getLocalStorageItem('extracharges').then((res)=>{
        resolve(res)

    }).catch((err)=>{
        resolve([])
    })
 })

}

export default getAllExtraCharges;