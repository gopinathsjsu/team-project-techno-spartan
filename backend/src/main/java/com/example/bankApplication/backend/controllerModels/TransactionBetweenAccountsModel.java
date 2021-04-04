package com.example.bankApplication.backend.controllerModels;

import com.example.bankApplication.backend.models.ParticipantType;

public class TransactionBetweenAccountsModel {
    public long accountId;
    public double amount;
    public boolean isCredit;
    public String memo;

    public ParticipantType participantType;
    public long participantId;
}
