package com.cute.gawm.domain.openvidu.service;

import com.cute.gawm.domain.live.repository.LiveRepository;
import com.cute.gawm.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OpenviduService {
    private final LiveRepository liveRepository;
    private final UserRepository userRepository;

    public void saveLive(String session, Integer userId, String name){

    }
}
