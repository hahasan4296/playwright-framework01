const {test, expect} = require('@playwright/test')

test('Practice GET BY Locators', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //Get By Label 
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    //getByLabel used as input - when input tag inside the label tag
    // await page.getByLabel("Password").fill("abc123");

    // Get By Placeholder
    await page.getByPlaceholder("Password").fill("abc123");

    // Get By Role
    await page.getByRole("button", {name:'Submit'}).click();

    // Get By Text
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link",{name:'shop'}).click();

    // find the element in child/second page using - "filter" (also called chaining)
    await page.locator("app-card").filter({hasText: 'Samsung Note 8'}).getByRole("button").click();


    // await page.pause();

    
})