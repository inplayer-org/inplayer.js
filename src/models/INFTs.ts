import { AxiosResponse } from 'axios';
import { BaseExtend } from './CommonInterfaces';
import { GetAccessFee } from './IAsset&Access';

type FiatCurrency = string;

export enum CryptoCurrency {
  ETH = 'ETH',
  MATIC = 'MATIC',
  USDC = 'USDC',
}

export interface GetMerchantMarketplaceResponse {
  id: number;
  merchant_uuid: string;
  name: string;
  logo_url: string;
  banner_url: string;
  created_at: number;
  updated_at: number;
  engagement_mode: boolean;
  url: string;
  currency: FiatCurrency;
}

export interface CryptoPrice {
  amount: number;
  currency: CryptoCurrency;
}

export enum Prices {
  CRYPTO = 'crypto',
  FIAT = 'fiat',
}

export interface GetMerchantNFTResponse {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  token_uri: string;
  merchant_uuid: string;
  prices: Partial<{
    [Prices.CRYPTO]: CryptoPrice;
    [Prices.FIAT]: GetAccessFee
  }>;
  published: boolean;
  supply: number;
  created_at: number;
  updated_at: number;
}

export interface GetMerchantNFTListResponse {
  collection: GetMerchantNFTResponse[] | null;
  page: number;
  size: number;
  total: number;
}

interface ExchangeRate {
  asset_id_quote: CryptoCurrency;
  rate: number;
}

export interface GetExchangeRatesResponse {
  asset_id_base: FiatCurrency;
  rates: ExchangeRate[];
}

export type GetMyNFTsResponse = GetMerchantNFTListResponse;

export interface MakeNFTReservationResponse {
  created_at: number;
  updated_at: number;
  description: string;
  id: number;
  merchant_uuid: string;
  prices: Record<string, unknown>;
  published: boolean;
  reservation_expires_at: number;
  reservation_id: number;
  reservation_owner_id: number;
  supply: number;
  thumbnail: string;
  title: string;
  token_id: number;
  token_uri: string;
}

export interface NFTs extends BaseExtend {
  getMerchantMarketplace(merchantUuid: string): Promise<AxiosResponse<GetMerchantMarketplaceResponse>>;
  getMerchantNFTList(merchantUuid: string, page?: number, size?: number, filter?: string):
    Promise<AxiosResponse<GetMerchantNFTListResponse>>;
  getMerchantNFT(merchantUuid: string, nftId: number): Promise<AxiosResponse<GetMerchantNFTResponse>>;
  getExchangeRates(fiat: string, invert?: boolean): Promise<AxiosResponse<GetExchangeRatesResponse>>;
  getUserBoughtNFTs(page?: number, size?: number): Promise<AxiosResponse<GetMyNFTsResponse>>;
  makeReservation(merchantUuid: string, nftId: number): Promise<AxiosResponse<MakeNFTReservationResponse>>;
}
