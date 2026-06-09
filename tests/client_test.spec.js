const { test, expect } = require('@playwright/test');

test.only('Client Test', async ({ page }) => {

    const product = page.locator('.card-body');
    const productName = 'ZARA COAT 3';
    const table_Prodcut = page.locator('tbody tr');

    await page.goto('https://rahulshettyacademy.com/client/auth/login');
    await page.locator('#userEmail').fill('utkarshanikam9@gmail.com');
    await page.locator('#userPassword').fill('Utkarsha@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');

    const count = await product.count();

    for (let i = 0; i < count; i++) {
        if (await product.nth(i).locator('b').textContent() === productName) {
            await product.nth(i).locator('text=add to cart').click();
            break;// when we find the product we want to add to cart we should break the loop otherwise it will keep on adding the same product to cart and it will fail the test case because of that.
        }
    }

    await page.locator('[routerlink="/dashboard/cart"]').click();
    page.locator('div li').first().waitFor();
    const bool = await page.locator(`h3:has-text("${productName}")`).isVisible();
    await expect(bool).toBeTruthy();
    await page.locator('text=Checkout').click();

    // await page.locator('[placeholder="Select Country"]').type('ind',{delay:100});
    await page.locator('[placeholder="Select Country"]').pressSequentially('ind', { delay: 100 });
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();

    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator('button').nth(i).textContent();

        if (text.includes('India')) // we can also use includes instead of === because in the dropdown there is a space before the country name.
            if (text === ' India') // there is a space before India because in the dropdown there is a space before the country name.
            {
                await dropdown.locator('button').nth(i).click();
                break;
            }
    }

    await expect(page.locator('.user__name [type="text"]').first()).toHaveText('utkarshanikam9@gmail.com');
    await page.locator('.btnn').click();

    await expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ');
    const id = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(id);

    await page.locator('li [routerlink="/dashboard/myorders"]').click();
    await page.locator('tbody').waitFor();

    const row_Count = await table_Prodcut.count();
    console.log(row_Count);

    for (let i = 0; i < row_Count; i++) {
        const row_Id = await table_Prodcut.nth(i).locator('th').textContent();

        console.log(`Checking Row ID: ${row_Id}`);

        if (id.includes(row_Id)) {
            console.log(`Match Found: ${row_Id}`);
            await table_Prodcut.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(id.includes(orderIdDetails)).toBeTruthy();
    await page.pause();


});