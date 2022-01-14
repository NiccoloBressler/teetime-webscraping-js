const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function scrapeCourse(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const times = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#hot-deal-zone > div > div > time > div')).map(x => x.textContent);
    });
    await fs.writeFile('teetimes.txt', times.join('\r\n'));
    
    await browser.close();
}

scrapeCourse('https://www.golfnow.com/tee-times/facility/3130-heritage-isles-golf-country-club/search#sortby=Date&view=Grouping&holes=3&timeperiod=3&timemax=42&timemin=10&players=0&pricemax=10000&pricemin=0&exploretoggle=false');