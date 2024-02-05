#!/bin/bash

sudo cp -r ../front/dist /usr/share/nginx/

sudo systemctl restart nginx
