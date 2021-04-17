package com.example.bankApplication.backend.controllerModels;

import com.example.bankApplication.backend.models.ParticipantType;
import com.example.bankApplication.backend.models.Vendor;
import java.util.Date;


public class BillPaymentModel {
    public long accountId;
    public double amount;
    public boolean isCredit;
    public ParticipantType participantType;
    public Date date;
    public Vendor vendor;
    public String selectedOption;
    public String recurr;
}
