package com.cute.gawm.domain.lookbook.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.clothe_lookbook.entity.ClotheLookbook;
import com.cute.gawm.domain.lookbook_image.entity.LookbookImage;
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
public class Lookbook extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothe_lookbook_id")
    @Nullable
    private ClotheLookbook clotheLookbook;
    private Integer view = 0;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lookbook_image_id")
    @Nullable
    private LookbookImage lookbookImage;
    @Column(name = "is_public")
    private boolean isPublic = true;
}
