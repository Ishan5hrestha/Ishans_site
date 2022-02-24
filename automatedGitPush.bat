@echo off
set /p message=Commit Message?:
title Git Push
git init
git add -A
git commit -m "%message%"
git pull origin main
git push origin main
echo Push Successful



