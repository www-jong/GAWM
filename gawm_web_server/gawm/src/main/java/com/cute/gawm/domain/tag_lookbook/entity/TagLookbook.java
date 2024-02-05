package com.cute.gawm.domain.tag_lookbook.entity;

import com.cute.gawm.common.BaseEntity;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.tag.entity.Tag;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Table(name = "tag_lookbook")
@AllArgsConstructor
@NoArgsConstructor
public class TagLookbook extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_lookbook_id")
    private int tagLookbookId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lookbook_id")
    private Lookbook lookbook;
}
