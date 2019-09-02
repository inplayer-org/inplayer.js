import { CommonResponse, AdvanceError } from './CommonInterfaces';

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

export interface Item {
  id: number;
  merchant_id: number;
  merchant_uuid: string;
  is_active: boolean;
  title: string;
  access_control_type: AccessControlType;
  item_type: ItemType;
  age_restriction: Record<string, number>;
  metadata: Record<string, string>;
  created_at: number;
  update_at: number;
}

export interface CreateItem extends Item {}

export interface ItemError extends CommonResponse {}

export interface ItemError422 extends AdvanceError {}

// TODO: No 201 response for DeleteItem

export interface DeleteItemError extends CommonResponse {}

export interface UpdateItem extends Item {}

export interface UpdateItemError extends CommonResponse {}

export interface UpdateItemError422 extends AdvanceError {}

export interface PatchItem extends Item {}

export interface PatchItemError extends CommonResponse {}

export interface PatchItemError422 extends AdvanceError {}

export interface AccessType {
  id: number;
  name: string;
  quantity: number;
  period: string;
}

export interface TrialPeriod {
  quantity: number;
  period: string;
  description: string;
}

export interface SetupFee {
  fee_amount: number;
  description: string;
}

export interface GeoRestriction {
  id: number;
  country_iso: string;
  country_set_id: number;
  type: string;
}

export interface GetAccessFees extends GetAccessFee {}

export interface GetAccessFeesError extends CommonResponse {}

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

export interface PostFeeError extends CommonResponse {}

export interface PostFeeError422 extends AdvanceError {}

export interface GetAccessFee {
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

export interface GetAccessFeeError extends CommonResponse {}

//  No 204 response for DeleteAccessFee

export interface DeleteAccessFee extends CommonResponse {}

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

export interface PutAccessFeeError extends CommonResponse {}

export interface PutAccessFeeError422 extends AdvanceError {}

export interface PatchAccessFee extends GetAccessFee {}

export interface PatchAccessFeeError extends CommonResponse {}

export interface PatchAccessFeeError422 extends AdvanceError {}

export interface GetItemDetails extends Item {}

export interface GetItemDetailsError extends CommonResponse {}

//  ---------------------------------V1-----------------------------

export interface GetAccessFeesV1 extends GetAccessFee {}

export interface GetAccessFeesV1Error extends CommonResponse {}

export interface ItemV1 {
  content: string;
  id: number;
  merchant_id: number;
  merchant_uuid: string;
  is_active: boolean;
  title: string;
  access_control_type: AccessControlType;
  item_type: ItemType;
  age_restriction: Record<string, number>;
  metadata: Record<string, string>;
  created_at: number;
  update_at: number;
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
  item: ItemV1;
}

export interface GetItemAccessV1Error extends CommonResponse {}

// TODO: No 204 response for RevokeItemAccess

export interface RevokeItemAccessError extends CommonResponse {}

export interface GetItemDetailsV1 {
  id: number;
  merchant_id: number;
  merchant_uuid: string;
  is_active: boolean;
  title: string;
  access_control_type: AccessControlType;
  item_type: ItemType;
  age_restriction: Record<string, number>;
  metadata: Record<string, string>;
  created_at: number;
  update_at: number;
}

export interface GrantItemAccess extends GetItemAccessV1 {}

export interface GrantItemAccessError extends CommonResponse {}

export interface GrantItemAccessError422 extends AdvanceError {}

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

export interface GetCustomerAccessListGranted
  extends GetCustomerAccessListRevoked {}

export interface GetCustomerAccessListError extends CommonResponse {}

export interface AddUnlimitedItemAccess extends GetItemAccessV1 {}

export interface AddUnlimitedItemAccessError extends CommonResponse {}

// TODO: NOT GOOD! NOT GOOD AT ALL!!!

export interface CreateItemWithPrice {
  id: number;
}

export interface CreateItemWithPriceError extends CommonResponse {}

export interface CreateItemWithPriceError422 extends AdvanceError {}

export interface ExtendItemAccess extends GetItemAccessV1 {}

export interface ExtendItemAccessError extends CommonResponse {}

export interface ExtendItemAccessError422 extends AdvanceError {}

export interface PackageDetail {
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
  collection: PackageDetail;
}

export interface GetMerchantPackageError extends CommonResponse {}

export interface RequestCodeAccess {
  assetId: number;
  code: string;
}

export interface CodeAccessData {
  assetId: number;
  code: string;
}

export interface Asset {
  checkAccessForAsset(id: number): object;
  isFreeTrialUsed(id: number): object;
  getAsset(assetId: number, merchantUuid: string): object;
  getExternalAsset(
    assetType: string,
    externalId: string,
    merchantUuid: string
  ): object;
  getPackage(id: number): object;
  getAssetAccessFees(id: number): object;
  getAssetsHistory(
    size?: number,
    page?: number,
    startDate?: string,
    endDate?: string
  ): object;
  getFreemiumAsset(accessFeeId: number): object;
  requestCodeAccess(data: CodeAccessData): object;
  getAccessCode(assetId: number): object;
  releaseAccessCode(assetId: number): object;
  getCloudfrontURL(assetId: number, videoUrl: string): object;
}
