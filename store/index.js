import httpClient from '../static/js/ajax.js'

export function get(url,params){
	return httpClient.Get(url,params)
};
export function post(url,params){
	return httpClient.Post(url,params)
};
