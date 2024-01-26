package com.cute.gawm.domain.stylelog.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.lookbook.entity.lookbook;
import com.cute.gawm.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "stylelog")
public class Stylelog extends BaseEntity {
    @Id
    @GeneratedValue()
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "ootd_id")
    private lookbook ootd;
    private String temperature;
    private String location;
    private Timestamp date;
}
