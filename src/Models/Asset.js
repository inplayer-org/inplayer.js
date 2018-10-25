import Fingerprint2 from 'fingerprintjs2';
import reduce from 'lodash/reduce';
import { checkStatus, errorResponse } from '../Utils';

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
     * @param {Number} id - The id of the asset
     * @example
     *     InPlayer.Asset
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
        const response = await fetch(this.config.API.findAsset(assetId, merchantUuid));

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
        const response = await fetch(this.config.API.findExternalAsset(assetType, externalId, merchantUuid));

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
    async getAssetsHistory(size = 10, page = 0, startDate = null, endDate = null) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }

        const t = this.Account.getToken();

        const response = await fetch(this.config.API.assetsHistory(size, page, startDate, endDate), {
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Authorize for the freemium asset (login)
     * @method getFreemiumAsset
     * @async
     * @param accessFee
     * @example
     *     InPlayer.Asset
     *     .freemiumAsset(2233)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getFreemiumAsset(accessFeeId) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }

        const t = this.Account.getToken();

        const formData = new FormData();

        formData.append('access_fee', accessFeeId);

        const response = await fetch(this.config.API.freemium, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
            body: formData,
        });

        return await response.json();
    }

    /**
     * Get access with code for code access grant asset.
     * @method requestCodeAccess
     * @async
     * @param {Object} data = {
     *  assetId: {Number},
     *  code: {String}
     * }
     * @throws Will throw an HTTP 400 error if the access code is already in use.
     * @throws Will throw an HTTP 401 error if the code is invalid.
     * @example
     *     InPlayer.Asset
     *     .requestCodeAccess({ assetId: 42599, code: 'access-code' })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async requestCodeAccess({ assetId, code }) {
        const formData = new FormData();

        const browserDetails = await Fingerprint2.getPromise();

        const browserFingerprint = Fingerprint2.x64hash128(
            reduce(browserDetails, (acc, details) => `${acc}${details.value}`, ''),
            31
        );

        formData.set('id', assetId);
        formData.set('code', code);
        formData.set('browser_fingerprint', browserFingerprint);

        const response = await fetch(this.config.API.requestCodeAccess, {
            method: 'POST',
            body: formData,
        });

        checkStatus(response);

        const accessCode = {
            code,
            assetId,
            browserFingerprint,
        };

        localStorage.setItem(this.config.INPLAYER_ACCESS_CODE_NAME(assetId), JSON.stringify(accessCode));

        return await response.json();
    }

    /**
     * Retrieves the access code and browser fingerprint for the current asset.
     * Returns null if no access code is present.
     * @method getAccessCode
     * @param {Object} data = {
     *  assetId: {Number},
     *  code: {String}
     * }
     * @example
     *    const accessCode = InPlayer.Asset.getAccessCode();
     * @return {Object | null}
     */
    getAccessCode(assetId) {
        const accessCode = localStorage.getItem(this.config.INPLAYER_ACCESS_CODE_NAME(assetId));

        if (!accessCode) {
            return null;
        }

        return JSON.parse(accessCode);
    }

    /**
     * Releases the access code for the current browser.
     * @method releaseAccessCode
     * @async
     * @param {Number} - assetId
     * @throws Will throw an HTTP 400 error if the code is not in use.
     * @example
     *     InPlayer.Asset
     *     .releaseAccessCode(42599)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async releaseAccessCode(assetId) {
        const accessCode = this.getAccessCode(assetId);

        if (!accessCode) {
            return;
        }

        const formData = new FormData();

        formData.set('id', accessCode.assetId);
        formData.set('browser_fingerprint', accessCode.browserFingerprint);

        const response = await fetch(this.config.API.releaseAccessCode(accessCode.code), {
            method: 'DELETE',
            body: formData,
        });

        checkStatus(response);

        localStorage.removeItem(this.config.INPLAYER_ACCESS_CODE_NAME(assetId));

        return await response.json();
    }
}

export default Asset;
