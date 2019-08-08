import { errorResponse, checkStatus } from '../Utils';

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
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        const formData = new FormData();

        formData.append('access_fee_id', data.accessFeeId);
        formData.append('voucher_code', data.voucherCode);

        const response = await fetch(this.config.API.getDiscount, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.Account.getToken().token}`,
            },
            body: formData,
        });

        checkStatus(response);

        return await response.json();
    }
}

export default Voucher;
