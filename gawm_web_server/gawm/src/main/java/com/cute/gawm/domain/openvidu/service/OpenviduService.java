package com.cute.gawm.common.openvidu.service;

import com.cute.gawm.common.exception.UserNotFoundException;
import com.cute.gawm.domain.live.entity.Live;
import com.cute.gawm.domain.live.repository.LiveRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OpenviduService {
    private final LiveRepository liveRepository;
    private final UserRepository userRepository;

    public void saveLive(String session, Integer userId, String name){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
        Live live = Live.builder()
                .user(user)
                .session(session)
                .name(name)
                .build();
        liveRepository.save(live);
    }
}
