import { AppDispatch } from "../store";
import { Moment } from "moment";
import { FUNCTION_URL, FUNCTION_TOKEN } from "@env";

export const GET_STATION_INFORMATION = "GET_STATION_INFORMATION";
export const GET_SERVICE_INFORMATION = "GET_SERVICE_INFORMATION";

export const getStationInformation = (
    crsCode: string,
    date?: Moment,
    time?: Moment,
    toCrsCode?: string,
    arrivals?: boolean,
) => {
    return async (dispatch: AppDispatch) => {
        // TODO: Extract information into ENV
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Basic ${FUNCTION_TOKEN}`);

        let uri = `https://api.rtt.io/api/v1/json/search/${crsCode}`;

        if (toCrsCode) uri = uri.concat(`/to/${toCrsCode}`);
        if (date)
            uri = uri.concat(
                `/${date.year()}/${
                    date.month() + 1 < 10
                        ? "0" + (date.month() + 1)
                        : date.month() + 1
                }/${date.date() < 10 ? "0" + date.date() : date.date()}`,
            );
        if (time)
            uri = uri.concat(
                `/${time.hour() < 10 ? "0" + time.hour() : time.hour()}${
                    time.minute() < 10 ? "0" + time.minute() : time.minute()
                }`,
            );
        if (arrivals) uri = uri.concat("/arrivals");

        var response = await fetch(FUNCTION_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                uri: uri,
            }),
        });

        var result = await response.json();

        dispatch({
            type: GET_STATION_INFORMATION,
            searchResult: JSON.parse(result.body),
        });
    };
};

export const getServiceInformation = (serviceUid: string, date: Moment) => {
    return async (dispatch: AppDispatch) => {
        // TODO: Extract information into ENV
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Basic ${FUNCTION_TOKEN}`);

        const uri = `https://api.rtt.io/api/v1/json/service/${serviceUid}/${date.year()}/${
            date.month() + 1 < 10 ? "0" + (date.month() + 1) : date.month() + 1
        }/${date.date() < 10 ? "0" + date.date() : date.date()}`;

        var response = await fetch(FUNCTION_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                uri: uri,
            }),
        });

        var result = await response.json();

        dispatch({
            type: GET_SERVICE_INFORMATION,
            serviceInformation: JSON.parse(result.body),
        });
    };
};
