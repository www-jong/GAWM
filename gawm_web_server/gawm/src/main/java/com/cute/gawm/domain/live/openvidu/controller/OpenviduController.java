package com.cute.gawm.domain.live.openvidu.controller;

import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.domain.live.service.LiveService;
import com.cute.gawm.domain.user.dto.SessionUser;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = {"https://i10e203.p.ssafy.io/", "http://localhost:3000"})
@RestController
@RequestMapping("/back/api/sessions")
@RequiredArgsConstructor
@Slf4j
public class OpenviduController {
    private final LiveService liveService;

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping
    public ResponseEntity<String> initializeSession(
            @LoginUser SessionUser sessionUser,
            @RequestBody(required = false) Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("params={}",params);
        log.info("sessionId={}",sessionUser.getId());
        SessionProperties properties = SessionProperties.fromJson(params).build();
        String response = liveService.initSession(sessionUser.getId(), properties, params);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * @param liveRoomId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/{liveRoomId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("liveRoomId") String liveRoomId,
                                                   @LoginUser SessionUser sessionUser,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("createConnection");
        log.info("!!params={}",params);
        log.info("!!liveRoomId={}", liveRoomId);

        Session session = liveService.getSession(liveRoomId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Connection connection = liveService.enterLive(session, params);

        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
}
