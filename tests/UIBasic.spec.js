const {test,expect}= require('@playwright/test');

test('Browser Context Test',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.rahulshettyacademy.com/AutomationPractice/');
    console.log(await page.title());

});

test.only('Page Test',async ({page})=>{
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
    // await page.locator('#checkBoxOption1').check().should.be.checked;
    // await page.locator('#checkBoxOption1').uncheck().should.not.be.checked;
    // await page.locator('input[type="checkbox"]').check(['option2','option3']);
});