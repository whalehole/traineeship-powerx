const express = require('express');
const router = express.Router();

router.post('/mirror', (req, res)=>{
    const { name } = req.body;
    console.log("NAME", typeof name, name);
    if (name !== "") {
        res.writeHead(200, {"content-type": "text/html"});
        res.write(`
            <h1>Welcome ${name}!</h1>
        `);
        res.status(200).end();
    }
    else {
        res.writeHead(200, {"content-type": "text/html"});
        res.write(`
            <h1>Please provide something</h1>
        `);
        res.status(401).end();   
    }

})

module.exports = router;