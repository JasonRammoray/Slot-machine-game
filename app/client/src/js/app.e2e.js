const puppeteer = require('puppeteer');
const assert = require('assert');
const btn = '.game__start-btn';
/*
 * Scenario:
 * 1. User opens a page
 * 2. User clicks on a trigger button
 * 3. User waits for 5 seconds
 * 4. User can see one of four outcomes: No Win, Small Win,
 * Big Win or Bonus move available!
 */
(async () => {
    console.log('Running e2e scenario');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    console.log('Navigated to a page');
    await page.waitForSelector(btn);
    await page.click(btn);
    console.log('Clicked on a button');
    await page.waitFor(5000);
    console.log('Waited for 5 seconds');
    const textOutcome = await page.evaluate(
        () => document.querySelector('.game__output').textContent
    );
    console.log('Outcome is: ', textOutcome);
    const outcomes = [
        'Big Win',
        'No Win',
        'Small Win',
        'Bonus move available!'
    ];
    assert(outcomes.includes(textOutcome), true);
    await browser.close();
})();
