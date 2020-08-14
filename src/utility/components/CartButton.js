import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';

class CartButton extends Component{
    constructor(props){
        super(props);
        this.props = props;
    }
    render(){
        
        return(
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}
                    style={styles.headerButton}>
                    <MaterialCommunityIcons name="cart" color="#11151c" size={28} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerButton :{
        height : 30,
        width : 30,
        marginRight : 10
    }
})

export default withNavigation(CartButton);