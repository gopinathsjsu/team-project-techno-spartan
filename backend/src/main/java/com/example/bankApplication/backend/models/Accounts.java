package com.example.bankApplication.backend.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="Accounts")
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private AccountType type;
    private double balance;
    private double monthlyFee;
}
