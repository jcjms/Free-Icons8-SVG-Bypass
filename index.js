const fs = require('fs');
const puppeteer = require('puppeteer');

const outputFile = 'output.json';
let outputData = [];

if (fs.existsSync(outputFile)) {
    const existingData = fs.readFileSync(outputFile, 'utf8');
    outputData = JSON.parse(existingData);
}

if (!fs.existsSync(outputFile)) {
    fs.writeFileSync(outputFile, '[ ]');
}

console.log('Output file created. Run the script again to execute.');

async function scrapePage() {
    const browser = await puppeteer.launch({
        headless: false
    });

    // make your search faster by replacing this with something more specific (e.g. https://icons8.com/icon/set/free/ios)
    const icons8page = 'https://icons8.com/icon/';

    const page = await browser.newPage();
    await page.goto(icons8page, { waitUntil: 'networkidle0' });

    await page.waitForSelector('.app-accordion2__right-sidebar');

    const result = await page.evaluate(() => {
        return new Promise((resolve) => {
            const rightSidebar = document.querySelector('.app-accordion2__right-sidebar');
            const downloadButton = document.createElement('button');
            downloadButton.classList = 'i8-button--primary i8-button--large i8-button';
            downloadButton.innerText = 'Download Free SVG ✨';
            downloadButton.id = 'freeSVGButton';
            const referenceElement = rightSidebar.children[2];
            rightSidebar.insertBefore(downloadButton, referenceElement);

            downloadButton.addEventListener('click', () => {
                const size = '512'; // size of the svg

                const object = document.querySelector(`img[src*="img.icons8.com/?size=${size}"]`).srcset;
                const firstLink = object.split(',')[0].trim().split(' ')[0];
                const newSrcset = firstLink.replace(firstLink, firstLink.replace('format=png', 'format=svg'));
                resolve(newSrcset);
            });
        });
    });

    console.log(result);

    const resultData = {
        svg: result
    };

    outputData.push(resultData.svg);
    fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
    
    await browser.close();
}

(async () => {
    while (true) {
        await scrapePage();
    }
})();