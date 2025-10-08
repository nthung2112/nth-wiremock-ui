export type MappingRequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "ANY";

export type MappingRequestUrlMatchType =
  | "url"
  | "urlPattern"
  | "urlPath"
  | "urlPathPattern"
  | "anyUrl";

export type MappingRequestParamMatchType =
  | "equalTo"
  | "matches"
  | "contains"
  | "doesNotMatch"
  | "absent"
  | "equalToXml"
  | "matchesXPath"
  | "equalToJson"
  | "matchesJsonPath";

export const mappingRequestMethods: MappingRequestMethod[] = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "ANY",
];

export const mappingRequestParamMatchTypes: MappingRequestParamMatchType[] = [
  "equalTo",
  "matches",
  "contains",
  "doesNotMatch",
  "absent",
];

export const mappingRequestBodyPatternMatchTypes: MappingRequestParamMatchType[] = [
  ...mappingRequestParamMatchTypes,
  "equalToXml",
  "matchesXPath",
  "equalToJson",
  "matchesJsonPath",
];

export interface IMappingRequestParams {
  [key: string]: {
    [matchType in MappingRequestParamMatchType]?: string;
  };
}

export type IMappingRequestBodyPattern = {
  [matchType in MappingRequestParamMatchType]?: string;
};

export interface IMappingRequest {
  method: MappingRequestMethod;
  url?: string;
  urlPattern?: string;
  urlPath?: string;
  urlPathPattern?: string;
  queryParameters?: IMappingRequestParams;
  headers?: IMappingRequestParams;
  cookies?: IMappingRequestParams;
  bodyPatterns?: IMappingRequestBodyPattern[];
}

export enum MappingResponseDelayType {
  Uniform = "uniform",
  LogNormal = "lognormal",
}

export enum MappingResponseFault {
  EmptyResponse = "EMPTY_RESPONSE",
  RandomDataThenClose = "RANDOM_DATA_THEN_CLOSE",
  MalformedResponseChunk = "MALFORMED_RESPONSE_CHUNK",
  ConnectionResetByPeer = "CONNECTION_RESET_BY_PEER",
}

export interface IMappingResponseUniformDelayDistribution {
  type: MappingResponseDelayType.Uniform;
  lower: number;
  upper: number;
}

export interface IMappingResponseLogNormalDelayDistribution {
  type: MappingResponseDelayType.LogNormal;
  median: number;
  sigma: number;
}

export interface IMappingResponse {
  status: number;
  fault?: MappingResponseFault;
  body?: string;
  bodyFileName?: string;
  headers?: {
    [key: string]: string;
  };
  fixedDelayMilliseconds?: number;
  delayDistribution?:
    | IMappingResponseUniformDelayDistribution
    | IMappingResponseLogNormalDelayDistribution;
}

export interface IMapping {
  id: string;
  uuid: string;
  name?: string;
  priority?: number;
  request: IMappingRequest;
  response: IMappingResponse;
}

export interface IMappingCollection {
  mappings: IMapping[];
  meta: {
    total: number;
  };
}

export interface IMappingRequestParamFormValue {
  key: string;
  matchType: MappingRequestParamMatchType;
  value: string;
}

export interface IMappingRequestBodyPatternFormValue {
  matchType: MappingRequestParamMatchType;
  value: string;
}

export interface IMappingResponseHeaderFormValue {
  key: string;
  value: string;
}

export interface IMappingFormValues {
  id: string;
  uuid: string;
  name?: string;
  priority: "auto" | number;
  method: MappingRequestMethod;
  url: string;
  urlMatchType: MappingRequestUrlMatchType;
  queryParameters: IMappingRequestParamFormValue[];
  requestHeaders: IMappingRequestParamFormValue[];
  requestCookies: IMappingRequestParamFormValue[];
  requestBodyPatterns: IMappingRequestBodyPatternFormValue[];
  responseStatus: number;
  responseFault?: MappingResponseFault;
  responseHeaders: IMappingResponseHeaderFormValue[];
  responseBody?: string;
  responseBodyFileName?: string;
  responseDelayMilliseconds?: number;
  responseDelayDistribution?:
    | IMappingResponseUniformDelayDistribution
    | IMappingResponseLogNormalDelayDistribution;
}
