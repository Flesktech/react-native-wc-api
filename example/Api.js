'use strict';
import WooCommerceAPI from 'react-native-wc-api';

const Api = new WooCommerceAPI({
    url: 'https//www.example.vcom',  //Url
    consumerKey: 'consumerKey',   //Your Consumer Key
    consumerSecret: 'consumerSecret',  //Your Consumer Secret
    wp_api: true,
    version: 'wc/v2',
    queryStringAuth: true
}); 

export default Api;  