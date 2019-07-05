import React, { Component } from 'react';
import { View } from 'react-native';
import Api from './Api';


class Home extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // GET example
        WooCommerce.get('customers').then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });

        // POST example
        WooCommerce.post('products', {
            product: {
                title: 'Premium Quality',
                type: 'simple',
                regular_price: '21.99'
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });


        // PUT example
        WooCommerce.put('orders/123', {
            status: 'completed'
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });

        // Delete example
        WooCommerce.delete('coupons/123').then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }


    render() {
        return <View />;
    }
}
