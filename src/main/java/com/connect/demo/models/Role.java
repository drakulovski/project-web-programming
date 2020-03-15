package com.connect.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Enumerated(EnumType.STRING)
    private ERole name;

    public Role(){}

    public Role(ERole name){
        this.name = name;
    }

    public Integer getId(){
        return this.Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}
