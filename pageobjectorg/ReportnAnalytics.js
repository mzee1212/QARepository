class ReportnAnalytics
{


    constructor(page)
    {
        this.page =page;
        await page.locator("#ohrm-small-logo").waitFor();
   await page.locator("div #menu_item_316").nth(0).click();
   await page.locator(".table-header-action-btns").waitFor();
   await page.getByText("New Report").click();

   //select Report type

   await page.locator(".oxd-icon").nth(1).click();
   //await page.pause();
   await page.getByText("General Recruitment Overview Report").click();

    }

}