package com.cute.gawm.domain.following.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "following")
public class following extends BaseEntity {
    @Id
    @GeneratedValue
    @Column
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id")
    private User follower;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id")
    private User following;
}
