package com.cute.gawm.domain.clothes_lookbook.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "clothes_lookbook")
public class ClothesLookbook extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothes_lookbook_id")
    private int clothesLookbookId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothes_id")
    private Clothes clothes;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lookbook_id")
    private Lookbook lookbook;
}
