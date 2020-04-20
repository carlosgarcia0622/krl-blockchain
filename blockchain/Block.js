const sha256 = require('sha256');

class Block {

    constructor(data) {
        this.header = {
            previousHash: '',
            nonce: 0,
            hash:''
        };
        this.body = data;
    }

    getHash(difficulty, block) {
        let zeros = '';
        let hash = '';
        for(let i =0; i< difficulty; i++){
            zeros = zeros.concat('0');
        }
        while (hash.substring(0, difficulty) !== zeros) {
            this.header.nonce = Math.floor(Math.random() * (4294967295)); //Random Between integers 32 bits
            hash = sha256(JSON.stringify({header: this.header, body: this.body}));
            this.header.hash = hash;
            //console.log(hashNewBlock);
        }

        return hash;
    }

}

module.exports = Block;