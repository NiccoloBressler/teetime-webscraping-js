const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function scrapeCourse(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    // Returns times in new file
    const times = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#ttresults > section.search-results.location.content > div > section > a > time')).map(x => x.textContent);
    });

    await fs.writeFile('teetimes.txt', times.join('\r\n'));
    
    // Returns prices in new file
    const prices = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#ttresults > section.search-results.location.content > div > section > a > div > p.price')).map(x => x.textContent);
    });

    await fs.writeFile('prices.txt', prices.join('\r\n'));

    // Returns player slots in new file
    const players = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#ttresults > section.search-results.location.content > div > section > a > div > p.tt-detail > span.golfers-available')).map(x => x.textContent);
    });

    await fs.writeFile('players.txt', players.join('\r\n'));

    await browser.close();
}

scrapeCourse('https://www.golfnow.com/tee-times/facility/3130-heritage-isles-golf-country-club/search#sortby=Date&view=Grouping&holes=3&timeperiod=3&timemax=42&timemin=10&players=0&pricemax=10000&pricemin=0&exploretoggle=false');