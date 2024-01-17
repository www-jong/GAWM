package com.cute.hunbuhae.domain.closet.entity;

import com.cute.hunbuhae.common.BaseEntity;
import com.cute.hunbuhae.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "closet")
public class Closet extends BaseEntity {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
