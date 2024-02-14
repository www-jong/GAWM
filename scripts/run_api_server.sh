#!/bin/bash

sudo chmod a+rx ../gawm_web_server/gawm/build/libs/gawm-0.0.1-SNAPSHOT.jar
sudo java -jar -Dspring.profiles.active=prod ../gawm_web_server/gawm/build/libs/gawm-0.0.1-SNAPSHOT.jar 
