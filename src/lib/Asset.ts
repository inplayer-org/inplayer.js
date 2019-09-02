import Fingerprint2 from 'fingerprintjs2';
import reduce from 'lodash/reduce';
import { AxiosResponse } from 'axios';
import { getToken, authenticatedApi, basicApi } from '../Utils/http';
import { RequestCodeAccess, ExternalItemDetails } from '../Interfaces/IAsset&Access';
import { ApiConfig } from '../Interfaces/CommonInterfaces';
import { Account } from '../Interfaces/IAccount&Authentication';

/**
 * Contains all Requests connected with assets/items
 *
 * @class Asset
 */
class Asset {
  config: ApiConfig;
  Account: Account;
  constructor(config: ApiConfig, account: Account) {
    this.config = config;
    this.Account = account;
  }

  /**
   * Checks whether a given authenticated user has access for an asset
   * @method checkAccessForAsset
   * @async
   * @param {number} id - The id of the asset
   * @example
   *     InPlayer.Asset.checkAccessForAsset(42597)
   *     .then(data => console.log(data));
   * @return {AxiosResponse<GetItemAccessV1>}
   */
  async checkAccessForAsset(id: number) {
    return authenticatedApi.get(this.config.API.checkAccessForAsset(id), {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });
  }

  /**
   * Checks whether Free trial has been used for a given asset
   * @method isFreeTrialUsed
   * @async
   * @param {number} id - The ID of the asset
   * @example
   *     InPlayer.Asset
   *     .isFreeTrialUsed(36320)
   *     .then(data => console.log(data));
   * @return {Object}
   */
  async isFreeTrialUsed(id: number) {
    return authenticatedApi.get(this.config.API.checkFreeTrial(id), {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });
  }

  /**
   * Get the asset info for a given asset ID and merchant UUID
   * @method getAsset
   * @async
   * @param {number} assetId - The ID of the asset
   * @param {string} merchantUuid - The merchant UUID string
   * @example
   *     InPlayer.Asset
   *     .getAsset(2,'a1f13-dd1dfh-rfh123-dhd1hd-fahh1dl')
   *     .then(data => console.log(data));
   * @return {AxiosResponse<ItemDetailsV1>}
   */
  async getAsset(assetId: number, merchantUuid: string) {
    return basicApi.get(this.config.API.getAsset(assetId, merchantUuid));
  }

  /**
   * Get an external assets info
   * @method getExternalAsset
   * @async
   * @param {string} assetType - The type ID of the asset
   * @param {string} externalId - The ID of the external asset
   * @param {string} merchantUuid - OPTIONAL - the merchant uuid
   * @example
   *     InPlayer.Asset
   *     .getExternalAsset('ooyala','44237')
   *     .then(data => console.log(data));
   * @return {AxiosResponse<ExternalItemDetails>}
   */
  async getExternalAsset(
    assetType: string,
    externalId: string,
    merchantUuid = '',
  ) {
    return basicApi.get(
      this.config.API.getExternalAsset(assetType, externalId, merchantUuid),
    );
  }

  /**
   * Get package info for a given Package ID
   * @method getPackage
   * @async
   * @param {number} id - The type ID of the package
   * @example
   *     InPlayer.Asset
   *     .getPackage(4444)
   *     .then(data => console.log(data));
   * @return {AxiosResponse<GetMerchantPackage>}
   */
  async getPackage(id: number) {
    return basicApi.get(this.config.API.getPackage(id));
  }

  /**
   * Get the access fees for a given asset ID
   * @method getAssetAccessFees
   * @async
   * @param {number} id - The ID of the asset
   * @example
   *     InPlayer.Asset
   *     .getAssetAccessFees(555)
   *     .then(data => console.log(data))
   * @return {AxiosResponse<GetAccessFee>}
   */
  async getAssetAccessFees(id: number) {
    return basicApi.get(this.config.API.getAssetAccessFees(id));
  }

  /**
   * Returns purchase history with types
   * @method getAssetsHistory
   * @async
   * @param {number} size - The page size
   * @param {number} page - The current page / starting index = 0
   * @param {string} startDate - Staring date filter
   * @param {string} endDate - Ending date filter
   * @example
   *     InPlayer.Asset
   *     .getAssetsHistory()
   *     .then(data => console.log(data))
   * @return {Array}
   */
  async getAssetsHistory(
    size = 10,
    page = 0,
    startDate?: string,
    endDate?: string,
  ) {
    return authenticatedApi.get(
      this.config.API.getAssetsHistory(size, page, startDate, endDate),
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      },
    );
  }

  /**
   * Get access with code for code access grant asset.
   * @method requestCodeAccess
   * @async
   * @param {Object} data = {
   *  assetId: {number},
   *  code: {string}
   * }
   * @throws Will throw an HTTP 400 error if the access code is already in use.
   * @throws Will throw an HTTP 401 error if the code is invalid.
   * @example
   *     InPlayer.Asset
   *     .requestCodeAccess({ assetId: 42599, code: 'access-code' })
   *     .then(data => console.log(data));
   * @return {Object}
   */
  async requestCodeAccess({ assetId, code }: RequestCodeAccess) {
    const formData = new FormData();

    const browserDetails = await Fingerprint2.getPromise();

    const browserFingerprint = Fingerprint2.x64hash128(
      reduce(
        browserDetails,
        (acc: string, details: Record<string, any>) => `${acc}${details.value}`,
        '',
      ),
      31,
    );

    formData.set('id', String(assetId));
    formData.set('code', code);
    formData.set('browser_fingerprint', browserFingerprint);

    const response = await basicApi.post(
      this.config.API.requestCodeAccess,
      formData,
    );

    const accessCode = {
      code,
      assetId,
      browserFingerprint,
    };

    localStorage.setItem(
      this.config.INPLAYER_ACCESS_CODE_NAME(assetId),
      JSON.stringify(accessCode),
    );

    return response;
  }

  /**
   * Retrieves the access code and browser fingerprint for the current asset.
   * Returns null if no access code is present.
   * @method getAccessCode
   * @param {Object} data = {
   *  assetId: {number},
   *  code: {string}
   * }
   * @example
   *    const accessCode = InPlayer.Asset.getAccessCode();
   * @return {Object | null}
   */
  getAccessCode(assetId: number) {
    const accessCode = localStorage.getItem(
      this.config.INPLAYER_ACCESS_CODE_NAME(assetId),
    );

    if (!accessCode) {
      return null;
    }

    return JSON.parse(accessCode);
  }

  /**
   * Releases the access code for the current browser.
   * @method releaseAccessCode
   * @async
   * @param {number} - assetId
   * @throws Will throw an HTTP 400 error if the code is not in use.
   * @example
   *     InPlayer.Asset
   *     .releaseAccessCode(42599)
   *     .then(data => console.log(data));
   * @return {Object}
   */
  async releaseAccessCode(assetId: number) {
    const accessCode = this.getAccessCode(assetId);

    if (!accessCode) {
      return null;
    }

    const formData = new FormData();

    formData.set('id', accessCode.assetId);
    formData.set('browser_fingerprint', accessCode.browserFingerprint);

    const response = await basicApi.delete(
      this.config.API.releaseAccessCode(accessCode.code),
      { data: formData },
    );

    localStorage.removeItem(this.config.INPLAYER_ACCESS_CODE_NAME(assetId));

    return response;
  }

  /**
   * Returns a signed Cloudfront URL with the merchant's signature
   * @method getCloudfrontURL
   * @async
   * @param {number} assetId
   * @param {string} videoUrl
   * @example
   *     InPlayer.Asset
   *     .getCloudfrontURL(42599, 'url')
   *     .then(data => console.log(data));
   * @returns {Object} data = {
   *    video_url: {string}
   * }
   */
  async getCloudfrontURL(assetId: number, videoUrl: string) {
    return basicApi.get(this.config.API.getCloudfrontURL(assetId, videoUrl), {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });
  }
}

export default Asset;
