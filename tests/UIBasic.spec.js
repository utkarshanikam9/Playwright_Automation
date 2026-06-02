const {test,expect}= require('@playwright/test');

test.only('Browser Context Test',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await page.locator('#username').fill('dsad');
    await page.locator("[type='password']").fill('sadsd');
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Inv");

});

test('Page Test',async ({page})=>{
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
    // await page.locator('#checkBoxOption1').check().should.be.checked;
    // await page.locator('#checkBoxOption1').uncheck().should.not.be.checked;
    // await page.locator('input[type="checkbox"]').check(['option2','option3']);
});