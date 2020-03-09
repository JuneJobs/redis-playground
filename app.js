"use strict";

const Redis = require('ioredis'),
      redisCli = new Redis();

let util = {
    pad : (n, strLen) => {
        n = n + '';
        return n.length >= strLen ? n : new Array(strLen - n.length + 1).join('0') + n;
    }
}

let fnInsertRowData = (keyQty) => {
    redisCli.get(`K${keyQty-1}`, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            redisCli.flushall();
            let cnt = 0;
            for (let i = 0; i < keyQty; i++) {
                redisCli.set(`K${util.pad(i, 6)}`, `V${util.pad(i, 6)}`, ()=>{
                    // if(cnt === keyQty -1) {
                    //     console.log('Insert test keys complete.');
                    // }
                    // cnt++;
                });
            }
        }
    });
}
let fnScanTest = (testCnt) => {
    let cnt = 0;
    let timer = setInterval(()=>{
        redisCli.scan("0", (err, res)=>{
            if(err) {
                console.log(err);
            } else {
                if(res !== null) {
                    console.log(res);       
                }
            }
            if(cnt === testCnt) {
                clearInterval(timer);
            }
            cnt ++;            
        });
    }, 2000);
}

//main
let main = () => {
    let keyQty = 1000 * 1000;
    fnInsertRowData(keyQty);
    fnScanTest(10);
}
main();