package com.connect.demo.payload.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;


@Data
public class GetIndustriesRequest {
    @Setter(AccessLevel.NONE)
    private Long Id;
    @Setter(AccessLevel.NONE)
    private   String name;
    @Setter(AccessLevel.NONE)
    private Integer page;
}
