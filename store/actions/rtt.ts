import { AppDispatch } from "../store";
import base64 from "base-64";
import moment, { Moment } from "moment";

export const GET_STATION = "GET_STATION";
export const GET_STATION_ARRIVALS = "GET_STATION_ARRIVALS";
export const GET_SERVICE_INFORMATION = "GET_SERVICE_INFORMATION";

export const getStationDepartures = (
	crsCode: string,
	date: Moment,
	time: Moment,
	toCrsCode?: string
) => {
	return async (dispatch: AppDispatch) => {
		// TODO: Extract information into ENV and don't commit (possibly use cloud function)
		var headers = new Headers();
		headers.append(
			"Authorization",
			"Basic " +
				base64.encode(
					""
				)
		);

		const uri = toCrsCode
			? `https://api.rtt.io/api/v1/json/search/${crsCode}/to/${toCrsCode}/${date.year()}/${
					date.month() + 1
			  }/${date.date() < 10 ? "0" + date.date() : date.date()}/${
					time.hour() < 10 ? "0" + time.hour() : time.hour()
			  }${time.minute() < 10 ? "0" + time.minute() : time.minute()}`
			: `https://api.rtt.io/api/v1/json/search/${crsCode}/${date.year()}/${
					date.month() + 1
			  }/${date.date() < 10 ? "0" + date.date() : date.date()}/${
					time.hour() < 10 ? "0" + time.hour() : time.hour()
			  }${time.minute() < 10 ? "0" + time.minute() : time.minute()}`;

		var response = await fetch(uri, {
			method: "GET",
			headers: headers,
		});
		var result = await response.text();
		dispatch({
			type: GET_STATION,
			searchResult: JSON.parse(result),
		});
	};
};

export const getStationArrivals = (
	crsCode: string,
	date: Moment,
	time: Moment,
	toCrsCode?: string
) => {
	return async (dispatch: AppDispatch) => {
		// TODO: Extract information into ENV and don't commit (possibly use cloud function)
		var headers = new Headers();
		headers.append(
			"Authorization",
			"Basic " +
				base64.encode(
					""
				)
		);

		const uri = toCrsCode
			? `https://api.rtt.io/api/v1/json/search/${crsCode}/to/${toCrsCode}/${date.year()}/${
					date.month() + 1
			  }/${date.date() < 10 ? "0" + date.date() : date.date()}/${
					time.hour() < 10 ? "0" + time.hour() : time.hour()
			  }${
					time.minute() < 10 ? "0" + time.minute() : time.minute()
			  }/arrivals`
			: `https://api.rtt.io/api/v1/json/search/${crsCode}/${date.year()}/${
					date.month() + 1
			  }/${date.date() < 10 ? "0" + date.date() : date.date()}/${
					time.hour() < 10 ? "0" + time.hour() : time.hour()
			  }${
					time.minute() < 10 ? "0" + time.minute() : time.minute()
			  }/arrivals`;

		var response = await fetch(uri, {
			method: "GET",
			headers: headers,
		});
		var result = await response.text();
		dispatch({
			type: GET_STATION_ARRIVALS,
			searchResult: JSON.parse(result),
		});
	};
};

export const getServiceInformation = (serviceUid: string) => {
	return async (dispatch: AppDispatch) => {
		// TODO: Extract information into ENV and don't commit (possibly use cloud function)
		var headers = new Headers();
		headers.append(
			"Authorization",
			"Basic " +
				base64.encode(
					""
				)
		);

		var response = await fetch(
			`https://api.rtt.io/api/v1/json/service/${serviceUid}/${moment().year()}/${
				moment().month() + 1
			}/${
				moment().date() < 10 ? "0" + moment().date() : moment().date()
			}`,
			{
				method: "GET",
				headers: headers,
			}
		);
		var result = await response.text();
		dispatch({
			type: GET_SERVICE_INFORMATION,
			serviceInformation: JSON.parse(result),
		});
	};
};
