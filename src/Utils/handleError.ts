export default (error: any) => {
    const { status, message } = error;

    switch (status) {
    case 401:

        // do something when you're unauthenticated
        break;
    case 403:
        // do something when you're unauthorized to access a resource
        break;
    case 500:
        break;
        // do something when your server exploded
    default:
        // handle normal errors with some alert or whatever
        break;
    }

    return message;
};
