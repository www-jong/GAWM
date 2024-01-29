package com.cute.gawm.domain.closet.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@Entity
@Table(name = "closet")
@AllArgsConstructor
@NoArgsConstructor
public class Closet extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int closetId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
