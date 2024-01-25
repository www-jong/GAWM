package com.cute.gawm.domain.tag.entity;

import com.cute.gawm.common.BaseEntity;
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
