import Stomp from 'stompjs';

class Socket {
    constructor(config) {
        this.subscription = null;
        this.config = config;
    }

    subscribe(accountUid, callbackParams) {
        if (!accountUid && accountUid !== '') {
            return false;
        }

        if (callbackParams && callbackParams.onmessage) {
            if (typeof callbackParams.onmessage !== 'function') {
                return false;
            }
        } else {
            callbackParams.onMessage = e => console.log('Received message:', e);
        }

        if (callbackParams && callbackParams.onopen) {
            if (typeof callbackParams.onopen !== 'function') {
                return false;
            }
        }

        var Socket = 'MozWebSocket' in window ? MozWebSocket : WebSocket;

        const ws = new Socket(this.config.stomp.url);
        this.client = Stomp.over(ws);
        this.client.heartbeat.outgoing = 20000;
        this.client.heartbeat.incoming = 20000;
        this.client.debug = null;

        var parent = this;
        var uuid = accountUid;

        this.client.connect(
            {
                login: this.config.stomp.login,
                passcode: this.config.stomp.password,
                'client-id': accountUid,
            },
            () => {
                // call onopen callback
                if (callbackParams && callbackParams.onopen)
                    callbackParams.onopen();

                // subscribe to events
                parent.client.subscribe(
                    '/exchange/notifications/' + uuid,
                    callbackParams.onmessage,
                    {
                        id: accountUid,
                        ack: 'client',
                    }
                );

                // parent.setClient(client);
            },
            function(frame) {
                if (typeof frame !== 'string') {
                    console.warn('Stomp error: ', frame);
                }
            }
        );

        this.setClient(this.client);
    }

    setClient(client) {
        this.subscription = client;
    }
    unsubscribe() {
        if (this.subscription && this.subscription.connected) {
            this.subscription.unsubscribe();
        }
    }
}

export default Socket;
