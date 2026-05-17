const {test, expect} = require('@playwright/test');

test('Browser Context-Validating Error Login', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    // abort intercept - block css link/url
    // page.route('**/*.css', route => route.abort());

    //block jpg,png or jpeg - image link
    // page.route('**/*.{jpg,png,jpeg}', route => route.abort());

    const username = page.locator('#username')
    const password = page.locator('#password')
    const signIn = page.locator('#signInBtn')
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(page.title());
    
    // //request through playwright each request/response and print in o/p
    page.on('request',request => console.log(request.url()))
    page.on('response',response => console.log(response.url(), response.status()))

    //CSS
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2")
    await signIn.click();
    await page.pause();
   
    
    
});
