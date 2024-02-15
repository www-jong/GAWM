package com.cute.gawm.domain.clothes.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "materials_tag")
public class MaterialsTag {
    @Id // name을 기본 키로 사용
    private String name;
}
