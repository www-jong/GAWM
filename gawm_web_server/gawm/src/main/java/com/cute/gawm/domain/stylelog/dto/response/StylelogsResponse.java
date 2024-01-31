package com.cute.gawm.domain.stylelog.dto.response;

import com.cute.gawm.domain.stylelog.entity.StylelogDetail;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;


@Getter
@AllArgsConstructor
public class StylelogsResponse {
    private int stylelogId;
    private String location;
    private String weather;
    private int temperature;
    private Timestamp date;
    private List<StylelogDetail.clothes> clothes;

}