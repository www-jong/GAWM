package com.cute.gawm.common;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.sql.Timestamp;
@Getter
public abstract class BaseEntity {
    @Column
    private Timestamp createdAt;
    @Column
    private Timestamp updatedAt;
    @Column
    private Boolean isDeleted;
}
