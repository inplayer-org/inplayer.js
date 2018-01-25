export const config = {
    BASE_URL: 'https://services.inplayer.com',
    INPLAYER_TOKEN_NAME: 'inplayer_token',
    stomp: {
        url: 'wss://notify.inplayer.com:15671/ws',
        login: 'notifications',
        password: 'notifications',
    },
};
