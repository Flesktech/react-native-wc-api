# WooCommerce API - React-Native Client

A React-Native wrapper for the WooCommerce REST API. Easily interact with the WooCommerce REST API using this library.

[![dependency status](https://david-dm.org/IntelliJAbhishek/react-native-wc-api.svg)](https://david-dm.org/IntelliJAbhishek/react-native-wc-api)
[![npm version](https://img.shields.io/npm/v/react-native-wc-api.svg)](https://www.npmjs.com/package/react-native-wc-api)

## Installation

To install the module using NPM:
```
npm install react-native-wc-api --save
```

To install the module using Yarn:
```
yarn add react-native-wc-api
```

## Getting started

Generate API credentials (Consumer Key & Consumer Secret) following this instructions <http://docs.woocommerce.com/document/woocommerce-rest-api/>
.

Check out the WooCommerce API endpoints and data that can be manipulated in <http://woocommerce.github.io/woocommerce-rest-api-docs/>.

## Setup

Setup for the new WP REST API integration (WooCommerce 2.6 or later):

```javascript
import WooCommerceAPI from 'react-native-wc-api';

const WooCommerce = new WooCommerceAPI({
  url: 'http://example.com',
  consumerKey: 'ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  consumerSecret: 'cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  wpAPI: true,
  version: 'wc/v1'
});
```

Setup for the old WooCommerce legacy API:

```javascript
import WooCommerceAPI from 'react-native-wc-api';

const WooCommerce = new WooCommerceAPI({
  url: 'http://example.com',
  consumerKey: 'ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  consumerSecret: 'cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  version: 'v3'
});
```

### Options

|       Option      |    Type   | Required |                                               Description                                                |
|-------------------|-----------|----------|----------------------------------------------------------------------------------------------------------|
| `url`             | `String`  | yes      | Your Store URL, example: http://woo.dev/                                                                 |
| `consumerKey`     | `String`  | yes      | Your API consumer key                                                                                    |
| `consumerSecret`  | `String`  | yes      | Your API consumer secret                                                                                 |
| `wpAPI`           | `Bool`    | no       | Allow requests to the WP REST API (WooCommerce 2.6 or later)                                             |
| `wpAPIPrefix`     | `String`  | no       | Custom WP REST API URL prefix, used to support custom prefixes created with the `rest_url_prefix` filter |
| `version`         | `String`  | no       | API version, default is `v3`                                                                             |
| `verifySsl`       | `Bool`    | no       | Verify SSL when connect, use this option as `false` when need to test with self-signed certificates      |
| `encoding`        | `String`  | no       | Encoding, default is 'utf-8'                                                                             |
| `queryStringAuth` | `Bool`    | no       | When `true` and using under HTTPS force Basic Authentication as query string, default is `false`         |
| `port`            | `string`  | no       | Provide support for URLs with ports, eg: `8080`                                                          |
| `timeout`         | `Integer` | no       | Define the request timeout                                                                               |

## Methods

|   Params   |    Type    |                         Description                          |
|------------|------------|--------------------------------------------------------------|
| `endpoint` | `String`   | WooCommerce API endpoint, example: `customers` or `order/12` |
| `data`     | `Object`   | JS object, will be converted to JSON                         |



**Instantiating a WooCommerceAPI instance without a url, consumerKey or secret will result in an error being thrown**

### GET

- `.get(endpoint)`

### POST

- `.post(endpoint, data)`

### PUT

- `.put(endpoint, data)`

### DELETE

- `.delete(endpoint)`

### OPTIONS

- `.options(endpoint)`

**Example include [Here](https://github.com/IntelliJAbhishek/react-native-wc-api/tree/master/example)**