package com.cute.gawm.common;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import java.sql.Timestamp;
@Getter
public abstract class BaseEntity {
    @Column
    @CreationTimestamp
    private Timestamp createdAt;
    @Column
    @UpdateTimestamp
    private Timestamp updatedAt;
    @Column
    private Boolean isDeleted = false;
}
