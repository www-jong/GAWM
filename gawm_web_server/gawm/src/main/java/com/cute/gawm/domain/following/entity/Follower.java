package com.cute.gawm.domain.following.entity;

import com.cute.gawm.domain.user.dto.UserEditForm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import javax.persistence.Id;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "follower")
public class Follower {

    @Id
    @Field(value = "user_id", targetType = FieldType.OBJECT_ID)
    private int userId;

    @Field(value = "follower_id_list")
    private ArrayList<Integer> followerList;

    public void update(ArrayList<Integer> followerList){
        this.followerList=followerList;
    }
}