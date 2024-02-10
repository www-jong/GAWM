package com.cute.gawm.domain.comment.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@Entity
@Table(name = "comment")
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;
    @Column
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lookbook_id")
    private Lookbook lookbook;

    public void updateContent(String content){
        this.content=content;
    }
}
