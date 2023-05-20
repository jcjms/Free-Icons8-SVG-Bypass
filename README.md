# Free Icons8 SVG Bypass

Okokok, hear me out. All of this is public information, and I'm not doing anything illegal by providing this code (just in case: this code is for educational purposes only). Nobody likes paying for stuff, especially not icons. I know designers put a lot of effort into them, but if I create an application for myself only, then I don't want to pay for them. Please pay for them, if you create a public application 👍. I know this code isn't the cleanest, and you could definitely work on the functionality, but... hey, it works. Basically, what I'm doing here is taking the element where the example image is displayed and extracting the example image link (e.g., https://img.icons8.com/?size=512&id=4JymVE43V07f&format=png). Then, I'm replacing the format with SVG and the size with my desired size, and BOOM, there it is. Now, saving everything to a JSON file, and we're done. Cool. This is probably going to be fixed soon, but exploit it as long as it works (no legal advice, remember educational purposes only).

## Run Instructions

1. Ensure you have Node.js installed on your system.
2. Download or clone the code from the repository.
3. Open a terminal or command prompt.
4. Navigate to the directory where the code files (`index.js` and `downloader.js`) are saved.
5. Install the required dependencies by running the command: `npm install`
6. Run the code using the command: `node index.js`
7. Then run the command: `node downloader.js` to download the collected SVGs. They will be saved in the specified output directory (`svg`).

**Note:** Please use this code responsibly and respect the rights and licenses of designers.