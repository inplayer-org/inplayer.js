import { AxiosResponse } from 'axios';
import { ApiConfig, Request } from '../models/Config';
import BaseExtend from '../extends/base';
import { API } from '../constants';
import {
  GetMerchantMarketplaceResponse,
  GetMerchantNFTListResponse,
  GetMerchantNFTResponse,
  GetExchangeRatesResponse,
  GetMyNFTsResponse,
  MakeNFTReservationResponse,
} from '../models/INFTs';

/**
 * Contains all Requests connected with NFTs
 *
 * @class NFTs
 */
class NFTs extends BaseExtend {
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
  }

  /**
   * Returns a merchant's Marketplace data if there is one
   * @method getMerchantMarketplace
   * @async
   * @param {string} merchantUuid The Merchant's unique universal identifier (Merchant UUID).
   * @returns Promise<AxiosResponse<GetMerchantMarketplaceResponse>>
   */
  async getMerchantMarketplace(merchantUuid: string): Promise<AxiosResponse<GetMerchantMarketplaceResponse>> {
    return this.request.get(API.getMerchantMarketplace(merchantUuid));
  }

  /**
   * Returns a list of NFT items sold by a merchant
   * @method getMerchantNFTList
   * @async
   * @param {string} merchantUuid The Merchant's unique universal identifier (Merchant UUID).
   * @param {number} page The current page number.
   * If it is not set the starting page will be returned. Defaults to 1
   * @param {number} size The maximum mumber of items returned in the response. Defaults to 50
   * @param {string} filter Parameter by which the returned items in the list to be filtered. Defaults to "published"
   * @returns Promise<AxiosResponse<GetMerchantNFTListResponse>>
   */
  async getMerchantNFTList(
    merchantUuid: string,
    page = 1,
    size = 50,
    filter = 'published',
  ): Promise<AxiosResponse<GetMerchantNFTListResponse>> {
    return this.request.get(API.getMerchantNFTList(merchantUuid, page, size, filter));
  }

  /**
   * Returns a specific NFT item sold by a merchant
   * @method getMerchantNFT
   * @async
   * @param {string} merchantUuid The Merchant's unique universal identifier (Merchant UUID).
   * @param {number} nftId The unique NFT identifier
   * @returns Promise<AxiosResponse<GetMerchantNFTResponse>>
   */
  async getMerchantNFT(merchantUuid: string, nftId: number): Promise<AxiosResponse<GetMerchantNFTResponse>> {
    return this.request.get(API.getMerchantNFT(merchantUuid, nftId));
  }

  /**
   * Returns exchange rates of a specific FIAT currency in respect to a list crypto currencies
   * @method getExchangeRates
   * @param {string} fiat The FIAT currency
   * @param {boolean} invert Whether the returned rates to be in their inverted exchange rates
   * @returns Promise<AxiosResponse<GetExchangeRatesResponse>>
   */
  async getExchangeRates(fiat: string, invert = false): Promise<AxiosResponse<GetExchangeRatesResponse>> {
    return this.request.get(API.getExchangeRates(fiat, invert));
  }

  /**
   * Returns a list of NFTs bought and owned by an authenticated user
   * @method getUserBoughtNFTs
   * @param {number} page The current page number.
   * If it is not set the starting page will be returned. Defaults to 1
   * @param {number} size The maximum mumber of items returned in the response. Defaults to 50
   * @returns Promise<AxiosResponse<GetMyNFTsResponse>>
   */
  async getUserBoughtNFTs(page = 1, size = 50): Promise<AxiosResponse<GetMyNFTsResponse>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.getUserBoughtNFTs(page, size), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Makes a reservation request for a specific NFT and returns the relevant data when
   * that reservation is completed successfully
   * @method makeReservation
   * @param {string} merchantUuid The Merchant's unique universal identifier (Merchant UUID).
   * @param {number} nftId The unique NFT identifier
   * @returns Promise<AxiosResponse<MakeNFTReservationResponse>>
   */
  async makeReservation(merchantUuid: string, nftId: number): Promise<AxiosResponse<MakeNFTReservationResponse>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(API.makeReservation(merchantUuid, nftId), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }
}

export default NFTs;
