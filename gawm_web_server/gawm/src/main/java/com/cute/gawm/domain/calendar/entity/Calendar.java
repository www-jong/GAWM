package com.cute.gawm.domain.calendar.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.user.entity.User;
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
    @GeneratedValue
    @Column
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "lookbook_id")
    private Lookbook lookbook;
    @Column
    private String temperature;
    @Column
    private String location;
    @Column
    private Timestamp date;
}
