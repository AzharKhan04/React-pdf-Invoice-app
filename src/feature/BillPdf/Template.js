import React, { useEffect, useState ,useCallback } from 'react';
import { PDFDownloadLink ,PDFViewer, Page, Text, View, Document, StyleSheet,Font } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';

const Template = ({addedProducts,extraCharges,company={}}) => {

   
const cols = [{col:'name',name:'Description',width:'55%'},{col:'price',name:"Price",width:'15%'},{col:'qty',name:'Qty',width:'15%'},{col:'total',name:"Total",width:'15%'}];
const totalcols = [{col:'',name:'',width:'55%'},{col:'',name:"",width:'15%'},{col:'total',name:'Total',width:'15%'},{col:'total',name:'t',width:'15%'}];
const extraChargesCols = [{col:'',name:'',width:'55%'},{col:'',name:"",width:'15%'},{col:'name',name:'ecname',width:'15%'},{col:'val',name:'ecval',width:'15%'}];
const grandTotalCols = [{col:'',name:'',width:'55%'},{col:'',name:"",width:'15%'},{col:'name',name:'Grand Total',width:'15%'},{col:'val',name:'gtotal',width:'15%'}];

const styles = StyleSheet.create({
  page: {  fontSize: '12px', padding:'40px' },
  header:{display:'flex',flexDirection:'row'},
  itemrow:{fontSize:'9px',marginTop:'8px',textAlign:'left'},
  cols:{fontSize:'10px',display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'},
  totalcols:{fontSize:'12px',display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'},
  
  colrow:{fontSize:'9px',marginTop:'8px',textAlign:'left'},
  totalrow:{fontSize:'9px',marginTop:'13px',display:'flex',flexDirection:'row',width:'100%',alignContent:'flex-end',alignItems:'flex-end',justifyContent:'flex-end',alignItems:'flex-end'},
  totalcolrow : {fontSize:'9px',marginTop:'14px',textAlign:'left'},

  section: { color: 'white', textAlign: 'center', margin: 30 },
  datecontainer:{textAlign:'right', width:'40%',marginBottom:'20px'},
  date:{fontSize:'10px'},
  invoice: {fontSize:'10px',marginTop:'8px'},
  company:{width:'60%',marginBottom:'20px'},
  companyName:{marginBottom:'4px',fontSize:'14px',fontWeight:'400'},
  address:{marginBottom:'4px',fontSize:'10px'},
  contact:{marginBottom:'4px',fontSize:'10px'},
  email:{marginBottom:'4px',fontSize:'10px'},

});

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


const getGrandTotal = ()=>{

  let _extraCharges =0;
  if(extraCharges && extraCharges.length) {
      extraCharges.forEach((ec)=>{

          _extraCharges = _extraCharges+getExtraCharge(ec.type,ec.value);


      })

  }

  return _extraCharges+gettotal()
   
  
}

const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;
return formattedToday
}

const getInvoiceNumber = () => {
   let inumber = ''
  if(localStorage.getItem('invoices')) {
    try {

      let i = JSON.parse(localStorage.getItem('invoices'));
      if(i && Array.isArray(i)) {
        inumber = (i.length)+1

      }
 

    } catch (err) {

      inumber = 1

    }
  }
  return inumber

}
   
return (
      <Document>
        <Page style={styles.page} size='A4' >
        <View style={styles.header}>
        <View style={styles.company}>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.address}>{company.address}</Text>
          <Text style={styles.contact}>{company.contact}</Text>
          <Text style={styles.email}>{company.email}</Text>
          <Text style={styles.email}>{company.website}</Text>

        </View>
        <View style={styles.datecontainer}>
          <Text style={styles.date}>{'Date : '}{getToday()}</Text>     
          <Text style={styles.invoice}>{'Invoice No : '}{getInvoiceNumber()}</Text>     
        </View>



     
        </View>
        
        <View style = {styles.cols}>
      {
      cols.map((col)=>{
        return (
          <View style={{...styles.colrow,width:col.width || '25%'}} >
            <Text>{col.name}</Text>
          </View>
        )
      })
    }
        </View>

        <View>
    {
      addedProducts.map((ap)=>{

        return (
<View style={styles.cols}>
  {

 cols.map((col)=>{
  return (
    <View style={{...styles.itemrow,width:col.width || '25%'}}>
      <Text >{ap[col.col]}</Text>
    </View>
  )
 })
  }

</View>
        )
        

      })
    }
        </View>

        <View style = {styles.totalcols}>


        {
      totalcols.map((tc)=>{
        if(tc.name === 't') {

          return (
            <View style={{...styles.totalcolrow,width:tc.width || '25%'}}>
              <Text>{gettotal()}</Text>
            </View>
    
          )
        } else {

          return (
            <View style={{...styles.totalcolrow,width:tc.width || '25%'}} >
              <Text>{tc.name}</Text>
            </View>
    
          )
        }
      })
    }
    </View>


    <View>
    {
      extraCharges.map((ec)=>{

        return (
<View style={styles.cols}>
  {

 extraChargesCols.map((col)=>{
  

  if(col.name === 'ecname') {

    return (
      <View style={{...styles.totalcolrow,width:col.width || '25%'}}>
        <Text>
        {ec.name} ({ec.value}{ec.type ==='PERCENTAGE'?'%':''}) 

        </Text>
      </View>

    )
  } else   if(col.name === 'ecval') {
    

    return (
      <View style={{...styles.totalcolrow,width:col.width || '25%'}} >
        <Text>{getExtraCharge(ec.type,ec.value)}</Text>
      </View>

    )
  } else {
    return (
      <View style={{...styles.totalcolrow,width:col.width || '25%'}} >
        <Text>{''}</Text>
      </View>

    )
  }
 })
  }

</View>
        )
        

      })
    }
        </View>


        <View style = {styles.totalcols}>


        {
      grandTotalCols.map((tc)=>{
        if(tc.name === 'gtotal') {

          return (
            <View style={{...styles.totalcolrow,width:tc.width || '25%'}}>
              <Text style={{fontSize:'10px',fontWeight:'500'}}>{getGrandTotal()}</Text>
            </View>
    
          )
        } else {

          return (
            <View style={{...styles.totalcolrow,width:tc.width || '25%'}} >
              <Text style={{fontSize:'10px',fontWeight:'500'}}>{tc.name}</Text>
            </View>
    
          )
        }
      })
    }
    </View>





                    
  
        </Page>
      </Document>
    )
  }

  export default Template