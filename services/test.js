const fs = require('fs-extra');
const path = require('path');

async function isExists() {
    const exists = await fs.pathExists(path.join(__dirname, '../deploy/koa-demo.sh'));
    console.log(exists);
}

console.log(isExists());