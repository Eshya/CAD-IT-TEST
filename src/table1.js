const salaryDivTable = document.querySelector("div.tableboard1") // Find the table div in our html scoreDivSim
let tableHeadersSalary = ["ID","Name","Username","Email","Address","Phone","Salary in IDR","Salary in USD"]; //tableHeadersSim 
const createTableHeader = () =>{
    while (salaryDivTable.firstChild) salaryDivTable.removeChild(salaryDivTable.firstChild)
    let salaryBoardTable = document.createElement('table') // Create the table itself salaryBoardTable
    salaryBoardTable.className = 'salaryboardTable'
    let salaryBoardTableHead = document.createElement('thead') // Creates the table header group element
    salaryBoardTableHead.className = 'salaryBoardTableHead'
    let salaryBoardTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
    salaryBoardTableHeaderRow.className = 'salaryBoardTableHeaderRow'
    tableHeadersSalary.forEach(header => {
    let salaryHeader = document.createElement('th') // Creates the current header cell during a specific iteration
      salaryHeader.innerText = header
      salaryBoardTableHeaderRow.append(salaryHeader) // Appends the current header cell to the header row
    })
    salaryBoardTableHead.append(salaryBoardTableHeaderRow) // Appends the header row to the table header group element
    salaryBoardTable.append(salaryBoardTableHead)
    let salaryBoardTableBody = document.createElement('tbody') // Creates the table body group element
    salaryBoardTableBody.className = "salaryboardTable-Body"
    salaryBoardTable.append(salaryBoardTableBody) // Appends the table body group element to the table
    salaryDivTable.append(salaryBoardTable) // Appends the table to the data div
    
}
const appendData = (Data_In) => {
   
      const salaryBoardTable2 = document.querySelector('.salaryboardTable') // Find the table we created
      let salaryBoardTableBodyRow = document.createElement('tr') // Create the current table row
      salaryBoardTableBodyRow.className = 'salaryBoardTableBodyRow'
      //let tableHeadersSalary = ["ID","Name","Username","Email","Address","Phone","Salary in USD"];

      let tablenid = document.createElement('td')
      tablenid.innerText = Data_In.id
      let tableName = document.createElement('td')
      tableName.innerText = Data_In.name
      let tableUsername = document.createElement('td')
      tableUsername.innerText = Data_In.username
      let tableEmail = document.createElement('td')
      tableEmail.innerText = Data_In.email
      let tableAddress = document.createElement('td')
      tableAddress.innerText = Data_In.address
      let tablePhone = document.createElement('td')
      tablePhone.innerText = Data_In.phone
     
      let tableIdr = document.createElement('td')
      tableIdr.innerText = commaSeparateNumber(Data_In.salaryInIDR)
      let tableUsd = document.createElement('td')
      tableUsd.innerText = Data_In.salaryInUSD==0 ? "API LIMIT" :commaSeparateNumber(Data_In.salaryInUSD);
  
  
      salaryBoardTableBodyRow.append(tablenid,tableName, tableUsername,tableEmail,tableAddress,tablePhone,tableIdr,tableUsd) // Append all  cells to the table row
      salaryBoardTable2.append(salaryBoardTableBodyRow) // Append the current row to the data table body    
      
}
function commaSeparateNumber(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
}
setInterval(function(){
    // e.stopPropagation();
    
      
    main();
    
  
   },60000);
  
  function main(){
    $.ajax({
      type: "GET",
      contentType : "application/json",
      url: "http://localhost:5000/api/q1",
      success: function(result){
          createTableHeader();
          for (const getData of result) {
              appendData(getData);
          }
          
          console.log(result);
      },
      dataType : "json"
      
      })
  }
  main();
