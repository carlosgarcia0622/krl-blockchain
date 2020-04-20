# krl-blockchain
#Start: npm start

Apis: 
  
    POST: http://localhost:8085/krl_blockchain/transaction/genesis
    BODY: 
      {
	      "coins": 21000000
      }
      
    POST: http://localhost:8085/krl_blockchain/account/create
    BODY:
      {
      	"address": "123",
	      "balance": 0,
	      "type": "user"
      }
      
      
    POST: http://localhost:8085/krl_blockchain/transaction/transfer
    BODY: 
      {
      	"from":"12345678",
	      "to": "123",
	      "amount": 100
      }
      
    POST: http://localhost:8085/krl_blockchain/account/mine
    BODY: 
      {}
