package com.example.bankApplication.backend.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="Accounts")
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;
    public long userId;
    public AccountType type;
    public double balance;
    public double monthlyFee;
}
