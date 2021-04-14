package com.example.bankApplication.backend.controllerModels;

import com.example.bankApplication.backend.models.ParticipantType;
import com.example.bankApplication.backend.models.Vendor;


public class BillPaymentModel {
    public long accountId;
    public double amount;
    public boolean isCredit;
    public ParticipantType participantType;
    public Vendor vendor;
}
