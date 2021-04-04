package com.example.bankApplication.backend.models;

import java.io.Serializable;
// Composite primary key
public class UserAccountsIdCpk implements Serializable {
    public Long userId;
    public Long accountId;
}
