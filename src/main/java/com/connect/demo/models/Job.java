package com.connect.demo.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="jobs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    @NotNull
    @Column(length = 2048)
    private String description;

    @NotNull
    private Double rate;

    @NotNull
    private Boolean available;

    @NotNull
    private Boolean availableOnWeekends;

    @NotNull
    @Column(length = 2048)
    private String qualifications;

    @NotNull
    private Boolean ratePerDay;

    @NotNull
    private String location;

    @NotNull
    private boolean isCompany;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "industry_id", nullable = false)
    private Industry industry;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Job(String title, String description,Double rate,Boolean available,Category category, Industry industry,User user,String qualifications,Boolean ratePerDay,String location,Boolean isCompany,Boolean availableOnWeekends) {
        this.title=title;
        this.description=description;
        this.rate=rate;
        this.available=available;
        this.category=category;
        this.industry=industry;
        this.qualifications=qualifications;
        this.ratePerDay=ratePerDay;
        this.location=location;
        this.isCompany=isCompany;
        this.availableOnWeekends=availableOnWeekends;
        this.user=user;
    }
}
