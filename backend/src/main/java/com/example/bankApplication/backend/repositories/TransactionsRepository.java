package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.TransactionsDbModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.ListIterator;

public interface TransactionsRepository extends CrudRepository<TransactionsDbModel, Long> {

    //for JUnit test
    @Query("SELECT t FROM TransactionsDbModel t where t.accountId = :accId")
    List<TransactionsDbModel> findAccountById(@Param("accId") long accId);

    Iterable<TransactionsDbModel> findByAccountIdOrReceiverAccountId(Long id, Long id1);
}