#!/bin/bash

sudo cp -r /var/lib/jenkins/workspace/gawm/front/dist /usr/share/nginx

sudo systemctl restart nginx
