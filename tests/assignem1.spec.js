const {test,expect}= require('@playwright/test');

test('Assignment 1 Test',async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/auth/login');
    await page.locator('.btn1').click();
    await page.locator('#firstName').fill('Utkarsha');
    await page.locator('#lastName').fill('Nikam');
    await page.locator('#userEmail').fill('utkarshanikam9@gmail.com');
    await page.locator('#userMobile').fill('7020853165');
    await page.locator('#userPassword').fill('Utkarsha@123');
    await page.locator('#confirmPassword').fill('Utkarsha@123');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('#login').click();
    await page.locator('.text-reset').click();
    await page.locator('#userEmail').fill('');
    await page.locator('#userPassword').fill('');
    await page.locator('#userEmail').fill('utkarshanikam9@gmail.com');
    await page.locator('#userPassword').fill('Utkarsha@123');
    await page.locator('#login').click();

    // networks comes idle after login and then we can wait for the elements to be visible
    await page.waitForLoadState('networkidle');
    // Witfor worked for the one element but not for the second one, so we can use waitFor for the first element and then use it for the second element
    await page.locator('.card-body b').first().waitFor();

    console.log(await page.locator('.card-body b').allTextContents());
});