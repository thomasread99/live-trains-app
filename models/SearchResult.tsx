class SearchResult {
    location: LocationDetail;
    filter?: LocationDetail[];
    services: LocationContainer[];
}

class LocationDetail {
    name: string;
    crs: string;
    tiploc: string;
    country: string;
    system: string;
}

class LocationContainer {
    locationDetail: LocationObj;
    serviceUid: string;
    runDate: Date;
    trainIdentity: string;
    runningIdentity: string;
    atocCode: string;
    atocName: string;
    serviceType: string;
    isPassenger: boolean;
    plannedCancel?: boolean;
    countdownMinutes?: number;
}

class LocationObj {
    realtimeActivated: boolean;
    tiploc: string;
    crs?: string;
    description: string;
    wttBookedArrival?: string;
    wttBookedDeparture?: string;
    wttBookedPass?: string;
    gbttBookedArrival?: string;
    gbttBookedDeparture?: string;
    origin: Pair[];
    destination: Pair[];
    isCall: boolean;
    isPublicCall: boolean;
    realtimeArrival?: string;
    realtimeArrivalActual: boolean;
    realtimeArrivalNoReport: boolean;
    realtimeWttArrivalLateness: number;
    realtimeGbttArrivalLateness: number;
    realtimeDeparture?: string;
    realtimeDepartureActual: boolean;
    realtimeDepartureNoReport: boolean;
    realtimeWttDepartureLateness: number;
    realtimeGbttDepartureLateness: number;
    realtimePass?: string;
    realtimePassActual: boolean;
    realtimePassNoReport: boolean;
    platform: string;
    platformConfirmed: boolean;
    platformChanged: boolean;
    line: string;
    lineConfirmed: boolean;
    path: string;
    pathConfirmed: boolean;
    cancelReasonCode?: string;
    cancelReasonShortText?: string;
    cancelReasonLongText?: string;
    displayAs: string;
    serviceLocation?: string;
}

class Pair {
    tiploc: string;
    description: string;
    workingTime: string;
    publicTime: string;
}
