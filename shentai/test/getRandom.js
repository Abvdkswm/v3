const API = require('../')
const sHentai = new API

async function test() {
    // Get random Doujin
    let doujin = await sHentai.getRandom()
    console.log(doujin);

    // or

    await sHentai.getRandom().then(doujin => console.log(doujin));

    // or

    await sHentai.getDoujin().then(doujin => console.log(doujin))

    // Check for all errors in a library without catch(i stop using reject, when after 15^ node.js, Promise use default strict mode for reject)
    if (doujin.status) return doujin.message;
}
test()