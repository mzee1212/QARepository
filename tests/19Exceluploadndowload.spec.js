const ExcelJs = require('exceljs');
import{test,expect} from "@playwright/test"


//ExcelJS is a class now to access workbook from the class we creat an object of it

//we need to wrap this code in a function becuase we need to put await and async

let output = { row: 2, column: 2 }

//change is a obj property

async function writefileexcel(serachText,replaceText,change,filepath) {

   //1. Create  an object of excelJs
   const workbook = new ExcelJs.Workbook();

   // 2 select the path of excel
   await workbook.xlsx.readFile(filepath)

   //3 select the worksheet you want to work
   const worksheet = workbook.getWorksheet('Sheet1');

   //call the readfile method
   const output = await readfileexcel(worksheet,serachText)

   const cell = worksheet.getCell(output.row, output.column+change.columnchnage);
   cell.value = replaceText;
   await workbook.xlsx.writeFile(filepath)
}


async function readfileexcel(worksheet,searchText)
{
   worksheet.eachRow((row, rowNumber) => {

      //5 select the cell of the each row you want to work
      row.eachCell((cell, colNumber) => {


         if (cell.value === searchText) {
            output.row = rowNumber;
            output.column = colNumber;

         }


      })
   })
   return output;
}


//since we are realicng the vlaues of couln Pric for Papaya hence we have coulmchnage as :2 i.e +2 from row appaya as price is in coulmn 4


test ("file upload and download", async({page})=>
{


    await page.goto("https://rahulshettyacademy.com/upload-download-test/");

    //before we click on dowload we need to make sure that waits until downloading is completed
    const downlaodpromise = page.waitForEvent('download')
    await page.locator("#downloadButton").click();
    const download= await downlaodpromise
    await download.saveAs("C:/Users/AF17PZZ/Downloads/download.xlsx");
   await writefileexcel("Papaya",350,{rowchnage:0,columnchnage:2},"C:/Users/AF17PZZ/Downloads/download.xlsx");
   await page.locator(".upload").click();
    await page.pause();

   await page.locator(".upload").setInputFiles("C:/Users/AF17PZZ/Downloads/download.xlsx")
  

});

