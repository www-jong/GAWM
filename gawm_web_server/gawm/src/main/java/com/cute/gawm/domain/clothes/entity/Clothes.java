package com.cute.gawm.domain.clothes.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.user.entity.User;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "clothes")
public class Clothes extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothes_id")
    private int clothesId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private String name;

    @Column(name = "m_category")
    private String mCategory;

    @Column(name = "order_num")
    private int orderNum;  // 정렬 순서를 위한 필드
    @Column(name = "clothes_img")
    private String clothesImg;

}
