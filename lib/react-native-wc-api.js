'use strict';
import OAuth from "oauth-1.0a";
import CryptoJS from 'crypto-js';
import axios from 'axios';

/**
 * WooCommerce REST API wrapper
 *
 * @param {Object} opt
 */
export default class WooCommerceAPI {

    constructor(opt) {
        if (!(this instanceof WooCommerceAPI)) {
            return new WooCommerceAPI(opt);
        }
        opt = opt || {};
        if (!(opt.url)) {
            throw new Error('url is required');
        }
        if (!(opt.consumerKey)) {
            throw new Error('consumerKey is required');
        }
        if (!(opt.consumerSecret)) {
            throw new Error('consumerSecret is required');
        }
        this.classVersion = '1.1.1';
        this._setDefaultsOptions(opt);
    }


	/**
	 * Set default options
	 *
	 * @param {Object} opt
	 */
    _setDefaultsOptions(opt) {
        this.url = opt.url;
        this.wpAPI = opt.wpAPI || false;
        this.wpAPIPrefix = opt.wpAPIPrefix || 'wp-json';
        this.version = opt.version || 'v3';
        this.isSsl = /^https/i.test(this.url);
        this.consumerKey = opt.consumerKey;
        this.consumerSecret = opt.consumerSecret;
        this.verifySsl = false === opt.verifySsl ? false : true;
        this.encoding = opt.encoding || 'utf8';
        this.queryStringAuth = opt.queryStringAuth || false;
        this.port = opt.port || '';
        this.timeout = opt.timeout || 30;
    }


	/**
	 * Normalize query string for oAuth
	 *
	 * @param  {string} url
	 * @return {string}
	 */
    _normalizeQueryString(url) {
        // Exit if don't find query string
        if (-1 === url.indexOf('?')) {
            return url;
        }
        // let query       = _url.parse(url, true).query;
        let query = url;
        let params = [];
        let queryString = '';
        for (let p in query) {
            params.push(p);
        }
        params.sort();
        for (let i in params) {
            if (queryString.length) {
                queryString += '&';
            }
            queryString += encodeURIComponent(params[i]).replace('%5B', '[').replace('%5D', ']');
            queryString += '=';
            queryString += encodeURIComponent(query[params[i]]);
        }
        return url.split('?')[0] + '?' + queryString;
    }


	/**
	 * Get URL
	 *
	 * @param  {String} endpoint
	 *
	 * @return {String}
	 */
    _getUrl(endpoint) {
        let url = '/' === this.url.slice(-1) ? this.url : this.url + '/';
        let api = this.wpAPI ? this.wpAPIPrefix + '/' : 'wp-json/';
        url = url + api + this.version + '/' + endpoint;
        // Include port.
        if ('' !== this.port) {
            let hostname = url; //_url.parse(url, true).hostname;
            url = url.replace(hostname, hostname + ':' + this.port);
        }
        if (!this.isSsl) {
            return this._normalizeQueryString(url);
        }
        return url;
    }


	/**
	 * Get OAuth
	 *
	 * @return {Object}
	 */
    _getOAuth() {
        let data = {
            consumer: {
                key: this.consumerKey,
                secret: this.consumerSecret
            },
            signature_method: 'HMAC-SHA256',
            hash_function: (base_string, key) => {
                return CryptoJS.HmacSHA256(base_string, key).toString(CryptoJS.enc.Base64);
            }
        };
        if (-1 < ['v1', 'v2'].indexOf(this.version)) {
            data.last_ampersand = false;
        }
        return new OAuth(data);
    }

	/**
	 * Join key object value to string by separator
	 */
    join(obj, separator) {
        let arr = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(key + '=' + obj[key]);
            }
        }
        return arr.join(separator);
    }


	/**
	 * Do requests
	 *
	 * @param  {String}   method
	 * @param  {String}   endpoint
	 * @param  {Object}   data
	 *
	 * @return {Object}
	 */
    _request(method, endpoint, data) {
        let requestUrl = this._getUrl(endpoint);
        let authParams = {};
        let config = {
            method: method,
            headers: {
                'User-Agent': 'WooCommerce API React Native/' + this.classVersion,
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: data,
            responseEncoding: this.encoding,
            timeout: this.timeout,
        }

        if (this.isSsl) {
            if (this.queryStringAuth) {
                authParams = {
                    consumer_key: this.consumerKey,
                    consumer_secret: this.consumerSecret
                };
            } else {
                config.auth = {
                    username: this.consumerKey,
                    password: this.consumerSecret
                };
            }
            // if (!this.verifySsl) {
            //     params.strictSSL = false;
            // }
        } else {
            authParams = this._getOAuth().authorize({
                url: requestUrl,
                method: method,
                data: data
            });
            // encode the oauth_signature to make sure it not remove + charactor
            authParams.oauth_signature = encodeURIComponent(authParams.oauth_signature);
        }

        if (requestUrl.includes('?')) {
            requestUrl += '&' + this.join(authParams, '&');
        } else {
            requestUrl += '?' + this.join(authParams, '&');
        }

        return axios(requestUrl, config).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    }


    /**
     * GET requests
     *
     * @param  {String}   endpoint
     *
     * @return {Object}
     */
    get(endpoint, data) {
        return this._request('get', endpoint, data);
    }


    /**
     * POST requests
     *
     * @param  {String}   endpoint
     * @param  {Object}   data
     *
     * @return {Object}
     */
    post(endpoint, data) {
        return this._request('post', endpoint, data);
    }


    /**
     * PUT requests
     *
     * @param  {String}   endpoint
     * @param  {Object}   data
     *
     * @return {Object}
     */
    put(endpoint, data) {
        return this._request('put', endpoint, data);
    }


    /**
     * DELETE requests
     *
     * @param  {String}   endpoint
     *
     * @return {Object}
     */
    delete(endpoint) {
        return this._request('delete', endpoint, null);
    }


    /**
     * OPTIONS requests
     *
     * @param  {String}   endpoint
     *
     * @return {Object}
     */
    options(endpoint, callback) {
        return this._request('options', endpoint, null);
    }
}