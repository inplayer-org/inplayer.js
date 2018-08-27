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
     * Gets the discount for a given ..
     * @method getDiscount
     * @deprecated moved to Voucher.js
     * @async
     * @param {String} token - The Authorization token
     * @param {Object} data - {
     *   voucherCode: String,
     *   merchantUuid: String,
     *   accessFeeId: Number
     * }
     * @example
     *     InPlayer.Misc
     *     .getDiscount('eyJ0eXAiOiJKPECENR5Y',{
     *        voucherCode: '120fwjhniudh42i7',
     *        merchantUuid: 'hghfqw92dm29-1g',
     *        accessFeeId: 2
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getDiscount(token = '', data = {}) {
        const fd = new FormData();
        fd.append('access_fee_id', data.accessFeeId);
        fd.append('voucher_code', data.voucherCode);
        fd.append('merchant_id', data.merchantUuid);

        const response = await fetch(this.config.API.getDiscount, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: fd,
        });

        return await response.json();
    }

    /**
     * Gets branding params for given merchant
     * @method getBranding
     * @async
     * @param {String} clientId - The Client id
     * @param {String} brandingId - The branding id or 'default'
     * @example
     *     InPlayer.Misc
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
