package com.cute.gawm.domain.clothe.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.closet.entity.Closet;
import com.cute.gawm.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "clothe")
public class Clothe extends BaseEntity {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "clothe_img")
    private String clotheImg;



}
