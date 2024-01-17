package com.cute.hunbuhae.domain.comment.entity;

import com.cute.hunbuhae.common.BaseEntity;
import com.cute.hunbuhae.domain.ootd.entity.Ootd;
import com.cute.hunbuhae.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "comment")
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue
    @Column
    private long id;
    private String content;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "ootd_id")
    private Ootd ootd;
}
