package com.webanmypham.backend.model;

import jakarta.persistence.*;
import lombok.*;


// Role.java
@Entity
@Getter
@Setter
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; //ROLE_USER, ROLE_ADMIN

}
