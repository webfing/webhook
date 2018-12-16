/*
* 部署服务
* author: kingpjchen
**/

const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const deployDir = './deply';

export default async (event) => {
    const branch  = event.payload.ref;
    const project = event.payload.repository.name;
    const message = event.payload.head_commit.message || '';
    const deployPath = path.join(deployDir, `${project}.sh`);
    const exists = await fs.pathExists(deployPath);
    if (exists && message.indexOf('feat(delply)') === 0) {
        console.log(`收到项目${project}-${branch}分支的push事件，要求服务器部署`, Date.now());
        shell.exec(`sh ${deployPath}`, (code, stdout, stderr) => {
            console.log('Exit code:', code, Date.now());
            console.log('Program output:', stdout);
            if ( stderr ) {
                console.error('Program error: ', stderr, Date.now());
            }
        })
    }
}