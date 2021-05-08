import axios from 'axios';
const Transfers_BetweenAccount_URL=`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/transfers/betweenAccounts`;
// const Transfers_BetweenAccount_URL=`http://localhost:8080/transfers/betweenAccounts`;
class TransferServices{
    createTransferbetweenAccount(transfer)
    {
        return axios.post(Transfers_BetweenAccount_URL, transfer);
    }
}

export default new TransferServices()
