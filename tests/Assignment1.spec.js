//Q: Register a user with all details and login into the account. After login get the title of first element

const {test} = require('@playwright/test');

test('Browser - Register an account Playwright test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");

    const userName = "hamza_hasan2@gmail.com";
    const password = "India@123";

    //Click on Register
    await page.locator(".btn1").click();

    //Fill all the details
    await page.locator("#firstName").fill("Hamza");
    await page.locator("#lastName").fill("Hasan");
    await page.locator("#userEmail").fill(userName);
    await page.locator("#userMobile").fill("9876987600");
    await page.selectOption(".custom-select.ng-untouched.ng-pristine.ng-valid", {index: 3});
    await page.locator("input[value='Male']").click();
    await page.locator("#userPassword").fill(password);
    await page.locator("#confirmPassword").fill(password);
    await page.locator("input[type='checkbox']").click();
    await page.locator("#login").click();

    // get the Account Created Message
    console.log(await page.locator(".headcolor").textContent());

    //Click on Login
    await page.locator(".btn.btn-primary").click();

    //Now Login with created account
    await page.locator("#userEmail").fill(userName);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();

    //Print the first element content/text
    console.log(await page.locator(".card-body h5 b").nth(0).textContent());  

});