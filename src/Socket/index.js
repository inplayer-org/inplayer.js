import Stomp from 'stompjs';
import { config } from '../../config.js';

var WebSocket = 'MozWebSocket' in window ? MozWebSocket : WebSocket;

class Socket {
    constructor() {
        this.subscription = null;
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

        const ws = new WebSocket(config.stomp.url);
        this.client = Stomp.over(ws);
        this.client.heartbeat.outgoing = 30000;
        this.client.heartbeat.incoming = 30000;
        this.client.debug = null;

        var parent = this;
        var uuid = accountUid;
        var credentials = {
            login: config.stomp.login,
            passcode: config.stomp.password,
            'client-id': accountUid,
        };

        this.client.connect(
            credentials,
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
            function() {
                reconnect(config.stomp.url, () => {
                    // subscribe to events
                    parent.client.subscribe(
                        '/exchange/notifications/' + uuid,
                        callbackParams.onmessage,
                        {
                            id: accountUid,
                            ack: 'client',
                        }
                    );
                });
            }
        );

        function reconnect() {
            var connected = false;
            var reconInt = setInterval(function() {
                socket = new WebSocket(config.stomp.url);
                client = new Stomp.over(socket);

                client.heartbeat.outgoing = 30000;
                client.heartbeat.incoming = 30000;
                client.debug = null;

                client.connect(
                    credentials,
                    function() {
                        clearInterval(reconInt);
                        connected = true;

                        // subscribe to events
                        this.client.subscribe(
                            '/exchange/notifications/' + uuid,
                            callbackParams.onmessage,
                            {
                                id: accountUid,
                                ack: 'client',
                            }
                        );
                    },
                    function() {
                        if (connected) {
                            reconnect(config.stomp.url, () => {
                                // subscribe to events
                                this.client.subscribe(
                                    '/exchange/notifications/' + uuid,
                                    callbackParams.onmessage,
                                    {
                                        id: accountUid,
                                        ack: 'client',
                                    }
                                );
                            });
                        }
                    }
                );
            }, 1000);
        }

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
