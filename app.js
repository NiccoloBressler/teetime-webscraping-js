const puppeteer = require('puppeteer')

async function scrapeCourse(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);


    
    await browser.close();
}

scrapeCourse('https://www.golfnow.com/tee-times/facility/3130-heritage-isles-golf-country-club/search#sortby=Date&view=Grouping&holes=3&timeperiod=3&timemax=42&timemin=10&players=0&pricemax=10000&pricemin=0');