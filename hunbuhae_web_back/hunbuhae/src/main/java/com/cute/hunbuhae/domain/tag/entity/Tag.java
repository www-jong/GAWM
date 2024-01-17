package com.cute.hunbuhae.domain.tag.entity;

import com.cute.hunbuhae.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "tag")
public class Tag extends BaseEntity {
    @Id
    @GeneratedValue
    @Column
    private long id;
    @Column
    private String name;
}
