package com.cute.hunbuhae.domain.live.entity;

import com.cute.hunbuhae.common.BaseEntity;
import com.cute.hunbuhae.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "live")
public class Live extends BaseEntity {
    @Id
    @GeneratedValue
    @Column
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "before_img")
    private String beforeImg;
    @Column(name = "after_img")
    private String afterImg;
}
