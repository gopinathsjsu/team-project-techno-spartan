package com.example.bankApplication.backend.controllerModels;

import com.example.bankApplication.backend.models.Vendor;

public class RecurringBillPaymentModel {
    public long accountId;
    public double amount;
    public boolean isCredit;
    public String startDate;
    public long durationInDays;
    public Vendor vendor;
}
