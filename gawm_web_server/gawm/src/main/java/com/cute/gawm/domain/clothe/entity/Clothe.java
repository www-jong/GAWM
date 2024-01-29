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
    @Id @GeneratedValue
    @Column
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
    @Column
    private String brand;
    @Column
    private String name;
    @Column(name = "clothe_img")
    private String clotheImg;
    @Column
    private String color;
    @Column
    private String material;
    @Column
    private String pattern;

    @ManyToOne
    @JoinColumn(name = "closet_id")
    private Closet closetId;
    @Column
    private Integer price;

    public enum BCATEGORY{
        TOP, BOTTOM, OUTER
    }

    public enum SCATEGORY{
        KNITT, SWEATER, JEANS
    }
}
