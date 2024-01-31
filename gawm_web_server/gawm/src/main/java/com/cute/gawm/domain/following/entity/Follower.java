package com.cute.gawm.domain.following.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import javax.persistence.Id;

@Getter
@Setter
@Document(collection = "follower")
public class Follower {

    @Id
    @Field(value = "follower_id", targetType = FieldType.OBJECT_ID)
    private String followerId;

    @Field(value = "followings_id")
    private String[] followingsId;
}