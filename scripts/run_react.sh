#!/bin/bash

sudo cp -r /var/lib/jenkins/workspace/gawm/front/dist /var/www/html/dist;
# sudo npm run dev	
sudo systemctl restart nginx
