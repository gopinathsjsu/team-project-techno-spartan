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
    public String firstname;
    public String lastname;
    public String email;
    public UserType type;
}
