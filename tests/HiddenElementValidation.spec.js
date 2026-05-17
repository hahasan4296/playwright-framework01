const {test, expect} = require('@playwright/test');

test('Hidden Element Validation', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();

    //assertion to check element is visible or not
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //Automate Alert Popup
    // page.on('dialog',dialoge => dialoge.accept());
    page.on('dialog',dialoge => dialoge.dismiss());
    await page.locator("#confirmbtn").click();

    // Mouse Hovver
    await page.locator("#mousehover").hover();

    //Frame Handling
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible") .click();

    const textContent = await framePage.locator(".text h2").textContent();
    console.log(textContent.split(" ")[1]);
    
    // await page.pause()
});