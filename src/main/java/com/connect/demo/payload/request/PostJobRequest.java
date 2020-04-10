package com.connect.demo.payload.request;

import lombok.Data;


@Data
public class PostJobRequest {
    private String title;
    private String description;
    private Double rate;
    private Boolean available;
    private String qualifications;
    private boolean ratePerDay;
    private String location;
    private boolean isCompany;
    private boolean availableOnWeekends;
    private Long industryId;
    private Long categoryId;
}
