#!/bin/bash

sudo chmod a+rx ../gawm_web_server/gawm/build/libs/gawm-0.0.1-SNAPSHOT.jar
nohup java -jar -Dspring.profiles.active=prod ../gawm_web_server/gawm/build/libs/gawm-0.0.1-SNAPSHOT.jar >> application.log 2> /dev/null &
