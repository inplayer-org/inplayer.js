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

  async getMerchantMarketplace(merchantUuid: string): Promise<AxiosResponse<GetMerchantMarketplaceResponse>> {
    return this.request.get(API.getMerchantMarketplace(merchantUuid));
  }

  async getMerchantNFTList(
    merchantUuid: string,
    page = 1,
    size = 50,
    filter = 'published',
  ): Promise<AxiosResponse<GetMerchantNFTListResponse>> {
    return this.request.get(API.getMerchantNFTList(merchantUuid, page, size, filter));
  }

  async getMerchantNFT(merchantUuid: string, nftId: number): Promise<AxiosResponse<GetMerchantNFTResponse>> {
    return this.request.get(API.getMerchantNFT(merchantUuid, nftId));
  }

  async getExchangeRates(fiat: string, invert = false): Promise<AxiosResponse<GetExchangeRatesResponse>> {
    return this.request.get(API.getExchangeRates(fiat, invert));
  }

  async getMyNFTs(page = 1, size = 50): Promise<AxiosResponse<GetMyNFTsResponse>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.getMyNFTs(page, size), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  async makeNFTReservation(merchantUuid: string, nftId: number): Promise<AxiosResponse<MakeNFTReservationResponse>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.makeNFTReservation(merchantUuid, nftId), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }
}

export default NFTs;
