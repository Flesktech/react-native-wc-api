![GitHub package.json version](https://img.shields.io/github/package-json/v/intellijabhishek/react-native-wc-api.svg)
# react-native-wc-api
A wrapper that connects react Native to the WooCommerce API

## Installation

To install the module using NPM:

```
npm install react-native-wc-api --save
```

To install the module using Yarn:

```
yarn add react-native-wc-api
```

## Setup

You will need a consumer key and consumer secret to call your store's WooCommerce API. You can find instructions [here](https://docs.woocommerce.com/document/woocommerce-rest-api/)

Include the 'react-native-wc-api' module within your script and instantiate it with a config:

```javascript
import WooCommerceAPI from 'react-native-wc-api';

let Api = new WooCommerceAPI({
  url: 'https://yourstore.com', // Your store URL
  ssl: true,
  consumerKey: 'ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Your consumer secret
  consumerSecret: 'cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v2', // WooCommerce WP REST API version
  queryStringAuth: true
});
```

**Instantiating a WooCommerceAPI instance without a url, consumerKey or secret will result in an error being thrown**

## Calling the API

Your WooCommerce API can be called once the Api object has been instantiated (see above).

### GET

```javascript
Api.get('products',{
    })
    .then(data => {
      // data will contain the body content from the request
    })
    .catch(error => {
       // error will return any errors that occur
    })
```
**Note:- Your can use either query params or query as object ([Check Example](https://github.com/IntelliJAbhishek/react-native-wc-api/tree/master/example))**

### POST

For this example you have a [Order object](http://woocommerce.github.io/woocommerce-rest-api-docs/#create-an-order).

```javascript
Api.post('orders', orderObject, {
  })
  .then(data => {
   // data will contain the body content from the request
  })
  .catch(error => {
      // error will return any errors that occur
  })
```

### PUT

```javascript
WooCommerceAPI.put('/orders/1', orderUpdate, {
  })
  .then(data => {
     // data will contain the body content from the request
  })
    .catch(error => {
      // error will return any errors that occur
  })
```

### DELETE

```javascript
NPMWooCommerceAPI.delete('orders/1234', {
  })
  .then(data => {
   // data will contain the body content from the request
  })
  .catch(error => {
  // error will return any errors that occur
  })
```

## Testing

```
npm test
```
