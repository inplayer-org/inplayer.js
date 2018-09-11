import { checkStatus, params, errorResponse } from '../Utils';

/**
 * Contains all Requests connected with assets/items
 *
 * @class Asset
 */
class Asset {
    constructor(config, Account) {
        this.config = config;
        this.Account = Account;
    }

    /**
     * Checks whether a given authenticated user has access for an asset
     * @method checkAccessForAsset
     * @async
     * @param {String} token - The Authorization token
     * @param {Number} id - The id of the asset
     * @example
     *     InPlayer.Asset
     *     .checkAccessForAsset(36320)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async checkAccessForAsset(id) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }

        const t = this.Account.getToken();
        const response = await fetch(this.config.API.checkAccess(id), {
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Checks whether Free trial has been used for a given asset
     * @method isFreeTrialUsed
     * @async
     * @param {String} token - The Authorization token
     * @param {Number} id - The ID of the asset
     * @example
     *     InPlayer.Asset
     *     .isFreeTrialUsed(36320)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async isFreeTrialUsed(id) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }

        const t = this.Account.getToken();

        const response = await fetch(this.config.API.checkFreeTrial(id), {
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Get the asset info for a given asset ID and merchant UUID
     * @method findAsset
     * @async
     * @param {Number} assetId - The ID of the asset
     * @param {String} merchantUuid - The merchant UUID string
     * @example
     *     InPlayer.Asset
     *     .getAsset(2,'a1f13-dd1dfh-rfh123-dhd1hd-fahh1dl')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getAsset(assetId, merchantUuid) {
        const response = await fetch(
            this.config.API.findAsset(assetId, merchantUuid)
        );

        checkStatus(response);

        return await response.json();
    }

    /**
     * Get an external assets info
     * @method findExternalAsset
     * @async
     * @param {String} assetType - The type ID of the asset
     * @param {String} externalId - The ID of the external asset
     * @param {String} merchantUuid - OPTIONAL - the merchant uuid
     * @example
     *     InPlayer.Asset
     *     .getExternalAsset('ooyala','44237')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getExternalAsset(assetType, externalId, merchantUuid = '') {
        const response = await fetch(
            this.config.API.findExternalAsset(
                assetType,
                externalId,
                merchantUuid
            )
        );

        checkStatus(response);

        return await response.json();
    }

    /**
     * Get package info for a given Package ID
     * @method findPackage
     * @async
     * @param {Number} id - The type ID of the package
     * @example
     *     InPlayer.Asset
     *     .getPackage(4444)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getPackage(id) {
        const response = await fetch(this.config.API.findPackage(id));

        checkStatus(response);

        return await response.json();
    }

    /**
     * Get the access fees for a given asset ID
     * @method getAssetAccessFees
     * @async
     * @param {Number} id - The ID of the asset
     * @example
     *     InPlayer.Asset
     *     .getAssetAccessFees(555)
     *     .then(data => console.log(data))
     * @return {Object}
     */
    async getAssetAccessFees(id) {
        const response = await fetch(this.config.API.findAccessFees(id));

        checkStatus(response);

        return await response.json();
    }

    /**
     * Returns purchase history with types
     * @method getAssetsHistory
     * @async
     * @param {String} token - The authorization token
     * @param {Number} size - The page size
     * @param {Number} page - The current page / starting index = 0
     * @param {String} startDate - Staring date filter
     * @param {String} endDate - Ending date filter
     * @example
     *     InPlayer.Asset
     *     .getAssetsHistory()
     *     .then(data => console.log(data))
     * @return {Array}
     */
    async getAssetsHistory(
        size = 10,
        page = 0,
        startDate = null,
        endDate = null
    ) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }

        const t = this.Account.getToken();

        const response = await fetch(
            this.config.API.assetsHistory(size, page, startDate, endDate),
            {
                headers: {
                    Authorization: 'Bearer ' + t.token,
                },
            }
        );

        checkStatus(response);

        return await response.json();
    }

    /**
     * Authorize for the freemium asset (login)
     * @method getFreemiumAsset
     * @async
     * @param {String} token - The authorization token
     * @param accessFee
     * @example
     *     InPlayer.Asset
     *     .freemiumAsset('uoifhadafefbad1312nfuqd123', { accessFee: 22 })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getFreemiumAsset(accessFee) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }

        const t = this.Account.getToken();

        let body = {
            access_fee: accessFee,
        };

        const response = await fetch(this.config.API.freemium, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
            body: params(body),
        });

        return await response.json();
    }
}

export default Asset;
