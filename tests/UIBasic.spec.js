const {test,expect}= require('@playwright/test');

test('Browser Context Test',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const username=page.locator('#username');
    const password=page.locator("[type='password']");
    const signInBtn=page.locator('#signInBtn');
    const cardTitles=page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await username.fill('dsad');
    await password.fill('sadsd');
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText("Inv");

    //4.17
    await username.fill('');
    await password.fill('');
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await signInBtn.click();

    //4.18
    console.log(await cardTitles.nth(0).textContent());
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.allTextContents());
    
});


test.only('UI Controls',async ({page})=>{
    const username=page.locator('#username');
    const password=page.locator("[type='password']");
    const signInBtn=page.locator('#signInBtn');
    const dropdown=page.locator('select.form-control');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    expect(page.locator('.radiotextsty').last()).toBeChecked();
    console.log(await page.locator('.radiotextsty').last().isChecked());

    await page.locator('#terms').check();
    expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(page.locator('#terms')).not.toBeChecked();
    console.log(await page.locator('#terms').isChecked());

    // await page.pause();
    // await signInBtn.click();

});