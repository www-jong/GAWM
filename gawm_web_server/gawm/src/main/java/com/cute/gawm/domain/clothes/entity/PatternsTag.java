package com.cute.gawm.domain.clothes.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "patterns_tag")
public class PatternsTag {
    @Id // name을 기본 키로 사용
    private String name;
}
