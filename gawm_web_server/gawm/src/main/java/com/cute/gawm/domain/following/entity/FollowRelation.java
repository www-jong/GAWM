package com.cute.gawm.domain.following.entity;

import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;

@Data
public class FollowRelation {
    Integer userId;
    @CreationTimestamp
    Timestamp createdAt;
}
