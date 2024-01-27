package com.cute.gawm.domain.clothe_lookbook.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.lookbook.entity.lookbook;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "clothe_lookbook")
public class ClotheLookbook extends BaseEntity {
    @Id @GeneratedValue
    @Column
    private long id;
    @ManyToOne
    @JoinColumn(name = "clothe_id")
    private Clothe clothe;
    @ManyToOne
    @JoinColumn(name = "lookbook_id")
    private lookbook lookbook;
}
