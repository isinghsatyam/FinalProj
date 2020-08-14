import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    Button
} from 'react-native';
import { inject, observer } from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';

@inject('cart')
@observer
class Cart extends Component{
    constructor(props){
        super(props);     
        this.props = props;
        this.state = {
            productCount : 1,
        }
    }

    increaseCounter = () =>{
        if(this.state.productCount < 10)
            this.setState({productCount : this.state.productCount + 1});
        else    
            alert('Item can not be more than 10')
    }

    decreaseCounter = () =>{
        if(this.state.productCount > 1)
            this.setState({productCount : this.state.productCount - 1});
        else
            alert('Item can not be less than 1')
    }

    componentDidMount(){
        const userEmail = AsyncStorage.getItem('token');
        this.props.cart.getUserCartFromDatabase(userEmail);

       // this.props.cart.fetchProductDetails(prod)
    }

    render(){
        const { navigation } = this.props;
        const {itemDetails, fetchProductDetails, itemReview, fetchProductReview} = this.props.cart;
        
        return(
            <View style={styles.container}>
                
                    <View style={styles.upperScreen}>
                    <ScrollView>
                        <Image source={{ uri: itemDetails.images }} style={styles.imageView} /> 
                        <Text style={styles.text}>{itemDetails.name}</Text>
                        <View style={styles.rowView}>
                            <View style={styles.rowLeft}>
                                <Text style={styles.textStrike}>Price - {itemDetails.price} </Text>
                                <Text style={styles.text}>Our Price - {itemDetails.special_price}</Text>
                            </View>
                            <View style={styles.rowRight}>
                                <TouchableOpacity style={styles.counterButton} onPress={() => this.decreaseCounter()}>
                                    <Text style={styles.buttonText}> - </Text>
                                </TouchableOpacity>
                                <Text style={styles.counterText}> {this.state.productCount}</Text>
                                <TouchableOpacity style={styles.counterButton} onPress={() => this.increaseCounter()}>
                                    <Text style={styles.buttonText}> + </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.itemSeparator}/>
                     </ScrollView>                 
                    </View>
                
                <View style={styles.lowerScreen}>
                    <View style={styles.footerButtonView}>
                        <TouchableOpacity style={styles.button}>
                            <Text style ={styles.buttonText}> Buy now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#0BDB8F',
    },
    upperScreen: {
        flex: 0.91,
        backgroundColor : '#fff',
        marginRight : 8,
        marginLeft : 8,
        marginTop : 5,
        paddingLeft : 10,
        paddingRight : 10,
        justifyContent : 'center'
    },
    lowerScreen: {
        flex: 0.09,
        justifyContent: 'flex-start', 
    }, 
    imageView: {
        width: 200,
        height: 200,
        margin : 5,
        alignSelf : 'center'
    },
    rowView :{
        flex : 1,
        flexDirection : 'row',
        marginTop : 10,
    },
    rowLeft :{
        flex : 0.5,
        justifyContent : 'center'
    },  
    rowRight :{
        flex : 0.5,     
        flexDirection : 'row', 
        paddingRight : 20,
        justifyContent : 'flex-end'
    },
    counterText : {
        fontSize: 18,
        padding: 5,
        color: '#11151c',
        fontWeight : 'bold',
        alignSelf : 'center',
        backgroundColor : '#ccccca'
    },
    headingText: {
        fontSize: 25,
        paddingBottom : 10,
        color: '#c9430e',
        fontWeight : 'bold'
    },      
    text: {
        fontSize: 18,
        padding: 5,
        color: '#11151c',
    },
    textStrike: {
        fontSize: 18,
        padding: 5,
        color: '#a3a5a8',
        textDecorationLine :'line-through'      
    }, 
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333333',
        alignSelf : 'center',  
    },  
    counterButton: {
        backgroundColor : '#bdbcb9',
        alignSelf : 'center',
        width : 30
    },
    footerButtonView: {
        flexDirection: 'row',
        flex :1,
        backgroundColor : '#e3e3e3',
        borderTopColor : '#ccccca',
        borderTopWidth : 2
    },
    button :{
        flex : 1,
        borderRightWidth: 1,
        borderLeftWidth : 1,
        borderRightColor : '#3d3f42',
        borderLeftColor : '#3d3f42',
        justifyContent : 'center',
        borderTopColor : 'red',
        borderTopWidth : 4,
    },   
    itemSeparator :{
        height: 3,
        width: "100%",
        marginTop : 30,
        marginBottom : 20,
        backgroundColor: "#0BDB8F",
    },
})

export default Cart;