require("dotenv").config()
const axios = require('axios');
// const mergeJSON = require('merge-json');
const groupBy = require('json-groupby')
const fs = require('fs');
const average = (array) => array.reduce((a, b) => a + b) / array.length;
const doQ2 = async () => {
    
    let rawdata = fs.readFileSync('./file/sensor_data.json');
    let dataJSON = JSON.parse(rawdata);
    
    // "temperature": 21.279782079384667,
    // "humidity": 87.2525512400796,
    // "roomArea": "roomArea1",
    // "id": 1,
    // "timestamp": 1593666000000
    let newArray = [];
    dataJSON.array.forEach(element =>{
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
    // console.log(newArray);
    let groupJson = groupBy(newArray, ['roomArea','timestamp'], ['id','timestamp','day','temperature','humidity']);
    let groupJsonRoom = groupBy(newArray, ['roomArea'], ['id','timestamp','day','temperature','humidity']);
   
    let groupJsonDay = groupBy(newArray, ['day','roomArea'], ['id','timestamp','temperature','humidity']);
    
    let arrayRoom=[];

    // for(let )

    
    let dayArray = [];
    
    for(let objJSON in groupJsonDay ){
        //Day
        // console.log(groupJsonDay[objJSON]);
        let ObjectDay = new Object();
        // let arrayRoom = new Object();
        let ObjectRoomName = new Object();
        for(let objRoomJSON in groupJsonDay[objJSON]){
                
                let ObjectRoom = new Object();
                
                ObjectRoom.id = groupJsonDay[objJSON][objRoomJSON].id;
                ObjectRoom.timestamp = groupJsonDay[objJSON][objRoomJSON].timestamp;
                let temperatureData = groupJsonDay[objJSON][objRoomJSON].temperature;
                let humidityData = groupJsonDay[objJSON][objRoomJSON].humidity;
                ObjectRoom.temperature = temperatureData;
                ObjectRoom.temperatureMin = Math.min.apply(Math,temperatureData);
                ObjectRoom.temperatureMax = Math.max.apply(Math,temperatureData);
                ObjectRoom.temperatureMed = median(temperatureData);
                ObjectRoom.temperatureAvg = average(temperatureData);

                ObjectRoom.humidity = humidityData;
                ObjectRoom.humidityMin = Math.min.apply(Math,humidityData);
                ObjectRoom.humidityMax = Math.max.apply(Math,humidityData);
                ObjectRoom.humidityMed = median(humidityData);
                ObjectRoom.humidityAvg = average(humidityData);
                ObjectRoomName[objRoomJSON] = ObjectRoom;
                // arrayRoom[objRoomJSON]=ObjectRoomName;
                
                // console.log(objRoomJSON);
               

        }
        ObjectDay[objJSON] = ObjectRoomName;
        dayArray.push(ObjectDay);
        // for(let objRoomArea in objJSON){
        //     console.log(objRoomArea);
        // }
        
        // console.log(arrayRoom);
    }
    // console.log(groupJsonDay);
    console.log(dayArray['0']);
    // console.log(groupJsonRoom.roomArea2.day);
    // console.log(objLength(groupJSON));
    // console.log(groupJSON.roomArea2.timestamp.length);
    // console.log(groupJSON.roomArea3.timestamp.length);
}
function median(values){
    if(values.length ===0) throw new Error("No inputs");
  
    values.sort(function(a,b){
      return a-b;
    });
  
    var half = Math.floor(values.length / 2);
    
    if (values.length % 2)
      return values[half];
    
    return (values[half - 1] + values[half]) / 2.0;
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

function objLength(obj){
    var i=0;
    for (var x in obj){
      if(obj.hasOwnProperty(x)){
        i++;
      }
    } 
    return i;
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

doQ2();
