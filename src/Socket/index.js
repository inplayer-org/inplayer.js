import Stomp from 'stompjs';

var WebSocket = window && (window.WebSocket || window.MozWebSocket);
const MAX_INTERVAL = 600000;
const MAX_INITIAL_INTERVAL = 10;

class Socket {
    constructor(config) {
        this.subscription = null;
        this.config = config;
    }

    subscribe(accountUid, callbackParams) {
        /* Check for callback functions */
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

        /* Connect Stomp over ws */
        var parent = this;
        var uuid = accountUid;

        var credentials = {
            login: this.config.stomp.login,
            passcode: this.config.stomp.password,
            'client-id': accountUid,
        };

        const ws = new WebSocket(this.config.stomp.url);
        this.client = Stomp.over(ws);
        this.client.heartbeat.outgoing = 30000;
        this.client.heartbeat.incoming = 30000;
        this.client.debug = null;

        this.client.connect(
            credentials,
            () =>
                parent.connectCallback(
                    callbackParams,
                    parent.client,
                    accountUid
                ),
            () =>
                parent.errorCallback(
                    callbackParams,
                    parent.config,
                    parent.client,
                    credentials,
                    accountUid,
                    parent
                )
        );

        this.setClient(this.client);
    }

    /* callback on success with the websocket connection */
    connectCallback(callbackParams, client, accountUid) {
        // call onopen callback
        if (callbackParams && callbackParams.onopen) callbackParams.onopen();

        if (client.ws.readyState === client.ws.OPEN) {
            // subscribe to events
            let tmp = client.subscribe(
                '/exchange/notifications/' + accountUid,
                callbackParams.onmessage,
                {
                    id: accountUid,
                    ack: 'client',
                }
            );
        }
    }

    /* callback on error with the websocket connection */
    errorCallback(
        callbackParams,
        config,
        client,
        credentials,
        accountUid,
        parent,
        timeoutStart = 0
    ) {
        var connected = false;
        if (timeoutStart === 0)
            timeoutStart =
                (Math.floor(Math.random() * MAX_INITIAL_INTERVAL) + 1) * 1000; //get a random start timeout between 1-max

        setTimeout(function() {
            if (client.ws.readyState === client.ws.CONNECTING) {
                return;
            }

            if (client.ws.readyState === client.ws.OPEN) {
                clearInterval(reconInt);
                return;
            }

            var ws = new WebSocket(config.stomp.url);

            client = new Stomp.over(ws);

            client.heartbeat.outgoing = 30000;
            client.heartbeat.incoming = 30000;
            client.debug = null;

            client.connect(
                credentials,
                () => {
                    connected = true;
                    parent.connectCallback(callbackParams, client, accountUid);
                    //reset the timeoutStart
                    timeoutStart =
                        (Math.floor(Math.random() * MAX_INITIAL_INTERVAL) + 1) *
                        1000; //get a random start timeout between 1-max
                },
                () => {
                    parent.errorCallback(
                        callbackParams,
                        config,
                        client,
                        credentials,
                        accountUid,
                        parent,
                        timeoutStart
                    );
                }
            );
        }, timeoutStart);
        if (timeoutStart >= MAX_INTERVAL) {
            //if more than 10 minutes reset the timer
            timeoutStart =
                (Math.floor(Math.random() * MAX_INITIAL_INTERVAL) + 1) * 1000; //get a random start timeout between 1-max
        } else {
            timeoutStart += Math.ceil(timeoutStart / 2);
        }
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
