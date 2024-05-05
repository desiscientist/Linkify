const client = require("../db/conn");
const shortid = require("shortid");
async function postUrl(req, res) {
    // rate limitng will be implemented here
    const url = req.body.url;
    let suff = req.body.suffix;
    if(!suff){
        suff = shortid.generate().substring(0,7);
    }

    const insertQuery = {
        text: 'INSERT INTO url_table (short_id, full_url, created_at, clicks) VALUES ($1, $2, CURRENT_TIMESTAMP, 0)',
        values: [suff, url]
    };
    await client.query(insertQuery);
    res.json({
        shortid: suff, 
        url: url
    });
}

async function getUrl (req, res){
    
    //find in db
    //caching will be implemented here
    const shortID = req.params.shortID;
    const findSuffQuery = {
        text: "SELECT * FROM url_table WHERE short_id = $1",
        values: [shortID]
    };
    const url = (await client.query(findSuffQuery)).rows[0];
    if(!url) return res.json({
        "msg": "No shortid found, redirect to main",
        "url": "main Page Url"
    });

    const clickQuery = {
        text: "INSERT INTO click_table (short_id, created_at)VALUES ($1, CURRENT_TIMESTAMP);",
        values: [shortID]
    }
    await client.query(clickQuery);

    const updateClickQuery = {
        text: "UPDATE url_table SET clicks = $1 WHERE short_id = $2;",
        values: [url.clicks + 1, shortID]
    }
    await client.query(updateClickQuery);
    // res.redirect(url["full_url"]);
    res.json({
        "shortID" : req.params.shortID,
        "url": url["full_url"]
    });
}

module.exports = {
    postUrl,
    getUrl
}