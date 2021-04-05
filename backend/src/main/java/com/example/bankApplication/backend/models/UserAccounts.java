package com.example.bankApplication.backend.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name="UserAccounts")
@IdClass(UserAccountsIdCpk.class)
public class UserAccounts implements Serializable {
    @Id
    public long userId;
    @Id
    public long accountId;
}
