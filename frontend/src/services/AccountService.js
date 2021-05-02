import axios from 'axios';
const Base_URL=`http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/accounts`
// const Base_URL="http://localhost:8080/accounts"

class AccountService{
  getUserAccounts(userId) {
    return axios.post(Base_URL + '/me', {userId})
  }

  createAccount(userId, option) {
    return axios.post(Base_URL + '/me/create/' + option, {userId})
  }

  getAccountById(userId, accountId) {
    return axios.post(Base_URL + '/me/' + accountId, {userId})
  }
}

export default new AccountService()

