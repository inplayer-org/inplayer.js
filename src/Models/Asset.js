import { API } from '../../constants/endpoints';

/**
 * Contains all Requests connected with assets/items
 *
 * @class Asset
 */
class Asset {
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
        const response = await fetch(API.checkAccess(id), {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        const data = await response.json();

        return data;
    }

    /**
     * Get the asset info for a given asset ID and merchant UUID
     * @method findAsset
     * @async
     * @param {Numer} assetId - The ID of the asset
     * @param {String} merchantUid - The merchant UUID string
     * @example
     *     InPlayer.Asset
     *     .findAsset(2,'a1f13-dd1dfh-rfh123-dhd1hd-fahh1dl')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async findAsset(assetId, merchantUuid) {
        const response = await fetch(API.findAsset(assetId, merchantUuid), {
            method: 'GET',
        });

        const data = await response.json();

        return data;
    }

    /**
     * Get an external assets' info
     * @method findExternalAsset
     * @async
     * @param {String} assetType - The type ID of the asset
     * @param {String} externalId - The ID of the external asset
     * @example
     *     InPlayer.Asset
     *     .findExternalAsset('331ff2','44237')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async findExternalAsset(assetType, externalId) {
        const response = await fetch(
            API.findExternalAsset(assetType, externalId),
            {
                method: 'GET',
            }
        );

        const data = await response.json();

        return data;
    }

    /**
     * Get package info for a given Package ID
     * @method findPackage
     * @async
     * @param {Numer} id - The type ID of the package
     * @example
     *     InPlayer.Asset
     *     .findPackage(4444)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async findPackage(id) {
        const response = await fetch(API.findPackage(id), {
            method: 'GET',
        });

        const data = await response.json();

        return data;
    }

    /**
     * Get the access fees for a given asset ID
     * @method getAssetAccessFees
     * @async
     * @param {Numer} id - The ID of the asset
     * @example
     *     InPlayer.Asset
     *     .getAssetAccessFees(555)
     *     .then(data => console.log(data))
     * @return {Object}
     */
    async getAssetAccessFees(id) {
        const response = await fetch(API.findAccessFees(id), {
            method: 'GET',
        });

        const data = await response.json();

        return data;
    }

    /**
     * Authorize for the freemium asset (login)
     * @method getFreemiumAsset
     * @async
     * @param {String} token - The authorization token
     * @param {Object} data - { accessFee: Number }
     * @example
     *     InPlayer.Asset
     *     .freemiumAsset('uoifhadafefbad1312nfuqd123', { accessFee: 22 })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getFreemiumAsset(token, accessFee) {
        const response = await fetch(API.freemium, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: {
                access_fee: accessFee,
            },
        });

        const data = await response.json();

        return data;
    }
}

export default Asset;
