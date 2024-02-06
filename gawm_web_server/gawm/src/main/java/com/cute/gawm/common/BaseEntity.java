package com.cute.gawm.common;

import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;
@Getter
@MappedSuperclass
public abstract class  BaseEntity {
    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp createdAt;
    @Column(name="updated_at")
    @UpdateTimestamp
    private Timestamp updatedAt;
    @Column(name = "is_deleted")
    private Boolean isDeleted = false;
}
