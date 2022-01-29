require("dotenv").config()
const axios = require('axios');
const mergeJSON = require('merge-json');
const fs = require('fs');

const doQ1 = async () => {
    
    let result1 = await getCurrencyNow();
    let result2 = await getDataFromUrl(result1.USD_IDR);
    if(!result1 || !result2){
        console.log("Error");

    }
    else{
        console.log(result1);
        console.log(result2);
    }
}
// axios.get(process.env.URL_Q1).then(resp => {
//     let response_data = resp.data;
//     let rawdata = fs.readFileSync('./file/salary_data.json');
//     let salary = JSON.parse(rawdata);
//     if(mergeJSON.isJSON(response_data)){
//        console.log("resp"); 
//     }
//     if(mergeJSON.isJSON(salary)){
//         console.log("salary"); 
//      }
//     resp.data.forEach((element,index) => {
//         let result = mergeJSON.merge(element,salary.array[index]);
//         let newAddress = ` ${result.address.street},${result.address.suite},${result.address.city},${result.address.zipcode},${result.address.geo.lat}-${result.address.geo.lng}`;
//         console.log(result);
//     });
    
    
//     // 
//     // 
// });
const getDataFromUrl = async (GetConstConvert) =>{
    try {
        let resp = await axios.get(process.env.URL_Q1);
        if (resp.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            let rawdata =  fs.readFileSync('./file/salary_data.json');
            let salary = JSON.parse(rawdata);
            let jsonArray = [];
           
            resp.data.forEach((element,index) => {
                
                let result = mergeJSON.merge(element,salary.array[index]);
                let newAddress = ` ${result.address.street},${result.address.suite},${result.address.city},${result.address.zipcode},${result.address.geo.lat}-${result.address.geo.lng}`;
                let jsonObject = new Object();
                jsonObject.id = result.id;
                jsonObject.name = result.name;
                jsonObject.username = result.username;
                jsonObject.email = result.email;
                jsonObject.address = newAddress;
                jsonObject.phone = result.phone;
                jsonObject.salaryInIDR = result.salaryInIDR;
                jsonObject.salaryInUSD = result.salaryInIDR/GetConstConvert;
                
                jsonArray.push(jsonObject)
                // console.log(index);
                // console.log(newAddress);
            });
            return jsonArray;
        }
       
        return false;
    }
    catch(err){
     console.error(err)
     return false;
    }
}
const getCurrencyNow = async () =>{
    try {
        let result = await axios.get(`${process.env.URL_CURRENCY}${process.env.CONVERT_FROM_TO}${process.env.URL_CURRENCY_ADDON}${process.env.API_KEY}`);
        if (result.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            // console.log(result);
            return result.data;
        }
        return false;
    }
    catch(err){
     console.error(err)
     return false;
    }
    
}

doQ1();
