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
     * @param {String} clientId - The Client id
     * @param {String} brandingId - The branding id or 'default'
     * @example
     *     InPlayer.Branding
     *     .getBranding('eyJ0e-XAiOi-JKPEC-ENR5Y', '123')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getBranding(clientId, brandingId) {
        const response = await fetch(
            this.config.API.getBranding(clientId, brandingId),
            {
                method: 'GET',
            }
        );

        return await response.json();
    }
}
