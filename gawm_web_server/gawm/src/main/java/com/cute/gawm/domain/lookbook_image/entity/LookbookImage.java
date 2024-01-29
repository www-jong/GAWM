package com.cute.gawm.domain.lookbook_image.entity;

import com.cute.gawm.domain.image.entity.Image;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder
@Entity
@Table(name = "lookbook_image")
@AllArgsConstructor
@NoArgsConstructor
public class LookbookImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int lookbookImageId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lookbook_id")
    private Lookbook lookbook;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Image image;

}
