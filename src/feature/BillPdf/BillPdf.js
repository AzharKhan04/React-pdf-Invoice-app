import React from 'react';
import { PDFDownloadLink ,PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import Template from './Template';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      height:'100%'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  
const BillPdf = () => {

  const _addedProducts = useSelector((state)=>state.addedProducts);

    return (
      <React.Fragment>
          <div style={{ flexGrow: 1 }}>
      {/* <PDFViewer
        showToolbar={false}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Template addedProducts = {_addedProducts} />
      </PDFViewer> */}
      <PDFDownloadLink
        document={<Template addedProducts = {_addedProducts}  />}
        fileName='bil.pdf'
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
    </div>


  </React.Fragment>
    )

}




export default BillPdf;