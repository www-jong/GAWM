package com.cute.hunbuhae.domain.ootd.entity;

import com.cute.hunbuhae.common.BaseEntity;
import com.cute.hunbuhae.domain.clothe_ootd.entity.ClotheOotd;
import com.cute.hunbuhae.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "ootd")
public class Ootd extends BaseEntity {
    @Id
    @GeneratedValue
    @Column
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "clothe_ootd_id")
    private ClotheOotd clotheOotd;
    private Integer view;
    private String name;
    @Column(name = "ootd_img")
    private String ootdImg;
    @Column(name = "is_public")
    private boolean isPublic;
    private Integer likes;

}
