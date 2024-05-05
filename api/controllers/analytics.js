const client = require("../db/conn");
async function fn (req, res){
    //send response of particular shortid
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
    const getClicksQuery = {
        text: "SELECT created_at AS timestamp FROM click_table WHERE short_id = $1",
        values: [shortID]
    };
    const clicks = await client.query(getClicksQuery);
    
    const resObj = {
        shortId: shortID,
        url: url.full_url,
        clicksCount: url.clicks,
        clicks: clicks.rows
    }
    res.json(resObj);
}
module.exports = fn;