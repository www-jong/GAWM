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
@Setter
@Table(name = "clothes_stylelog")
public class ClothesStylelog  extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothes_stylelog_id")
    private int clothesStylelogId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothes_id")
    private Clothes clothes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stylelog_id")
    private Stylelog stylelog;

    private double x;
    private double y;
    private double rotate = 0.0;
    private double size = 1.0;

    public ClothesStylelog(Clothes clothes, Stylelog stylelog, double x, double y, double rotate, double size) {
        this.clothes = clothes;
        this.stylelog = stylelog;
        this.x = x;
        this.y = y;
        this.rotate = rotate;
        this.size = size;
    }

}
