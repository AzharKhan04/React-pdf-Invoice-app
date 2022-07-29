const getLocalStorageItem = (key='') => {

    return new Promise((resolve,reject)=>{
    try {
        let item = localStorage.getItem(key);
        if(item &&  item!==null && typeof item === 'object' ) {
            resolve(JSON.parse(item))
        } else if(item &&  item!==null && typeof item === 'string' ) {
            resolve(JSON.parse(item))
        }  else if(item &&  item!==null && typeof item === 'number' ) {
            resolve(item)

        } else {
            reject(null)
        }

    } catch (err) {
        reject(null);
    }

    })
}

const setLocalStorageItem = (key,data) => {

    if(!key || !data) {
        throw Error('Please provide key and data')
    }

    return new Promise((resolve,reject)=>{

        try {
            if( typeof data === 'object') {
                data = JSON.stringify(data)
            }
            localStorage.setItem(key,data)
            resolve(data)
        }  catch (err) {
            reject(data);
        }
    
    })

}

export {getLocalStorageItem,setLocalStorageItem}