package com.example.bankApplication.backend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;


@Entity
@Data
@Table(name="Transactions")
public class TransactionsDbModel{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long id;

    public long accountId;
    public double amount;
    public boolean isCredit;
    public String memo;

    public ParticipantType participantType;
    public long participantId;
}