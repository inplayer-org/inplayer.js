/**
 * Contains mixed various types of functiosn for dlcs, discounts, branding, etc.
 *
 * @class Misc
 */
class Misc {
    constructor(config) {
        this.config = config;
    }
    /**
     * Gets all DLC links
     * @method getDlcLinks
     * @async
     * @param {String} token - The Authorization token
     * @param {Number} assetId - The id of the asset
     * @example
     *     InPlayer.Misc
     *     .getDlcLinks('eyJ0eXAiOiJKPECENR5Y',36320)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getDlcLinks(token, assetId) {
        const response = await fetch(this.config.API.getDlcLinks(assetId), {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return await response.json();
    }

    /**
     * Downloads a file
     * @method downloadProtectedFile
     * @async
     * @param {String} token - The Authorization token
     * @param {number} assetId - The Id of the asset
     * @param {String} filename - The name of the file
     * @example
     *     InPlayer.Misc
     *     .downloadProtectedFile('eyJ0eXAiOiJKPECENR5Y',2234, 'test.js')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async downloadProtectedFile(token, assetId, filename) {
        const response = await fetch(
            this.config.API.downloadFile(assetId, filename),
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        return await response.json();
    }
}

export default Misc;
