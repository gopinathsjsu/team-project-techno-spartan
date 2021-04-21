import axios from 'axios';
const Base_URL="http://localhost:8080/transactions"

class TransactionService{
  getUserTransactions(userId) {
    return axios.post(Base_URL + '/me', {userId})
  }

  getAccountTransactions(userId, accountId) {
    return axios.post(Base_URL + '/account/' + accountId, {userId})
  }

}

export default new TransactionService()
