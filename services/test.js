const fs = require('fs-extra');
const path = require('path');
console.log(fs.pathExistsSync(path.join(__dirname, '../deploy/koa-demo.sh')));