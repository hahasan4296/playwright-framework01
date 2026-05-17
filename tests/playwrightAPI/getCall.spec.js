import { test, expect } from "@playwright/test"
import { request } from "node:http"

test("Test Get API", async ({ request }) => 
{
    const resp = await request.get("https://jsonplaceholder.typicode.com/posts/1");

    console.log(resp);
    

});