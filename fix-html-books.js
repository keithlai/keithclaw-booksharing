const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\html\\book-browser-material.html';
let c = fs.readFileSync(p, 'utf8');
const idx = c.indexOf('];', c.indexOf('var BOOKS=['));
const newBooks = ',\n' +
'{id:"PSY-07",title:"怪誕心理學 (Quirkology)",author:"Richard Wiseman",cat:"人性/心理",diff:"入門",sum:"英國心理學家Richard Wiseman用科學實驗拆解日常生活入面嘅怪誕行為——點解我哋會講大話、點解某啲名比其他人更受歡迎、點解騙子可以呃到人？一本充滿趣味實驗嘅心理學入門。",gr:"https://www.goodreads.com/book/show/213354.Quirkology",amz:"https://www.amazon.com/Quirkology-Curious-Science-Research-Updated/dp/0465023339",yt:"",wiki:"https://en.wikipedia.org/wiki/Quirkology"},\n' +
'{id:"PSY-08",title:"幸運的因素 (The Luck Factor)",author:"Richard Wiseman",cat:"人性/心理",diff:"入門",sum:"Richard Wiseman用科學方法研究好運同衰運——訪問超過1,000位自認「好運」同「倒霉」嘅人，發現好運其實有得練。四項原則幫你由倒霉佬變幸運星。",gr:"https://www.goodreads.com/book/show/36421.The_Luck_Factor",amz:"https://www.amazon.com/Luck-Factor-Scientific-Principles-Bring/dp/B08WY5RNFW",yt:"",wiki:"https://en.wikipedia.org/wiki/The_Luck_Factor"}\n';
c = c.substring(0, idx) + newBooks + c.substring(idx);
fs.writeFileSync(p, c);
console.log('Added 2 books to HTML');
