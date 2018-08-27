/**
 * Contains all Requests regarding vouchers.
 *
 * @class Voucher
 */
class Voucher {
    constructor(config) {
        this.config = config;
    }

    /**
     * Gets the discount for a given code.
     * @method getDiscount
     * @async
     * @param {String} token - The Authorization token
     * @param {Object} data - {
     *   voucherCode: String,
     *   merchantUuid: String,
     *   accessFeeId: Number
     * }
     * @example
     *     InPlayer.Voucher
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
}
