package com.cute.gawm.domain.clothes_stylelog.entity;


import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "clothes_stylelog")
public class ClothesStylelog  extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothes_stylelog_id")
    private int clothesStylelogId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothes_id")
    private Clothes clothe;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stylelog_id")
    private Stylelog stylelog;
}
