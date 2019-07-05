'use strict';
import WooCommerceAPI from 'react-native-wc-api';

const WooCommerce = new WooCommerceAPI({
    url: 'https//www.example.vcom',  //Url
    consumerKey: 'consumerKey',   //Your Consumer Key
    consumerSecret: 'consumerSecret',  //Your Consumer Secret
    wpAPI: true,
    version: 'wc/v2',
    queryStringAuth: true
}); 

export default Api;  