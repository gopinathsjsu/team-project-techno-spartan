import axios from 'axios';
const Bill_Payment_URL="http://localhost:8080/bills/oneTimeBillPay";

class BillPayService{
    createBillPayment(payment)
    {
        return axios.post(Bill_Payment_URL, payment);
    }
}

export default new BillPayService()