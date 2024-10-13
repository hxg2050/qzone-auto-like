import puppeteer, { Page } from "puppeteer-core";
import { imageServer } from "./imageServer";
import { env, sleep } from "bun";

console.log(env.CHROME_PATH);
const browser = await puppeteer.launch({
    executablePath: env.CHROME_PATH,
    headless: env.HEADLESS === 'true',
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ],
});

const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://i.qq.com/');
console.log('https://i.qq.com/');

// Set screen size.
await page.setViewport({ width: 1080, height: 1024 });
// 等待登陆iframe出现
await page.waitForSelector('#login_frame');
const iframe = (await page.frames())[1];
console.log(iframe.url());
await sleep(1 * 1000);
const img = await iframe.waitForSelector('#qrlogin_img');
// const src = await iframe.evaluate(el => el?.getAttribute('src'), img);
const imgUrl = await img!.screenshot({
    encoding: 'base64',
});
const stopServer = imageServer(`data:image/png;base64,${imgUrl}`);
await page.waitForNavigation({
    timeout: 0
});
stopServer();

const myPage = await page.waitForSelector('#aIcenter');
myPage!.click();
console.log(page.url());
// await page.waitForNavigation({ waitUntil: 'networkidle2' })

const friend = await page.waitForSelector('#tab_menu_friend');
friend!.click();
// await page.waitForNavigation({ waitUntil: 'networkidle2' })
console.log(page.url());

// await page.reload();
console.log('跳转到个人主页');


const autoLike = async (page: Page) => {
    try {
        await sleep(1000);
        await page.reload();
        await sleep(10000);
        await page.screenshot({
            path: 'page.png'
        })
        console.log('准备点赞');
        const likeBtns = await page.$$('a[class="item qz_like_btn_v3 "]');
        console.log('需要点赞的数量', likeBtns.length);
        for (let i = 0; i < likeBtns.length; i ++) {
            await sleep(1000);
            likeBtns[i].click();
        }
    } catch (e) {
        console.log('超时');
    } finally {
        setTimeout(() => {
            autoLike(page)
        }, 60 * 1000);
    }
}
autoLike(page);
// console.log(likeBtns.toString());
// page.evaluate(val => {
//     console.log(val?.innerHTML);
// }, likeBtns)

// await browser.close();