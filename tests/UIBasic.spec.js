const {test,expect}= require('@playwright/test');

test.only('Browser Context Test',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const username=page.locator('#username');
    const password=page.locator("[type='password']");
    const signInBtn=page.locator('#signInBtn');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await username.fill('dsad');
    await password.fill('sadsd');
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText("Inv");

    await username.fill('');
    await password.fill('');
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await signInBtn.click();
    console.log(await page.locator('.card-body a').nth(0).textContent());
    console.log(await page.locator('.card-body a').first().textContent());
    
});

test('Page Test',async ({page})=>{
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
    // await page.locator('#checkBoxOption1').check().should.be.checked;
    // await page.locator('#checkBoxOption1').uncheck().should.not.be.checked;
    // await page.locator('input[type="checkbox"]').check(['option2','option3']);
});