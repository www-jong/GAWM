package com.cute.gawm.domain.tag.entity;

import com.cute.gawm.common.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@Entity
@Table(name = "tag")
@AllArgsConstructor
@NoArgsConstructor
public class Tag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private int tagId;
    @Column
    private String name;
}
