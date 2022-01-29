require("dotenv").config()
const axios = require('axios');
const mergeJSON = require('merge-json');
const groupBy = require('json-groupby');
const fs = require('fs');
const { average,
        median } = require("../utils/utils.js")
const doQ1 = async (req,res) => {
    
    let result1 = await getCurrencyNow();
    let currencyGet ;
    if(!result1){
        result1=0;
        console.log("false0")
    }
    else {
        console.log(result1);
        currencyGet = result1.USD_IDR;
    }
    let result2 = await getDataFromUrl(currencyGet);
    if(!result2){
        return res.json({message: "Error Backend"});
    }
    else{
        
        return res.json(result2);
        
    }
}
const doQ2 = async (req,res) => {
    try{
        let rawdata = fs.readFileSync('./file/sensor_data.json');
        let dataJSON = JSON.parse(rawdata);
        
        // "temperature": 21.279782079384667,
        // "humidity": 87.2525512400796,
        // "roomArea": "roomArea1",
        // "id": 1,
        // "timestamp": 1593666000000
        let newArray = [];
        dataJSON.array.forEach(element =>{
            // getDay from DaData
            let newObj = new Object();
            newObj.temperature = element.temperature;
            newObj.humidity = element.humidity;
            newObj.roomArea = element.roomArea;
            newObj.id = element.id;
            newObj.timestamp = element.timestamp;
            let date = new Date(element.timestamp);
            newObj.day = date.getDay();
            newArray.push(newObj);
        });
        
        // let groupJson = groupBy(newArray, ['roomArea','timestamp'], ['id','timestamp','day','temperature','humidity']);
        // let groupJsonRoom = groupBy(newArray, ['roomArea'], ['id','timestamp','day','temperature','humidity']);
    
        let groupJsonDay = groupBy(newArray, ['day','roomArea'], ['id','timestamp','temperature','humidity']);
        
        
        let dayArray = [];
        
        for(let objJSON in groupJsonDay ){
            //Day
            // console.log(groupJsonDay[objJSON]);
            let ObjectDay = new Object();
            // let arrayRoom = new Object();
            let ObjectRoomName = new Object();
            for(let objRoomJSON in groupJsonDay[objJSON]){
                    
                    let ObjectRoom = new Object();
                    
                    // ObjectRoom.id = groupJsonDay[objJSON][objRoomJSON].id; //array
                    // ObjectRoom.timestamp = groupJsonDay[objJSON][objRoomJSON].timestamp; //array
                    let temperatureData = groupJsonDay[objJSON][objRoomJSON].temperature;
                    let humidityData = groupJsonDay[objJSON][objRoomJSON].humidity;
                    // ObjectRoom.temperature = temperatureData; //array
                    ObjectRoom.temperatureMin = Math.min.apply(Math,temperatureData);
                    ObjectRoom.temperatureMax = Math.max.apply(Math,temperatureData);
                    ObjectRoom.temperatureMed = median(temperatureData);
                    ObjectRoom.temperatureAvg = average(temperatureData);

                    // ObjectRoom.humidity = humidityData; //array
                    ObjectRoom.humidityMin = Math.min.apply(Math,humidityData);
                    ObjectRoom.humidityMax = Math.max.apply(Math,humidityData);
                    ObjectRoom.humidityMed = median(humidityData);
                    ObjectRoom.humidityAvg = average(humidityData);
                    ObjectRoomName[objRoomJSON] = ObjectRoom;
                    
                

            }
            ObjectDay[objJSON] = ObjectRoomName;
            dayArray.push(ObjectDay);
        
        }
        return res.json(dayArray);
    }
    catch(err){
        return res.json({message: err});
    }
    
   
    
    
}
const getDataFromUrl = async (GetConstConvert) =>{
    try {
        let resp = await axios.get(process.env.URL_Q1);
        if (resp.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            let rawdata =  fs.readFileSync('./file/salary_data.json');
            let salary = JSON.parse(rawdata);
            let jsonArray = [];
           
            resp.data.forEach((element,index) => {
                
                let result = mergeJSON.merge(element,salary.array[index]);
                let newAddress = ` ${result.address.street},${result.address.suite},${result.address.city},${result.address.zipcode},${result.address.geo.lat};${result.address.geo.lng}`;
                let jsonObject = new Object();
                jsonObject.id = result.id;
                jsonObject.name = result.name;
                jsonObject.username = result.username;
                jsonObject.email = result.email;
                jsonObject.address = newAddress;
                jsonObject.phone = result.phone;
                jsonObject.salaryInIDR = result.salaryInIDR;
                if(GetConstConvert==undefined){
                    // console.log("GetConstConvert0");
                    jsonObject.salaryInUSD = 0;
                }
                else{
                    
                    jsonObject.salaryInUSD = result.salaryInIDR/GetConstConvert;
                    // console.log("GetConstConvertGet");
                }
                
                
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
        if (result.status === 400) { // response - object, eg { status: 200, message: 'OK' }
            // console.log(result);
            return result.data.error;
        }
        return false;
    }
    catch(err){
     return false;
     console.error("err")
     
    }
    
}

module.exports = {
    doQ1,
    doQ2
}
