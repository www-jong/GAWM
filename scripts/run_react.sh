#!/bin/bash

npm run build

sudo cp -r ../front/dist /usr/share/nginx/

sudo systemctl restart nginx
