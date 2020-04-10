package com.connect.demo.payload.request;

import lombok.Data;

@Data
public class PostCategoryRequest {

    private String name;

    private Long industryId;
}
