package com.cute.gawm.domain.clothe.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.closet.entity.Closet;
import com.cute.gawm.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "clothe")
public class Clothe extends BaseEntity {
    @Id
    @GeneratedValue
    private long id;

    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "user_id")
    //private User user;

    @Column(name = "clothe_img")
    private String clotheImg;


}
