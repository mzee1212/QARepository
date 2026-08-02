
const ExcelJs = require("exceljs");
import { test, expect } from "@playwright/test";

// This object will store the row and column number where the search text is found
let foundCellPosition = {
    row: 0,
    column: 0
};

/**
 * This function reads the Excel file, finds a specific text,
 * updates another cell in the same row, and saves the Excel file.
 */
async function updateExcelFile(searchText, replaceText, columnChange, filePath) {

    // Step 1: Create a new Excel workbook object
    const workbook = new ExcelJs.Workbook();

    // Step 2: Open/read the Excel file from the given file path
    await workbook.xlsx.readFile(filePath);

    // Step 3: Select the worksheet named "Sheet1"
    const worksheet = workbook.getWorksheet("Sheet1");

    // Step 4: Find the row and column where searchText is present
    const cellPosition = await findCellInExcel(worksheet, searchText);

    // Step 5: Select the cell that needs to be updated
    // Example:
    // If Papaya is in column 2 and price is in column 4,
    // then columnChange will be 2.
    const targetCell = worksheet.getCell(
        cellPosition.row,
        cellPosition.column + columnChange
    );

    // Step 6: Update the cell value
    targetCell.value = replaceText;

    // Step 7: Save the updated Excel file
    await workbook.xlsx.writeFile(filePath);
}

/**
 * This function searches for a text inside the Excel worksheet.
 * It returns the row and column number where the text is found.
 */
async function findCellInExcel(worksheet, searchText) {

    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, columnNumber) => {

            if (cell.value === searchText) {
                foundCellPosition.row = rowNumber;
                foundCellPosition.column = columnNumber;
            }

        });

    });

    return foundCellPosition;
}

test("file upload and download", async ({ page }) => {

    // Step 1: Go to the upload/download practice website
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");

    // Step 2: Store the file path where Excel file will be saved
    const filePath = "C:/Users/AF17PZZ/Downloads/download.xlsx";

    // Step 3: Start waiting for download before clicking download button
    const downloadPromise = page.waitForEvent("download");

    // Step 4: Click the Download button
    await page.locator("#downloadButton").click();

    // Step 5: Wait until the file is downloaded
    const download = await downloadPromise;

    // Step 6: Save the downloaded file in your local system
    await download.saveAs(filePath);

    // Step 7: Open the Excel file and update Papaya price to 350
    await updateExcelFile(
        "Papaya",  // text to search in Excel
        350,       // new value to update
        2,         // move 2 columns right from Papaya column to Price column
        filePath   // Excel file path
    );

    // Step 8: Upload the updated Excel file back to the website
    await page.locator(".upload").setInputFiles(filePath);

});
