/**
 * Contains all Requests connected with assets/items
 *
 * @class Asset
 */
class Asset {
    constructor(config) {
        this.config = config;
    }

    /**
     * Checks whether a given authenticated user has access for an asset
     * @method checkAccessForAsset
     * @async
     * @param {String} token - The Authorization token
     * @param {Number} id - The id of the asset
     * @example
     *     InPlayer.Asset
     *     .checkAccessForAsset('eyJ0eXAiOiJKPECENR5Y',36320)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async checkAccessForAsset(token, id) {
        const response = await fetch(this.config.API.checkAccess(id), {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return await response.json();
    }

    /**
     * Checks whether Free trial has been used for a given account
     * @method checkFreeTrial
     * @async
     * @param {String} token - The Authorization token
     * @param {Number} id - The ID of the asset
     * @example
     *     InPlayer.Asset
     *     .checkFreeTrial(36320)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async checkFreeTrial(token, id) {
        const response = await fetch(this.config.API.checkFreeTrial(id), {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

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
     *     .findAsset(2,'a1f13-dd1dfh-rfh123-dhd1hd-fahh1dl')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async findAsset(assetId, merchantUuid) {
        const response = await fetch(
            this.config.API.findAsset(assetId, merchantUuid),
            {
                method: 'GET',
            }
        );

        return await response.json();
    }

    /**
     * Get an external assets' info
     * @method findExternalAsset
     * @async
     * @param {String} assetType - The type ID of the asset
     * @param {String} externalId - The ID of the external asset
     * @param {String} merchantUuid - OPTIONAL - the merchant uuid
     * @example
     *     InPlayer.Asset
     *     .findExternalAsset('331ff2','44237')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async findExternalAsset(assetType, externalId, merchantUuid = null) {
        const response = await fetch(
            this.config.API.findExternalAsset(
                assetType,
                externalId,
                merchantUuid
            ),
            {
                method: 'GET',
            }
        );

        return await response.json();
    }

    /**
     * Get package info for a given Package ID
     * @method findPackage
     * @async
     * @param {Number} id - The type ID of the package
     * @example
     *     InPlayer.Asset
     *     .findPackage(4444)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async findPackage(id) {
        const response = await fetch(this.config.API.findPackage(id), {
            method: 'GET',
        });

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
        const response = await fetch(this.config.API.findAccessFees(id), {
            method: 'GET',
        });

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
    async getFreemiumAsset(token, accessFee) {
        const fd = new FormData();

        fd.append('access_fee', accessFee);

        const response = await fetch(this.config.API.freemium, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: fd,
        });

        return await response.json();
    }
}

export default Asset;
