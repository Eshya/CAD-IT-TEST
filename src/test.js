const axios = require('axios');
const mergeJSON = require('merge-json');
const fs = require('fs');
axios.get('http://jsonplaceholder.typicode.com/users').then(resp => {
    let response_data = resp.data;
    let rawdata = fs.readFileSync('./file/JSON_Files/salary_data.json');
    let salary = JSON.parse(rawdata);
    if(mergeJSON.isJSON(response_data)){
       console.log("resp"); 
    }
    if(mergeJSON.isJSON(salary)){
        console.log("salary"); 
     }
    resp.data.forEach(element => {
        let result = mergeJSON.merge(element,salary.array[0]);
        console.log(result);
    });
    // 
    // 
});


