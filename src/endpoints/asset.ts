import Fingerprint2 from 'fingerprintjs2';
import reduce from 'lodash/reduce';
import qs from 'qs';
import { AxiosResponse } from 'axios';
import { ApiConfig, Request } from '../models/Config';
import {
  AccessCodeData,
  AssetsTransactions,
  CloudfrontUrl,
  CodeAccessData,
  CodeAccessSessionsData,
  DonationDetails,
  ExternalItemDetails,
  GetAccessFeesResponse,
  GetAssetsInPackage,
  GetItemAccessV1,
  GetMerchantPackage,
  ItemDetailsV1,
  RequestDataCaptureAccessData,
  SignedMediaResponse,
} from '../models/IAsset&Access';
import BaseExtend from '../extends/base';
import { API } from '../constants';
import { CommonResponse } from '../models/CommonInterfaces';
import tokenStorage from '../factories/tokenStorage';
import { isPromise } from '../helpers';

/**
 * Contains all Requests connected with items
 *
 * @class Asset
 */
class Asset extends BaseExtend {
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
  }

  /**
   * Checks whether a given authenticated user has access for an given item
   * @method checkAccessForAsset
   * @async
   * @param {number} id The id of created premium content in InPlayer Dashboard (i.e asset id).
   * @example
   *     InPlayer.Asset.checkAccessForAsset(42597)
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GetItemAccessV1>} Contains the data:
   * ```typescript
   * {
   *    id: number;
   *    account_id: number;
   *    customer_id: number;
   *    customer_uuid: string;
   *    ip_address: string;
   *    country_code: string;
   *    created_at: number;
   *    expires_at: number;
   *    item: {
   *      content: string;
   *    };
   * }
   * ```
   */
  async checkAccessForAsset(
    id: number,
  ): Promise<AxiosResponse<GetItemAccessV1>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.checkAccessForAsset(id), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Checks whether Free trial has been used for a given item
   * @method isFreeTrialUsed
   * @async
   * @param {number} id The id of created premium content in InPlayer Dashboard (i.e asset id).
   * @example
   *     InPlayer.Asset
   *     .isFreeTrialUsed(36320)
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<boolean>}
   */
  async isFreeTrialUsed(id: number): Promise<AxiosResponse<boolean>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.checkFreeTrial(id), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Gets the item details for a given merchant item
   * @method getAsset
   * @async
   * @param {number} assetId The id of created premium content in InPlayer Dashboard (i.e asset id).
   * @param {string} merchantUuid The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @example
   *     InPlayer.Asset
   *     .getAsset(2,'a1f13-dd1dfh-rfh123-dhd1hd-fahh1dl')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<ItemDetailsV1>} Contains the data:
   * ```typescript
   * {
   *    id: number;
   *    merchant_id: number;
   *    merchant_uuid: string;
   *    is_active: boolean;
   *    title: string;
   *    access_control_type: {
   *      id: number;
   *      name: string;
   *      auth: boolean;
   *    };
   *    item_type: {
   *      id: number;
   *      name: string;
   *      content_type: string;
   *      host: string;
   *      description: string;
   *    };
   *    age_restriction: {};
   *    metadata: [{}];
   *    created_at: number;
   *    updated_at: number;
   * }
   * ```
   */
  async getAsset(
    assetId: number,
    merchantUuid: string,
  ): Promise<AxiosResponse<ItemDetailsV1>> {
    return this.request.get(API.getAsset(assetId, merchantUuid));
  }

  /**
   * Gets an external asset details
   * @method getExternalAsset
   * @async
   * @param {string} assetType The type of the asset. Can be any of these
   * {@link https://developers.inplayer.com/docs/paywall3#ovp-custom-embed-code | values}.
   * @param {string} externalId The original video ID from the external OVP source (only for OVP asset type).
   * @param {string} merchantUuid The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @example
   *     InPlayer.Asset
   *     .getExternalAsset('ooyala','44237')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<ExternalItemDetails>} Contains the data:
   * ```typescript
   * {
   *    access_fees: [
   *      {
   *        id: number;
   *        merchant_id: number;
   *        amount: number;
   *        currency: string;
   *        description: string;
   *        expires_at: number;
   *        starts_at: number;
   *        updated_at: number;
   *        created_at: number;
   *        access_type: {
   *          id: number;
   *          account_id: number;
   *          name: string;
   *          quantity: number;
   *          period: string;
   *          updated_at: number;
   *          created_at: number;
   *        };
   *        item: {
   *          id: number;
   *          merchant_id: number;
   *          merchant_uuid: string;
   *          active: boolean;
   *          title: string;
   *          access_control_type: {
   *            id: number;
   *            name: string;
   *            auth: boolean;
   *          };
   *          item_type: {
   *            id: number;
   *            name: string;
   *            content_type: string;
   *            host: string;
   *            description: string;
   *          };
   *          age_restriction: {
   *            min_age: number;
   *          };
   *          metadata?: [{}];
   *          metahash?: {};
   *          content?: string;
   *          template_id: number;
   *          created_at: number;
   *          update_at: number;
   *        };
   *        trial_period: {
   *          quantity: number;
   *          period: string;
   *          description: string;
   *        };
   *        setup_fee: {
   *          id: number;
   *          fee_amount: number;
   *          description: string;
   *        };
   *        seasonal_fee: {
   *          id: number;
   *          access_fee_id: number;
   *          merchant_id: number;
   *          current_price_amount: number;
   *          off_season_access: boolean;
   *          anchor_date: number;
   *          created_at: number;
   *          updated_at: number;
   *        };
   *        external_fees: [{
   *          id: number;
   *          payment_provider_id: number;
   *          access_fee_id: number;
   *          external_id: string;
   *          merchant_id: number;
   *        }];
   *        geo_restriction: {
   *          id: number;
   *          country_iso: string;
   *          country_set_id: number;
   *          type: string;
   *        };
   *        current_phase: {
   *          access_fee_id: number;
   *          anchor_date: number;
   *          created_at: number;
   *          currency: string;
   *          current_price: number;
   *          expires_at: number;
   *          id: number;
   *          season_price: number;
   *          starts_at: number;
   *          status: string;
   *          updated_at: number;
   *        };
   *      }
   *    ];
   *    metahash: {};
   * }
   * ```
   */
  async getExternalAsset(
    assetType: string,
    externalId: string,
    merchantUuid = '',
  ): Promise<AxiosResponse<ExternalItemDetails>> {
    return this.request.get(
      API.getExternalAsset(assetType, externalId, merchantUuid),
    );
  }

  /**
   * Get package info for a given Package ID
   * @method getPackage
   * @async
   * @param {number} id The id of created package in InPlayer Dashboard.
   * @example
   *     InPlayer.Asset
   *     .getPackage(4444)
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GetMerchantPackage>} Contains the data:
   * ```typescript
   * {
   *    total: number;
   *    page: number;
   *    offset: number;
   *    limit: number;
   *    collection: [{
   *      id: number;
   *      merchant_id: number;
   *      is_active: boolean;
   *      title: string;
   *      content: string;
   *      item_type: {
   *        id: number;
   *        name: string;
   *        content_type: string;
   *        host: string;
   *        description: string;
   *      };
   *      metadata: {};
   *      items: number;
   *    }];
   * }
   * ```
   */
  async getPackage(id: number): Promise<AxiosResponse<GetMerchantPackage>> {
    return this.request.get(API.getPackage(id));
  }

  /**
   * Get assets in a package
   * @method getAssetsInPackage
   * @async
   * @param {number} id The id of created package in InPlayer Dashboard.
   * @example
   *     InPlayer.Asset
   *     .getAssetsInPackage(4444)
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GetAssetsInPackage>} Contains the data:
   * ```typescript
   * {
   *    total: number;
   *    page: number;
   *    offset: number;
   *    limit: number;
   *    collection: [{
   *      id: number;
   *      merchant_id: number;
   *      is_active: boolean;
   *      title: string;
   *      content: string;
   *      item_type: {
   *        id: number;
   *        name: string;
   *        content_type: string;
   *        host: string;
   *        description: string;
   *      };
   *      metadata: {};
   *      items: number;
   *    }];
   * }
   * ```
   */
  async getAssetsInPackage(
    id: number,
  ): Promise<AxiosResponse<GetAssetsInPackage>> {
    return this.request.get(API.getAssetsInPackage(id));
  }

  /**
   * Get the access fees for a given item
   * @method getAssetAccessFees
   * @async
   * @param {number} id  The id of created premium content in InPlayer Dashboard (i.e asset id).
   * @example
   *     InPlayer.Asset
   *     .getAssetAccessFees(555)
   *     .then(data => console.log(data))
   * @returns  {AxiosResponse<GetAccessFee>} Contains the data:
   * ```typescript
   * {
   *    id: number;
   *    merchant_id: number;
   *    amount: number;
   *    currency: string;
   *    description: string;
   *    expires_at: number;
   *    starts_at: number;
   *    updated_at: number;
   *    created_at: number;
   *    access_type: {
   *      id: number;
   *      account_id: number;
   *      name: string;
   *      quantity: number;
   *      period: string;
   *      updated_at: number;
   *      created_at: number;
   *    };
   *    item: {
   *      id: number;
   *      merchant_id: number;
   *      merchant_uuid: string;
   *      active: boolean;
   *      title: string;
   *      access_control_type: {
   *        id: number;
   *        name: string;
   *        auth: boolean;
   *      };
   *      created_at: number;
   *      updated_at: number;;
   *      item_type: {
   *        id: number;
   *        name: string;
   *        content_type: string;
   *        host: string;
   *        description: string;
   *      };
   *      age_restriction: {};
   *      metadata: [{}];
   *      metahash?: {};
   *      content?: string;
   *      template_id: number;
   *      created_at: number;
   *      update_at: number;
   *    };
   *    trial_period: {
   *      quantity: number;
   *      period: string;
   *      description: string;
   *    };
   *    setup_fee: {
   *      id: number;
   *      fee_amount: number;
   *      description: string;
   *    };
   *    seasonal_fee: {
   *      id: number;
   *      access_fee_id: number;
   *      merchant_id: number;
   *      current_price_amount: number;
   *      off_season_access: boolean;
   *      anchor_date: number;
   *      created_at: number;
   *      updated_at: number;
   *    };
   *    external_fees: [{
   *      id: number;
   *      payment_provider_id: number;
   *      access_fee_id: number;
   *      external_id: string;
   *      merchant_id: number;
   *    }];
   *    geo_restriction: {
   *      id: number;
   *      country_iso: string;
   *      country_set_id: number;
   *      type: string;
   *    };
   *    current_phase: {
   *      access_fee_id: number;
   *      anchor_date: number;
   *      created_at: number;
   *      currency: string;
   *      current_price: number;
   *      expires_at: number;
   *      id: number;
   *      season_price: number;
   *      starts_at: number;
   *      status: string;
   *      updated_at: number;
   *    };
   * }
   * ```
   */
  async getAssetAccessFees(id: number): Promise<AxiosResponse<GetAccessFeesResponse>> {
    return this.request.get(API.getAssetAccessFees(id));
  }

  /**
   * Returns purchase history for different payment type
   * @method getAssetsHistory
   * @async
   * @param {number} size The number of items per page.
   * If it is not set the number of items per page will be 15.
   * @param {number} page The current page number.
   * If it is not set the starting page will be returned.
   * @param {string} startDate The staring date filter.
   * @param {string} endDate The ending date filter.
   * @param {string} type The payment type filter. (i.e 'gift-payment', 'donation').
   * @example
   *     InPlayer.Asset
   *     .getAssetsHistory()
   *     .then(data => console.log(data))
   * @returns  {AxiosResponse<AssetsTransactions>} Contains the data:
   * ```typescript
   * {
   *    collection: [{
   *      access_fee_description: string;
   *      action_type: string;
   *      charged_amount: number;
   *      client_id: string;
   *      consumer_email: string;
   *      consumer_id: number;
   *      continent: string;
   *      country: string;
   *      country_iso: string;
   *      created_at: string;
   *      currency_iso: string;
   *      device: {
   *        type: string;
   *        os: string;
   *        model: string;
   *      }
   *      donation_description: string;
   *      exchange_rate: number;
   *      expires_at: string;
   *      gateway_name: string;
   *      gift: {
   *        buyer_email: string;
   *        code: string;
   *        id: number;
   *        receiver_email: string;
   *      }
   *      ip_address: string;
   *      issued_by: number;
   *      item_access_id: number;
   *      item_id: number;
   *      item_title: string;
   *      item_type: string;
   *      merchant_id: number;
   *      note: string;
   *      payment_history_id: number;
   *      payment_method_name: string;
   *      payment_tool_info: string;
   *      payment_tool_token: string;
   *      referrer: string;
   *      settlement_currency: string;
   *      timestamp: number;
   *      transaction_token: string;
   *      trx_token: string;
   *      voucher_code: string;
   *      voucher_discount: string;
   *    }],
   *    total: number;
   *    unique_paying_customers: number;
   * }
   * ```
   */
  async getAssetsHistory(
    size = 10,
    page = 0,
    startDate?: string,
    endDate?: string,
    type?: string,
  ): Promise<AxiosResponse<AssetsTransactions>> {
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
   * Gets access with code for code access grant asset
   * @method requestCodeAccess
   * @async
   * @param {number} item_id The id of created premium content in InPlayer Dashboard (i.e asset id).
   * @param {string} code The code created for the premium content.
   * @throws Will throw an HTTP 400 error if the access code is already in use.
   * @throws Will throw an HTTP 401 error if the code is invalid.
   * @example
   *     InPlayer.Asset
   *     .requestCodeAccess({ assetId: 42599, code: 'access-code' })
   *     .then(data => console.log(data));
   * @returns {<AxiosResponse<CodeAccessData>>} Contains the data:
   * ```typescript
   * {
   *    item_id: number;
   *    content: string;
   *    in_use: boolean;
   *    browser_fingerprint: string;
   *    code: string;
   *    type: string;
   *    code_id: number;
   * }
   * ```
   */
  async requestCodeAccess({
    item_id,
    code,
  }: {
    item_id: number;
    code: string;
  }): Promise<AxiosResponse<CodeAccessData>> {
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

    formData.set('item_id', String(item_id));
    formData.set('code', String(code));
    formData.set('browser_fingerprint', browserFingerprint);

    const response = await this.request.post(API.requestCodeAccess, formData);

    const accessCode: AccessCodeData = {
      item_id,
      code,
      browser_fingerprint: browserFingerprint,
      code_id: response.data.code_id,
    };

    await tokenStorage.setItem(
      this.config.INPLAYER_ACCESS_CODE_NAME(item_id),
      JSON.stringify(accessCode),
    );

    return response;
  }

  /**
   * Retrieves the access code and browser fingerprint for the current asset from localStorage
   * Returns null if no access code is present
   * @method getAccessCode
   * @param {number} assetId The id of created premium content in InPlayer Dashboard (i.e asset id).
   * @example
   *    const accessCode = InPlayer.Asset.getAccessCode(42925);
   * @returns  {CodeAccessData | null} Contains the data:
   * ```typescript
   * {
   *    item_id: number;
   *    content: string;
   *    in_use: boolean;
   *    browser_fingerprint: string;
   *    code: string;
   *    type: string;
   *    code_id: number;
   * }
   * ```
   */
  getAccessCode(
    assetId: number,
  ): CodeAccessData | null | Promise<CodeAccessData | null> {
    const accessCode = tokenStorage.getItem(
      this.config.INPLAYER_ACCESS_CODE_NAME(assetId),
    );

    if (isPromise(accessCode)) {
      return (accessCode as Promise<string>).then((resolvedString) =>
        (resolvedString ? (JSON.parse(resolvedString) as CodeAccessData) : null)) as Promise<CodeAccessData | null>;
    }

    return accessCode
      ? (JSON.parse(accessCode as string) as CodeAccessData)
      : null;
  }

  /**
   * Gets sessions for the current browser
   * @method getAccesCodeSessions
   * @async
   * @param {number} codeId The id of code created for given premium content.
   * @example
   *     InPlayer.Asset
   *     .getAccesCodeSessions(429)
   *     .then(data => console.log(data));
   * @returns {<AxiosResponse<Array<CodeAccessSessionsData>>} Contains the data:
   * ```typescript
   * [{
   *    agent_info: string;
   *    browser_fingerprint: string;
   *    code: string;
   *    code_id: string;
   *    last_used: number;
   * }]
   * ```
   */
  async getAccesCodeSessions(
    codeId: number,
  ): Promise<AxiosResponse<Array<CodeAccessSessionsData>>> {
    return this.request.get(API.requestAccessCodeSessions(codeId));
  }

  /**
   * Terminates session for the current browser
   * @method terminateSession
   * @async
   * @param {number} assetId  The id of created premium content in InPlayer Dashboard (i.e asset id).
   * @example
   *     InPlayer.Asset
   *     .terminateSession(42599)
   *     .then(data => console.log(data));
   * @returns {AxiosResponse<CommonResponse> | null} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: 'Successfully deleted session'
   * }
   * ```
   */
  async terminateSession(
    assetId: number,
  ): Promise<AxiosResponse<CommonResponse> | null> {
    const accessCode: CodeAccessData | null = await this.getAccessCode(assetId);

    if (!accessCode) {
      return null;
    }

    const response = await this.request.delete(
      API.terminateSession(accessCode.code_id, accessCode.browser_fingerprint),
    );

    await tokenStorage.removeItem(
      this.config.INPLAYER_ACCESS_CODE_NAME(assetId),
    );

    return response;
  }

  /**
   * Gets access without authentication for asset with access control type data capture
   * @method requestDataCaptureNoAuthAccess
   * @async
   * @param {string} email The customer's email
   * @param {string} full_name The customer's full name
   * @param {string} company The customer's company
   * @param {string} merchant_uuid The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @returns {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: 'Access successfully granted'
   * }
   * ```
   */
  async requestDataCaptureNoAuthAccess({
    email,
    full_name,
    company,
    merchant_uuid,
  }: {
    email: string;
    full_name: string;
    company: string;
    merchant_uuid: string;
  }): Promise<AxiosResponse<CommonResponse>> {
    const accessData: RequestDataCaptureAccessData = {
      email,
      full_name,
      company,
      merchant_uuid,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return this.request.post(
      API.requestDataCaptureNoAuthAccess,
      qs.stringify(accessData),
      { headers },
    );
  }

  /**
   * Returns a signed Cloudfront URL with the merchant's signature
   * @method getCloudfrontURL
   * @async
   * @param {number} assetId The id of created premium content in InPlayer Dashboard (i.e asset id).
   * @param {string} videoUrl The video url
   * @example
   *     InPlayer.Asset
   *     .getCloudfrontURL(42599, 'url')
   *     .then(data => console.log(data));
   * @returns {AxiosResponse<CloudfrontUrl>} Contains the data:
   * ```typescript
   * {
   *    video_url: string;
   * }
   * ```
   */
  async getCloudfrontURL(
    assetId: number,
    videoUrl: string,
  ): Promise<AxiosResponse<CloudfrontUrl>> {
    const tokenObject = await this.request.getToken();

    return this.request.get(API.getCloudfrontURL(assetId, videoUrl), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Gets the donation options for the asset
   * @method getDonationOptions
   * @async
   * @param {number} assetId The id of created premium content in InPlayer Dashboard (i.e asset id).
   * @example
   *     InPlayer.Donation
   *     .getDonationOptions(42597)
   *     .then(data => console.log(data));
   * @returns {AxiosResponse<DonationDetails>} Contains the data:
   * ```typescript
   * {
   *    donations: [{
   *      id: number;
   *      item_id: number;
   *      amount: number;
   *      currency: string;
   *      description: string;
   *    }];
   *    donation_options: {
   *      id: number;
   *      item_id: number;
   *      custom_price_enabled: boolean;
   *    };
   * }
   * ```
   */
  async getDonationOptions(
    assetId: number,
  ): Promise<AxiosResponse<DonationDetails>> {
    const tokenObject = await this.request.getToken();

    return this.request.get(API.getDonations(assetId), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Retrieves a signed token for media protection
   * @method getSignedMediaToken
   * @async
   * @param {number} appConfigId The id of the config used on the OTT Web App
   * @param {number} mediaId The id of the requested media to watch on the OTT Web App
   * @example
   *     InPlayer.Asset
   *     .getSignedMediaToken('slgaIsfX', 'kAscZclP)
   *     .then(data => console.log(data));
   * @returns {AxiosResponse<SignedMediaResponse>} Contains the data:
   * ```typescript
   * {
   *    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX...
   * }
   */
  async getSignedMediaToken(
    appConfigId: string,
    mediaId: string,
  ): Promise<AxiosResponse<SignedMediaResponse>> {
    const tokenObject = await this.request.getToken();

    return this.request.get(API.getSignedMediaToken(appConfigId, mediaId), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }
}

export default Asset;
