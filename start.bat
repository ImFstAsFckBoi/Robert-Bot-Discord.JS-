@echo off

git pull origin

cd ./src
color 2
echo Discordbot (discord.js)
echo Node Version:
node --version
node index
