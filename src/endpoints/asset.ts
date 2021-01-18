import Fingerprint2 from 'fingerprintjs2';
import reduce from 'lodash/reduce';
import qs from 'qs';
import { ApiConfig, Request } from '../models/Config';
import {
  CodeAccessData,
  RequestDataCaptureAccessData,
} from '../models/IAsset&Access';
import BaseExtend from '../extends/base';
import { API } from '../constants';
import { CommonResponse } from '../models/CommonInterfaces';
import tokenStorage from '../factories/tokenStorage';
import { isPromise } from '../helpers';

/**
 * Contains all Requests connected with assets/items
 *
 * @class Asset
 */
class Asset extends BaseExtend {
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
  }

  /**
   * Checks whether a given authenticated user has access for an asset
   * @method checkAccessForAsset
   * @async
   * @param {number} id - The id of the asset
   * @example
   *     InPlayer.Asset.checkAccessForAsset(42597)
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GetItemAccessV1>}
   */
  async checkAccessForAsset(id: number) {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.checkAccessForAsset(id), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
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
   * @returns  {AxiosResponse<boolean>}
   */
  async isFreeTrialUsed(id: number) {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.checkFreeTrial(id), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
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
   * @returns  {AxiosResponse<ItemDetailsV1>}
   */
  async getAsset(assetId: number, merchantUuid: string) {
    return this.request.get(API.getAsset(assetId, merchantUuid));
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
   * @returns  {AxiosResponse<ExternalItemDetails>}
   */
  async getExternalAsset(
    assetType: string,
    externalId: string,
    merchantUuid = '',
  ) {
    return this.request.get(
      API.getExternalAsset(assetType, externalId, merchantUuid),
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
   * @returns  {AxiosResponse<GetMerchantPackage>}
   */
  async getPackage(id: number) {
    return this.request.get(API.getPackage(id));
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
   * @returns  {AxiosResponse<GetAccessFee>}
   */
  async getAssetAccessFees(id: number) {
    return this.request.get(API.getAssetAccessFees(id));
  }

  /**
   * Returns purchase history with types
   * @method getAssetsHistory
   * @async
   * @param {number} size - The page size
   * @param {number} page - The current page / starting index = 0
   * @param {string} startDate - Staring date filter
   * @param {string} endDate - Ending date filter
   * @param {string} type - Type filter
   * @example
   *     InPlayer.Asset
   *     .getAssetsHistory()
   *     .then(data => console.log(data))
   * @returns  {AxiosResponse<Array>}
   */
  async getAssetsHistory(
    size = 10,
    page = 0,
    startDate?: string,
    endDate?: string,
    type?: string,
  ) {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(
      API.getAssetsHistory(size, page, startDate, endDate, type),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
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
   * @returns  {Object}
   */
  async requestCodeAccess(codeAccessData: CodeAccessData) {
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

    formData.set('item_id', String(codeAccessData.item_id));
    formData.set('code', String(codeAccessData.code));
    formData.set('browser_fingerprint', browserFingerprint);

    const response = await this.request.post(API.requestCodeAccess, formData);

    const accessCode: CodeAccessData = {
      ...codeAccessData,
      browser_fingerprint: browserFingerprint,
    };

    await tokenStorage.setItem(
      this.config.INPLAYER_ACCESS_CODE_NAME(codeAccessData.item_id),
      JSON.stringify(accessCode),
    );

    return response;
  }
  /**
   * Get access without authentication for asset with access control type data capture
   * @method requestDataCaptureNoAuthAccess
   * @async
   * @param {Object} accessData = {
   *  email: {string},
   *  fullname: {string}
   *  company: {string}
   *  merchantuuid: {string}
   * }
   * @returns {AxiosResponse<CommonResponse>}
   */
  async requestDataCaptureNoAuthAccess(
    accessData: RequestDataCaptureAccessData,
  ) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return this.request.post(
      API.requestDataCaptureNoAuthAccess,
      qs.stringify(accessData),
      { headers },
    );
  }

  async getAccesCodeSessions(code: string) {
    return this.request.get(API.requestAccessCodeSessions(code));
  }
  /**
   * Retrieves the access code and browser fingerprint for the current asset from localStorage
   * Returns null if no access code is present.
   * @method getAccessCode
   * @param {Object} data = {
   *  assetId: {number},
   * }
   * @example
   *    const accessCode = InPlayer.Asset.getAccessCode();
   * @returns  {CodeAccessData | null}
   */
  getAccessCode(assetId: number) {
    const accessCode = tokenStorage.getItem(
      this.config.INPLAYER_ACCESS_CODE_NAME(assetId),
    );

    if (isPromise(accessCode)) {
      return (accessCode as Promise<string>).then((resolvedString) =>
        resolvedString ? (JSON.parse(resolvedString) as CodeAccessData) : null
      ) as Promise<CodeAccessData | null>;
    }

    return accessCode ? (JSON.parse(accessCode as string) as CodeAccessData) : null;
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
   * @returns  {Object}
   */
  async releaseAccessCode(assetId: number) {
    const accessCode: CodeAccessData | null = await this.getAccessCode(assetId);

    if (!accessCode) {
      return null;
    }

    const formData = new FormData();

    formData.set('id', String(accessCode.item_id));
    formData.set('browser_fingerprint', accessCode.browser_fingerprint);

    const response = await this.request.delete(
      API.releaseAccessCode(accessCode.code),
      { data: formData },
    );

    await tokenStorage.removeItem(
      this.config.INPLAYER_ACCESS_CODE_NAME(assetId),
    );

    return response;
  }

  /**
   * Terminates session for the current browser.
   * @method terminateSession
   * @async
   * @param {number} - assetId
   * @example
   *     InPlayer.Asset
   *     .terminateSession(42599)
   *     .then(data => console.log(data));
   * @returns  null
   */
  async terminateSession(assetId: number) {
    const accessCode: CodeAccessData = await this.getAccessCode(assetId);

    if (!accessCode) {
      return null;
    }

    const response = await this.request.delete(
      API.terminateSession(accessCode.code, accessCode.browser_fingerprint),
    );

    await tokenStorage.removeItem(
      this.config.INPLAYER_ACCESS_CODE_NAME(assetId),
    );

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
   * @returns s {Object} data = {
   *    video_url: {string}
   * }
   */
  async getCloudfrontURL(assetId: number, videoUrl: string) {
    const tokenObject = await this.request.getToken();

    return this.request.get(API.getCloudfrontURL(assetId, videoUrl), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Gets the donation options for the asset.
   * @method getDonationOptions
   * @async
   * @param {number} assetId - The id of the asset
   * @example
   *     InPlayer.Donation
   *     .getDonationOptions(42597)
   *     .then(data => console.log(data));
   * @returns {AxiosResponse<DonationDetails>}
   */
  async getDonationOptions(assetId: number) {
    const tokenObject = await this.request.getToken();

    return this.request.get(API.getDonations(assetId), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }
}

export default Asset;
