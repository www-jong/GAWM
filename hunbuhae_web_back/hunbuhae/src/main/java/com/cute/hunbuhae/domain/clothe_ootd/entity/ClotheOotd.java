package com.cute.hunbuhae.domain.clothe_ootd.entity;

import com.cute.hunbuhae.common.BaseEntity;
import com.cute.hunbuhae.domain.clothe.entity.Clothe;
import com.cute.hunbuhae.domain.ootd.entity.Ootd;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "clothe_ootd")
public class ClotheOotd extends BaseEntity {
    @Id @GeneratedValue
    private long id;
    @ManyToOne
    @JoinColumn(name = "clothe_id")
    private Clothe clothe;
    @ManyToOne
    @JoinColumn(name = "ootd_id")
    private Ootd ootd;
}
