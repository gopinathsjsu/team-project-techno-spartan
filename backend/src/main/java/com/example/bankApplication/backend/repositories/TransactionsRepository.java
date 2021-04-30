package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.TransactionsDbModel;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.Date;

public interface TransactionsRepository extends CrudRepository<TransactionsDbModel, Long> {
    Iterable<TransactionsDbModel> findByAccountIdOrReceiverAccountId(Long id, Long id1);

    Iterable<TransactionsDbModel> findByIsFeesAndIsRefunded(boolean isFees, boolean isRefunded);
    Iterable<TransactionsDbModel> findByAccountIdOrReceiverAccountIdAndDateAfter(Long id, Long id1, Date date);

    Iterable<TransactionsDbModel> findByAccountIdAndIsFeesAndDateAfter(long accountId, boolean b, Date date);

    Iterable<TransactionsDbModel> findByAccountIdAndDateAfter(long accountId, Date date);

    Iterable<TransactionsDbModel> findByReceiverAccountIdAndDateAfter(long accountId, Date date);
}