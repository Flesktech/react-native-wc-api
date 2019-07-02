import React, { Component } from 'react';
import { View } from 'react-native';
import Api from './Api';


class Home extends React.PureComponent {
    constructor(props) {
        super(props);
		
        Api.get('customers', { per_page: 5 }).then((response) => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
		
        Api.get('customers/?per_page=5').then((response) => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }
	
	render() {
		return <View/>;
	}
}
