import { checkStatus } from '../Utils';

/**
 * Contains all Requests regarding branding.
 *
 * @class Branding
 */
class Branding {
    constructor(config) {
        this.config = config;
    }

    /**
     * Gets branding params for given merchant
     * @method getBranding
     * @async
     * @param {string} clientId - The Client id
     * @param {string} brandingId - The branding id or 'default'
     * @example
     *     InPlayer.Branding
     *     .getBranding('eyJ0e-XAiOi-JKPEC-ENR5Y', '123')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getBranding(clientId, brandingId) {
        const response = await fetch(
            this.config.API.getBranding(clientId, brandingId)
        );

        checkStatus(response);

        return await response.json();
    }
}

export default Branding;