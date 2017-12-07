import Stomp from 'stompjs';
import { config } from '../../config.js';

class Socket {

  constructor() {
    this.subscription = null;
  }

  subscribe(account_uuid, callbackParams){

    if(!account_uuid && account_uuid!==''){
      return false;
    }

    if(callbackParams && callbackParams.onmessage){
      if(typeof callbackParams.onmessage !== 'function'){
        return false;
      }
    } else{
      callbackParams.onMessage = (e) => console.log('Received message:', e);
    }

    if(callbackParams && callbackParams.onopen){
      if(typeof callbackParams.onopen !== 'function'){
        return false;
      }
    }

    var Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;

    const ws = new Socket(config.stomp.url);
    this.client = Stomp.over(ws);
    this.client.heartbeat.outgoing = 20000;
    this.client.heartbeat.incoming = 20000;
    this.client.debug = null;

    var parent = this;
    var uuid = account_uuid;


    this.client.connect({
      login: config.stomp.login,
      passcode: config.stomp.password,
      'client-id': account_uuid},
      () => {
        // call onopen callback
        if(callbackParams && callbackParams.onopen)
          callbackParams.onopen();

        // subscribe to events
        parent.client.subscribe('/exchange/notifications/' + uuid, callbackParams.onmessage, {
          id: account_uuid,
          ack: 'client'
        });

        // parent.setClient(client);

      },
      function (frame) {
              if (typeof frame !== 'string') {
                  console.warn('Stomp error: ', frame);
              }
      }
    );

    this.setClient(this.client);

  }

  setClient(client){
    this.subscription = client;
  }
  unsubscribe(){
    if(this.subscription && this.subscription.connected){
      this.subscription.unsubscribe();
    }

  }
}

export default Socket;
