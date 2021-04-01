package com.example.bankApplication.backend.models;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="Users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;
    private String firstname;
    private String lastname;
    private String email;
    private UserType type;
}
