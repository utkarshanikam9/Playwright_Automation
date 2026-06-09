const {test,expect}= require('@playwright/test');
const { log } = require('node:console');

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


test('UI Controls',async ({page})=>{
    const username=page.locator('#username');
    const password=page.locator("[type='password']");
    const signInBtn=page.locator('#signInBtn');
    const dropdown=page.locator('select.form-control');
    const documentLink=page.locator('a[href*="documents-request"]');

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

    await expect(documentLink).toHaveAttribute('class','blinkinText');
    // await page.pause();
    // await signInBtn.click();

});

test.only('child window handling',async({browser})=>{
    
    const context = await browser.newContext();   
    const page = await context.newPage();
    const username=page.locator('#username');
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const documentLink=page.locator('a[href*="documents-request"]');
    
    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text=await newpage.locator('.red').textContent();
    
    const arr=text.split('@');
    const domain=arr[1].split(' ')[0];
    console.log(domain);

    newpage.close();

    await username.fill(domain);
    await page.pause();


});