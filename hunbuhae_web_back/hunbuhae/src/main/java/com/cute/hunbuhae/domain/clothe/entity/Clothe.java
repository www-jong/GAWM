package com.cute.hunbuhae.domain.clothe.entity;

import com.cute.hunbuhae.common.BaseEntity;
import com.cute.hunbuhae.domain.closet.entity.Closet;
import com.cute.hunbuhae.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "clothe")
public class Clothe extends BaseEntity {
    @Id @GeneratedValue
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "b_category")
    @Enumerated(EnumType.STRING)
    private BCATEGORY bCategory;
    @Column(name = "s_category")
    @Enumerated(EnumType.STRING)
    private SCATEGORY sCategory;
    private String brand;
    private String name;
    @Column(name = "clothe_img")
    private String clotheImg;
    private String color;
    private String material;
    private String pattern;
    @ManyToOne
    @JoinColumn(name = "closet_id")
    private Closet closetId;
    private Integer price;

    public enum BCATEGORY{
        TOP, BOTTOM, OUTER
    }

    public enum SCATEGORY{
        KNITT, SWEATER, JEANS
    }
}
