package com.cute.gawm.domain.lookbook.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.clothe_lookbook.entity.ClotheLookbook;
import com.cute.gawm.domain.user.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothe_lookbook_id")
    private ClotheLookbook clotheLookbook;
    @Column
    @ColumnDefault("0")
    private Integer view;
    @Column(name = "lookbook_img")
    private String lookbookImg;
    @Column(name = "is_public")
    @ColumnDefault("true")
    private boolean isPublic;

}
