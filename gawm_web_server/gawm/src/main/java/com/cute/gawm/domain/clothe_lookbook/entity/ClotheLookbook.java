package com.cute.gawm.domain.clothe_lookbook.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyToOne;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "clothe_lookbook")
public class ClotheLookbook extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothe_lookbook_id")
    private int clotheLookbookId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothe_id")
    private Clothe clothe;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lookbook_id")
    private Lookbook lookbook;
}
