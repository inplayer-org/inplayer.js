import { AxiosResponse } from 'axios';
import { BaseExtend } from './CommonInterfaces';

export interface AccessControlType {
  id: number;
  name: string;
  auth: boolean;
}

export interface ItemType {
  id: number;
  name: string;
  content_type: string;
  host: string;
  description: string;
}

export interface AgeRestriction {
  min_age: number;
}

export interface Item {
  id: number;
  merchant_id: number;
  merchant_uuid: string;
  active: boolean;
  title: string;
  access_control_type: AccessControlType;
  item_type: ItemType;
  age_restriction: AgeRestriction | null;
  metadata?: Array<Record<string, string>>;
  metahash?: Record<string, string>;
  content?: string;
  template_id: number | null;
  created_at: number;
  update_at: number;
}

export interface AccessType {
  id: number;
  account_id: number;
  name: string;
  quantity: number;
  period: string;
  updated_at: number;
  created_at: number;
}

export interface TrialPeriod {
  quantity: number;
  period: string;
  description: string;
}

export interface SetupFee {
  id: number;
  fee_amount: number;
  description: string;
}

export interface GeoRestriction {
  id: number;
  country_iso: string;
  country_set_id: number;
  type: string;
}

export interface PostFee {
  id: number;
  merchant_id: number;
  amount: number;
  currency: string;
  description: string;
  item: Item;
  access_type: AccessType;
  trial_period: TrialPeriod;
  setup_fee: SetupFee;
  geo_restriction: GeoRestriction;
  expires_at: number;
}

export interface SeasonalFee {
  id: number;
  access_fee_id: number;
  merchant_id: number;
  current_price_amount: number;
  off_season_access: boolean;
  anchor_date: number;
  created_at: number;
  updated_at: number;
}

export interface ExternalFee {
  id: number;
  payment_provider_id: number;
  access_fee_id: number;
  external_id: string;
  merchant_id: number;
}

export interface CurrentPhase {
  access_fee_id: number;
  anchor_date: number;
  created_at: number;
  currency: string;
  current_price: number;
  expires_at: number;
  id: number;
  season_price: number;
  starts_at: number;
  status: string;
  updated_at: number;
}

export interface GetAccessFee {
  id: number;
  merchant_id: number;
  amount: number;
  currency: string;
  description: string;
  expires_at: number;
  starts_at: number;
  updated_at: number;
  created_at: number;
  access_type: AccessType;
  item: Item;
  trial_period: TrialPeriod;
  setup_fee: SetupFee | null;
  seasonal_fee: SeasonalFee | null;
  external_fees: Array<ExternalFee> | null;
  geo_restriction: GeoRestriction | null;
  current_phase: CurrentPhase | null;
}

export interface PutAccessFee {
  id: number;
  merchant_id: number;
  amount: number;
  currency: string;
  description: string;
  item: Item;
  access_type: AccessType;
  trial_period: TrialPeriod;
  setup_fee: SetupFee;
  geo_restriction: GeoRestriction;
  expires_at: number;
}

//  ---------------------------------V1-----------------------------

export interface ItemDetailsV1 {
  id: number;
  merchant_id: number;
  merchant_uuid: string;
  is_active: boolean;
  title: string;
  access_control_type: AccessControlType;
  item_type: ItemType;
  age_restriction: Record<string, number>;
  metadata: Record<string, string>[];
  created_at: number;
  updated_at: number;
}

export interface ItemDetailsAccess extends ItemDetailsV1 {
  content: string;
}

export interface ExternalItemDetails extends ItemDetailsV1 {
  access_fees: GetAccessFee[];
  metahash: Record<string, string>;
}

export interface GetItemAccessV1 {
  id: number;
  account_id: number;
  customer_id: number;
  customer_uuid: string;
  ip_address: string;
  country_code: string;
  created_at: number;
  expires_at: number;
  item: ItemDetailsAccess;
}

export interface GetCustomerAccessListRevoked {
  type: string;
  expires_at: number;
  revoked: number;
  merchant_id: number;
  customer_id: number;
  customer_email: string;
  item_id: number;
  item_title: string;
  item_access_id: number;
  starts_at: number;
  created_at: number;
}

export interface GetCustomerAccessListPurcased {
  type: string;
  purchased_access_fee_id: number;
  purchased_access_fee_description: string;
  purchased_access_fee_type: string;
  purchased_amount: number;
  perchased_currency: string;
  is_trial: boolean;
  payment_method: string;
  payment_tools: string;
  merchant_id: number;
  customer_id: number;
  customer_email: string;
  item_id: number;
  item_title: string;
  item_access_id: number;
  starts_at: number;
  created_at: number;
}

export interface PackageDetails {
  id: number;
  merchant_id: number;
  is_active: boolean;
  title: string;
  content: string;
  item_type: ItemType;
  metadata: Record<string, string>;
  items: number;
}

export interface GetMerchantPackage {
  total: number;
  page: number;
  offset: number;
  limit: number;
  collection: PackageDetails;
}

export interface RequestCodeAccessData {
  item_id: number;
  code: string;
}

export interface CodeAccessData {
  item_id: number;
  content: any;
  in_use: boolean;
  browser_fingerprint: any;
  code: string;
  type: string;
  code_id: number;
}

export interface RequestDataCaptureAccessData {
  email: string;
  full_name: string;
  company: string;
  merchant_uuid: string;
}

export interface CodeAccessSessionsData {
  id: number;
  code: string;
  browser_fingerprint: any;
  agent_info: string;
  last_used: number;
}

export interface CloudfrontUrl {
  video_url: string;
}

export interface DonationOption {
  id: number;
  item_id: number;
  amount: number;
  currency: string;
  description?: string;
}

export interface CustomDonationOption {
  id: number;
  item_id: number;
  custom_price_enabled: boolean;
}

export interface DonationDetails {
  donations: Array<DonationOption> | null;
  donation_options: CustomDonationOption;
}

export interface Asset extends BaseExtend {
  checkAccessForAsset(id: number): Promise<AxiosResponse<GetItemAccessV1>>;
  isFreeTrialUsed(id: number): Promise<AxiosResponse<any>>;
  getAsset(
    assetId: number,
    merchantUuid: string
  ): Promise<AxiosResponse<ItemDetailsV1>>;
  getExternalAsset(
    assetType: string,
    externalId: string,
    merchantUuid: string
  ): Promise<AxiosResponse<ExternalItemDetails>>;
  getPackage(id: number): Promise<AxiosResponse<GetMerchantPackage>>;
  getAssetAccessFees(id: number): Promise<AxiosResponse<GetAccessFee>>;
  getAssetsHistory(
    size?: number,
    page?: number,
    startDate?: string,
    endDate?: string,
    type?: string,
  ): Promise<AxiosResponse<Record<string, unknown>[]>>;
  getAccessCode(assetId: number): CodeAccessData | null | Promise<CodeAccessData | null>;
  requestCodeAccess(data: RequestCodeAccessData): Promise<AxiosResponse<CodeAccessData>>;
  getAccesCodeSessions(codeId: number): Promise<AxiosResponse<Array<CodeAccessSessionsData>>>;
  terminateSession(assetId: number): Promise<AxiosResponse<null>>;
  getCloudfrontURL(
    assetId: number,
    videoUrl: string
  ): Promise<AxiosResponse<CloudfrontUrl>>;
  getDonationOptions(assetId: number): Promise<AxiosResponse<DonationDetails>>;
}
