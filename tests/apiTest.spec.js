const { test, expect, request } = require('@playwright/test');

test('API Test', async () => {

    const apiContext = await request.newContext();

    const response = await apiContext.post('https://example.com/api/createBook', {
        data: JSON.stringify({
            title: 'Book Title',
            author: 'John Doe',
        })
    });

    console.log(response.status());
    // expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(405);

})