package com.cute.hunbuhae.domain.tag_ootd.entity;

import com.cute.hunbuhae.common.BaseEntity;
import com.cute.hunbuhae.domain.ootd.entity.Ootd;
import com.cute.hunbuhae.domain.tag.entity.Tag;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "tag_ootd")
public class TagOotd extends BaseEntity {
    @Id
    @GeneratedValue
    @Column
    private long id;
    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;
    @ManyToOne
    @JoinColumn(name = "ootd_id")
    private Ootd ootd;
}
