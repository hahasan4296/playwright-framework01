const {test, expect} = require('@playwright/test')

test('Amazon Login', async ({page})=>{

await page.goto("https://www.amazon.in/")
await page.getByText("Hello, sign in").click()
await page.locator("#ap_email_login").fill("hamza123@gmail.com")
await page.getByRole("button", {"name":"Continue"}).click()
await page.locator("#ap_password").fill("12345")
await page.getByRole("button", {"name":"Sign in"}).click()

//validation
await expect(page.getByText("Your password is incorrect")).toContainText('Your password is incorrect')

})

test('Google Title', async ({page})=>{

await page.goto("https://www.google.com/")
console.log(await page.title());
})
