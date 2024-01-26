package com.cute.gawm.domain.clothe_stylelog.entity;


import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.lookbook.entity.lookbook;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "clothe_stylelog")
public class ClotheStylelog  extends BaseEntity {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    @JoinColumn(name = "clothe_id")
    private Clothe clothe;
    @ManyToOne
    @JoinColumn(name = "stylelog_id")
    private com.cute.gawm.domain.stylelog.entity.Stylelog stylelog;
}
