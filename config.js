export const config = {
    BASE_URL: 'https://services.inplayer.com',
    INPLAYER_TOKEN_NAME: 'inplayer_token',
    stomp: {
        url: 'wss://notify.inplayer.com:61614/ws',
        login: 'notifications',
        password: 'notifications',
    },
};
