package com.example.bankApplication.backend.controllerModels;

import com.example.bankApplication.backend.models.ParticipantType;

import java.util.Date;

public class RecurringBetweenAccountsModel {
    public long accountId;
    public double amount;
    public boolean isCredit;
    public String memo;

    public String startDate;
    public long durationInDays;

    public long accountIdTo;
}
