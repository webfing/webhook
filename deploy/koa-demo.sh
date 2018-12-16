#!/bin/bash

WEB_PATH='/data/webapp/koa-demo'
WEB_USER='root'
WEB_USERGROUP='root'

echo 'start deployment'
cd $WEB_PATH
echo 'pulling source code...'
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo 'changing permissions...'
chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
pm2 restart index.js
echo "Finished."