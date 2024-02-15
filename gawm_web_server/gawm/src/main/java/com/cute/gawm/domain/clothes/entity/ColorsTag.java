package com.cute.gawm.domain.clothes.entity;

import javax.persistence.Table;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Table(name = "colors_tag")
public class ColorsTag {
    @Id // name을 기본 키로 사용
    private String name;

    private String colorCode; // 실제 색상 코드를 저장하는 필드
}
