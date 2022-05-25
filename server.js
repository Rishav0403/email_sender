const xlsx = require('xlsx');
const wb = xlsx.readFile("./uploads/f.xlsx", {cellDates: true});
// console.log(wb.SheetNames)

const ws = wb.Sheets["Sheet1"];
// console.log(ws)
const data = xlsx.utils.sheet_to_json(ws);
console.log(data)