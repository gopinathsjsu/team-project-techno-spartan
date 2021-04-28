package com.example.bankApplication.backend.models;

import java.util.ArrayList;
import java.util.EnumSet;

public enum TransactionType {
    CREDIT,
    DEBIT,
    FEES,
    NONE;

    public static boolean contains(String value) {
        try {
            return EnumSet.allOf(TransactionType.class)
                    .contains(Enum.valueOf(TransactionType.class, value));
        } catch (Exception e) {
            return false;
        }
    }
}
