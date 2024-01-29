package com.cute.gawm.domain.clothe_stylelog.entity;


import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "clothe_stylelog")
public class ClotheStylelog  extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothe_stylelog_id")
    private int clotheStylelogId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothe_id")
    private Clothe clothe;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stylelog_id")
    private Stylelog stylelog;
}
