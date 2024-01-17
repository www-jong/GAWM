package com.cute.hunbuhae.domain.calendar.entity;

import com.cute.hunbuhae.common.BaseEntity;
import com.cute.hunbuhae.domain.ootd.entity.Ootd;
import com.cute.hunbuhae.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "calendar")
public class Calendar extends BaseEntity {
    @Id
    @GeneratedValue()
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "ootd_id")
    private Ootd ootd;
    private String temperature;
    private String location;
    private Timestamp date;
}
