package com.cute.gawm.domain.stylelog.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stylelog")
public class Stylelog extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stylelog_id")
    private int stylelogId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lookbook_id")
    private Lookbook lookbook;
    @Column
    private String temperature;
    @Column
    private String location;
    @Column
    private Timestamp date;
}
