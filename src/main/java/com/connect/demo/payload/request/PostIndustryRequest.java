package com.connect.demo.payload.request;

import lombok.Data;

@Data
public class PostIndustryRequest {
    private String name;

    public PostIndustryRequest(String name) {
        this.name = name;
    }
}
