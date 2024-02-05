#!/bin/bash

sudo cp -r /var/lib/jenkins/workspace/gawm-front/front/dist /usr/share/nginx

sudo systemctl restart nginx
