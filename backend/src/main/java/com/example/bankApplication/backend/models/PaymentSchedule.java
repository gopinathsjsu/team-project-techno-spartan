package com.example.bankApplication.backend.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name="PaymentSchedule")
public class PaymentSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    public long accountId;
    public double amount;
    public Vendor vendor;
    public String selectedOption;
    public Date date;
}
