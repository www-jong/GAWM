#!/bin/bash

npm run build

sudo cp -r /home/ubuntu/S10P12E203/front/dist /usr/share/nginx/

sudo systemctl restart nginx
