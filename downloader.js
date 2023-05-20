const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadFolder = 'svg';

function ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
}

function downloadSvg(url, filename) {
    const filePath = path.join(downloadFolder, filename);
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`${filename} downloaded successfully.`);
        });
    }).on('error', (err) => {
        console.error(`Error while downloading ${filename}: ${err.message}`);
    });
}

fs.readFile('output.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);

        if (!Array.isArray(jsonData)) {
            console.error('Invalid JSON format in output.json. Expected an array.');
            return;
        }

        ensureDirectoryExists(downloadFolder);

        jsonData.forEach((url, i) => {
            const filename = `svg${i + 1}.svg`;
            downloadSvg(url, filename);
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
