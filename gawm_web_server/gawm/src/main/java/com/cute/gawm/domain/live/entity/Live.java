package com.cute.gawm.domain.live.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@Entity
@Table(name = "live")
@NoArgsConstructor
@AllArgsConstructor
public class Live extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "live_id")
    private int liveId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @Column
    private String name;
    @Column(name = "before_img")
    private String beforeImg;
    @Column(name = "after_img")
    private String afterImg;
    @Column(name = "session")
    private String session;
    @Column(name = "is_public")
    private Boolean isPublic;
//    public void endLive() {
//        this.isDeleted=true;
//    }
}
