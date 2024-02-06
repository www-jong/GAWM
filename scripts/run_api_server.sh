#!/bin/bash
pid=$(pgrep -f momo)
if [ -n "${pid}" ]
then
        kill -15 ${pid}
        echo kill process ${pid}
else
        echo no process
fi
chmod +x ../gawm_web_server/gawm/build/libs/gawm-0.0.1-SNAPSHOT.jar
nohup java -jar ../gawm_web_server/gawm/build/libs/gawm-0.0.1-SNAPSHOT.jar >> application.log 2> /dev/null &
