const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { PrivateKey, PublicKey, Signature, Aes, key_utils, config } = require('eosjs-ecc');
const { TextEncoder, TextDecoder } = require('util');
const fetch = require('node-fetch');

let privateKeys = [];// user private keys
const rpc = new JsonRpc('http://192.168.1.75:8010', { fetch });
const signatureProvider = new JsSignatureProvider(privateKeys);
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

async function main() {
    let arr = [];
    try {
    const info = await rpc.get_info();
    const firstBP = info.head_block_producer;
    const firstBlockNumber = info.head_block_num;
    arr.push(info.head_block_producer);
    while(1) {
    const info = await rpc.get_info();
    const nextBP = info.head_block_producer;
    const nextBlockNumber = info.head_block_num;
    if(arr[0] === nextBP) { //first BP랑 nextBP가 같은 경우
    if(nextBlockNumber >= firstBlockNumber + 12)// 12를 더해주는 이유, nextBlockNumber와 12번을 돌고 만난 첫 블록의 수가 같으면
    break;// 그만 돌리기(=한 라운드를 다 돌았을 때)
    } else {
    if(arr.indexOf(nextBP) == -1)
    arr.push(nextBP);
    }
    }
    for(let i=0; i<arr.length; i++)//선언해 줬던 배열 원소를 전부 출력
    console.log(arr[i]);
    } catch (error) {
    console.error(error);
    }
    }
    
    main();


main();





/*async function main() {
    try {
        //배열 심화
      let arr = [];
      for(let i = 0; i <= 10; i++){
          arr.push(i);//배열에 값을 넣어준다: push
      }
      console.log(arr);

      console.log(arr.indexOf(10));
    } catch (error) {
        console.error(error);
    }

}*/
