import { AppDispatch } from "../store";
import base64 from "base-64";

export const GET_STATION = "GET_STATION";

export const searchStation = () => {
	return async (dispatch: AppDispatch) => {
		// TODO: Extract information into ENV and don't commit (possibly use cloud function)
		var headers = new Headers();
		headers.append(
			"Authorization",
			"Basic " +
				base64.encode(
					"AUTH_HERE"
				)
		);

		var response = await fetch(
			"https://api.rtt.io/api/v1/json/search/BMH",
			{
				method: "GET",
				headers: headers,
			}
		);
		var result = await response.text();
		dispatch({
			type: GET_STATION,
			searchResult: JSON.parse(result),
		});		
	};
};
