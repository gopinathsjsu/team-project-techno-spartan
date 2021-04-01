package com.example.bankApplication.backend.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="Transactions")
public class Transactions {
    @Id
    private long id;
    private long accountId;
    private double amount;
    private boolean isCredit;
    private String memo;

    private ParticipantType participantType;
    private long participantId;
    private String participantInfo;
}