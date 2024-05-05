const client = require("../db/conn");
async function suffixChecker(req, res, next){
    let suff = req.body.suffix;
    if(suff){
        const findSuffQuery = {
            text: "SELECT short_id FROM url_table WHERE short_id = $1",
            values: [suff]
        };
        const isUniqueSuff = ((await client.query(findSuffQuery)).rows).length == 0;
        if(!isUniqueSuff){
            return res.json({
                error: "Suffix Already Used"
            });
        }
    }
    next();
}

module.exports = {
    suffixChecker
}