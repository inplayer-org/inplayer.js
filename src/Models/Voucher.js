import { checkStatus, errorResponse, params } from '../Utils';

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
     *   voucherCode: String,
     *   accessFeeId: Number
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
                message: 'User is not authenticated',
            });
        }
        const t = this.Account.getToken();

        let body = {
            access_fee_id: data.accessFeeId,
            voucher_code: data.voucherCode,
        };

        const response = await fetch(this.config.API.getDiscount, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + t.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params(body),
        });

        checkStatus(response);

        return await response.json();
    }
}

export default Voucher;
