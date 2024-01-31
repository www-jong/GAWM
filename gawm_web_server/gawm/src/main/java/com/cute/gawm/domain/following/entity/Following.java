package com.cute.gawm.domain.following.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import javax.persistence.*;

@Getter
@Setter
@Document(collection = "following")
public class Following {

    @Id
    @Field(value = "following_id", targetType = FieldType.OBJECT_ID)
    private String followingId;

    @Field(value = "followers_id")
    private String[] followersId;
}