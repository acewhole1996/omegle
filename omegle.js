const puppeteer = require("puppeteer");
const sound = require("sound-play");
var userAgent = require("user-agents");
const PAGE_URL = "https://omegle.com"; 
const Category = "#topicsettingscontainer > div > div.topictageditor.needsclick > span.topicplaceholder"
const Textinit = "#textbtn"
const Box1 ="body > div:nth-child(11) > div > p:nth-child(3) > label > input[type=checkbox]" 
const Box2 ="body > div:nth-child(11) > div > p:nth-child(2) > label > input[type=checkbox]"
const Startsearch = "body > div:nth-child(11) > div > p:nth-child(4) > input[type=button]"
const Searchstat = "body > div.chatbox3 > div > div > div.logwrapper > div.logbox > div > div:nth-child(2) > p"
const captcha ="#recaptcha-anchor > div.recaptcha-checkbox-border"
const Searchmessage = ["pangasinan",
"dagupan",
"urdaneta",
"lingayen",
"santa barbara"
]
const SearchConfirm = "You both like "+Searchmessage+"."
const Startmessage = "body > div.chatbox3 > div > div > div.controlwrapper > table > tbody > tr > td.chatmsgcell > div > textarea"
var Intro = "Hi M"+Math.round(randomNumber(20, 25));
const Replyconfirm = "body > div.chatbox3 > div > div > div.logwrapper > div.logbox > div > div:nth-child(4) > p > span"
const Newmatch = "body > div.chatbox3 > div > div > div.controlwrapper > table > tbody > tr > td.disconnectbtncell > div > button"
const Checkconn = "body > div.chatbox3 > div > div > div.logwrapper > div.logbox > div > div:nth-child(4) > p > span"

function delay(time) {
	return new Promise(function(resolve) { 
		setTimeout(resolve, time)
	});
 }
 function containsAnyLetters(str) {
    return /[a-zA-Z]/.test(str);
  }
  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


(async function omeginit() {
    
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null,
		devtools: false,
		args: process.env.CHROME_NO_SANDBOX === "true" ? ["--no-sandbox"] : ["--disable-web-security",
                    "--disable-features=IsolateOrigins",
                    " --disable-site-isolation-trials","--start-maximized","--mute-audio"],
            });
	const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(20000);
		await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36");
		try{
            console.log("\x1b[36m%s\x1b[0m","Omegle autosearch by Oking <3")
        await page.goto(PAGE_URL)
		await delay(2000);
		await page.waitForSelector(Category);
        await page.click(Category);
        for (let i = 0; i < 5; i++) {
		await page.type(Category, Searchmessage[i]);
		await page.keyboard.press("Enter");
        await delay(1000);
        }
		await delay(2000);
        await checkboxes(page);
        await console.log("checking boxes");
    }
    catch(error){
 await console.log(error);
    }
	})();




async function checkboxes(page){
    try{
    await page.waitForSelector(Textinit);
    await page.click(Textinit);
    await console.log("checking box1");
    await page.click(Box1);
    await console.log("checking box2")
    await page.click(Box2);
    await console.log("start searching tol");
    await page.click(Startsearch);
    await page.setDefaultNavigationTimeout(1000);
    await Searchbot(page);
    //await page.waitForSelector(captcha);
    //await page.click(captcha);
    //await console.log("checking captcha");
    }
    catch(error){
        await console.log(error);
           }

}

async function Searchbot(page){
    for (let i = 0; i < 10000; i++) {
         try{
        await page.setUserAgent(userAgent.random().toString())
        await page.waitForSelector(Searchstat)
        const element1 = await page.$(Searchstat);
        var searchmsg = await page.evaluate(element1 => element1.textContent, element1);
        //await console.log(searchmessage);
        if (searchmsg.toLowerCase().search(Searchmessage[0]) > -1 ||
            searchmsg.toLowerCase().search(Searchmessage[1]) > -1 ||
            searchmsg.toLowerCase().search(Searchmessage[2]) > -1 ||
            searchmsg.toLowerCase().search(Searchmessage[3]) > -1 ||
            searchmsg.toLowerCase().search(Searchmessage[4]) > -1 )
        {
            await console.log("match has been found");
    await page.click(Startmessage);
    await page.type(Startmessage, Intro);
    await page.keyboard.press("Enter");
    await delay(5000);
    if ((await page.$(Checkconn)) == null) {
    await page.waitForSelector(Replyconfirm,{Timeout:5000})
    const element2 = await page.$(Replyconfirm);
    var Strangerreply = await page.evaluate(element2 => element2.textContent, element2);
    await console.log(Strangerreply);
    if (Strangerreply.toLowerCase().search("f"||"from"||"girl"||"fuck"||"baby"||"hi"||"hello"||"stranger"||"f18"||"f19"||"f20"||"f21"||"f22"||"f23"||"f24"||"f25"||"f26"||"f27"||"f28"||"f29"||"f30") > -1 ){
        if (Strangerreply.toLowerCase().search("private") > -1 ){
            await console.log("Scammer alert");
            await page.click(Newmatch);
            await page.click(Newmatch);
            continue;
            }
            else{
    break;
    }
    }
 
    else {
        await page.click(Startmessage);
        await page.type(Startmessage, "baho ng pepe ng nanay mo");
        await page.keyboard.press("Enter");
        await console.log("Not female auto reject")
        await page.click(Newmatch);
        await page.click(Newmatch);

        continue;
    }}
    else{
        
        await console.log("you are disconnected")
        await page.click(Newmatch);
        await page.click(Newmatch);
        continue;
    }

        }
        else{
            await console.log("Stranger look for new match");
            await delay(2000);
            await page.click(Newmatch);
            await page.click(Newmatch);
            continue;
        }
         }    
    
    catch(error){
        await console.log("you are disconnected")
        await page.click(Newmatch);
        await page.click(Newmatch);

        continue;
           }
        }
        await console.log("FEMALE FOUND!!!!!");
        sound.play("C:\\Users\\PC\\Desktop\\omegle\\beep.mp3");
        await page.click(Startmessage);
        await page.type(Startmessage, "saan ka sa pangasinan?");
        await page.keyboard.press("Enter");
        await chattingtime(page);
    }
        


async function chattingtime(page){
    for (let i = 0; i < 10000; i++) {
    try {
        await console.log("entering chattingtime")
        await delay(5000);
        await page.waitForXPath("//*[contains(text(), 'disconnected')]")
            console.log("✅ YOU HAVE BEEN DISCONNECTED");
            await page.click(Newmatch);
            await page.click(Newmatch);
            await Searchbot(page);
 
    }
    catch(error){
await console.log("Not Yet Disconnected")
           }
        }
}