package com.cute.gawm.domain.live.openvidu.controller;

import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.domain.live.service.LiveService;
import com.cute.gawm.domain.user.dto.SessionUser;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;



@CrossOrigin(origins = {"https://i10e203.p.ssafy.io/", "http://localhost:3000"})
@RestController
@RequestMapping("/back/api/sessions")
@RequiredArgsConstructor
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
        SessionProperties properties = SessionProperties.fromJson(params).build();
        String response = liveService.initSession(sessionUser.getId(), properties, params);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = liveService.getSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Connection connection = liveService.enterLive(session, params);

        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
}
