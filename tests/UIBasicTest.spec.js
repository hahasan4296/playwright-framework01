const {test, expect} = require('@playwright/test');

test('Browser Context Playwright Test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username')
    const password = page.locator('#password')
    const signIn = page.locator('#signInBtn')
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(page.title());
    
    //CSS
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2")
    await signIn.click();
    
});


// test('Browser Context Playwright Test', async ({browser}) =>
// {  
//     // Chrome-plugin/cookies
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://www.amazon.in/")
    
// });

// test('Page Playwright test', async ({page}) =>
// {
//     await page.goto("https://www.google.com/")
//     // get title - assertion
//     console.log(await page.title())
//     await expect(page).toHaveTitle('Google')
// });