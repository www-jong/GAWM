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
    private long id;
    @ManyToOne
    @JoinColumn(name = "following_id")
    private User follower;
    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User following;
}
