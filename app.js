"use strict";

const Redis = require('ioredis'),
      redisCli = new Redis();

let util = {
    pad : (n, strLen) => {
        n = n + '';
        return n.length >= strLen ? n : new Array(strLen - n.length + 1).join('0') + n;
    }
}

/** 
  * Insert Test data
  * @param {keyQty} key quantity
  */
let fnInsertTestData = (keyQty) => {
    redisCli.get(`K${keyQty-1}`, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Clear test keys complete.');
            redisCli.flushall();
            let cnt = 0;
            let timer = setInterval(()=>{
                for (let i = cnt; i < cnt+1000; i++) {
                    redisCli.set(`K${util.pad(i, 6)}`, `V${util.pad(i, 6)}`, ()=>{
                        if(cnt === keyQty -1) {
                            console.log('All test keys are generated.');
                            clearInterval(timer);
                        }
                        cnt++;
                    });
                }
            }, 1000);
        }
    });
}
/** 
  * Insert Test data
  * @param {scanTestCount} Scan command run count.
  * @param {scanInterval} The interval of scan command execution.
  */
let fnScanTest = (scanTestCount, scanInterval) => {
    let cnt = 0;
    let lastScanValue = [];
    let nextLastScanValue = [];
    let timer = setInterval(()=>{
        //Start at cursor 0
        redisCli.scan("0", (err, res)=>{
            if(err) {
                console.log(err);
            } else {
                if(res !== null) {
                    if(JSON.stringify(lastScanValue) === JSON.stringify(res)) {
                        console.log(`%cCursor 0 values are same. next cursor is ${res[0]}.`, "color:green");
                    } else {
                        console.log(`Cursor 0 values are different. next cursor is ${res[0]}. Values are ${JSON.stringify(res[1])}`);
                    }
                    lastScanValue = res;
                }
                //Scan next cursor from 0
                redisCli.scan(res[0], (err, nextRes)=>{
                    if(err) {
                        console.log(err);
                    } else {
                        if(nextRes !== null) {
                            if(JSON.stringify(nextLastScanValue) === JSON.stringify(nextRes)) {
                                console.log(`%c->${res[0]} values are same. next cursor is ${nextRes[0]}.`, "color:green");
                            } else {
                                console.log(`->${res[0]} values are different. next cursor is ${nextRes[0]}. Values are ${JSON.stringify(nextRes[1])}`);
                            }
                            nextLastScanValue = nextRes;
                        }
                    }
                })
            }
            if(cnt === scanTestCount) {
                clearInterval(timer);
            }
            cnt ++;            
        });
    }, scanInterval);
}

//main
let main = () => {
    let keyQty = 1000 * 1000;
    let scanTestCount = 10000;
    let scanInterval = 1000;
    fnInsertTestData(keyQty);
    fnScanTest(scanTestCount, scanInterval);
}
main();