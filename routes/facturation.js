require("dotenv").config();
const express = require("express");
const user = require("../models/user");
const Trans = require("../models/transactions");
const router = express.Router();
const {
  PaymentOperation,
  RandomGenerator,
  Signature,
} = require("@hachther/mesomb");

router.get("/standard", (req, res) => {
  res.send("Payement");
});

router.post("/standard", async (req, res) => {
  const { email, operator, phone, amount } = req.body;
  const AccessKey = "be83c3f8-5967-4f2a-84c5-d022a0c85a68";
  const AppKey = "185a88ac325d141cc1319d9bd592cef442f9e368";
  const SecretKey = "d54b8163-cade-4ae6-adff-8de9daafab65";

  try {
    const emailexist = await user.findOne({ email });
    if (emailexist) {
      //retrait
      const payment = new PaymentOperation({
        applicationKey: AppKey,
        accessKey: AccessKey,
        secretKey: SecretKey,
      });
      const response = await payment.makeCollect({
        amount: amount,
        service: operator,
        payer: phone,
        nonce: RandomGenerator.nonce(),
      });
      if (response.isTransactionSuccess) {
        const dateTrans = new Date();
        const payment = new PaymentOperation({
          applicationKey: AppKey,
          accessKey: AccessKey,
          secretKey: SecretKey,
        });
        const transactions = await payment.getTransactions(["ID1", "ID2"]);
        console.log(dateTrans, "---", transactions);
        /*const newTransaction=new Trans({username:emailexist.username,dateTransaction:dateTrans,id:'',Amount:amount,Operator:operator,Subscription:'standard'})
                await newTransaction.save()*/
      } else {
      }
      console.log(response.isOperationSuccess());
      console.log(response.isTransactionSuccess());
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
