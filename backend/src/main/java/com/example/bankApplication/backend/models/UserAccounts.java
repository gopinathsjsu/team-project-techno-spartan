package com.example.bankApplication.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="UserAccounts")
@IdClass(UserAccountsIdCpk.class)
public class UserAccounts implements Serializable {
    @Id
    public long userId;
    @Id
    public long accountId;
}
