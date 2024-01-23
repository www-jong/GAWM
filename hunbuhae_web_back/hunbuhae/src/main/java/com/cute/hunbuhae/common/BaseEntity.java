package com.cute.hunbuhae.common;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
@Getter
@Setter
public abstract class BaseEntity {
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Boolean isDeleted;

}
