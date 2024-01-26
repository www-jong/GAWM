package com.cute.gawm.domain.lookbook.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.clothe_lookbook.entity.ClotheLookbook;
import com.cute.gawm.domain.user.entity.User;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lookbook")
public class lookbook extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;
    @ManyToOne
    @JoinColumn(name = "clothe_lookbook_id")
    @Nullable
    private ClotheLookbook clotheLookbook;
    private Integer view = 0;
    @Column(name = "lookbook_img")
    @Nullable
    private String lookbookImg;
    @Column(name = "is_public")
    private boolean isPublic = true;

}
