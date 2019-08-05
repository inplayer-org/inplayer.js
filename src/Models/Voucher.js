import { checkAuthentication, checkStatus } from '../Utils';

/**
 * Contains all Requests regarding vouchers.
 *
 * @class Voucher
 */
class Voucher {
    constructor(config, Account) {
        this.config = config;
        this.Account = Account;
    }

    /**
     * Gets the discount for a given code.
     * @method getDiscount
     * @async
     * @param {Object} data - {
     *   voucherCode: string,
     *   accessFeeId: number
     * }
     * @example
     *     InPlayer.Voucher
     *     .getDiscount({
     *        voucherCode: '120fwjhniudh42i7',,
     *        accessFeeId: 2
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getDiscount(data = {}) {
        checkAuthentication();

        const t = this.Account.getToken();

        const formData = new FormData();

        formData.append('access_fee_id', data.accessFeeId);
        formData.append('voucher_code', data.voucherCode);

        const response = await fetch(this.config.API.getDiscount, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
            body: formData,
        });

        checkStatus(response);

        return await response.json();
    }
}

export default Voucher;
