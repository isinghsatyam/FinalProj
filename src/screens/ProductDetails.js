import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Share
} from 'react-native';
import { inject, observer } from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 


@inject('productDetails')
@observer
class ProductDetails extends Component{
    constructor(props){
        super(props);     
        this.props = props;
        this.state = {
            productCount : 1,
            cartHaveValue : false,
        }
    }

    onSharePress = () => {
        const {itemDetails} = this.props.productDetails;
        const shareOptions = {
            title: itemDetails.name,
            message: itemDetails.descriptions, 
            url: itemDetails.images,
            subject: 'shopping'
        };
        Share.share(shareOptions);
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
        const productId = this.props.navigation.getParam('productId','')
        this.props.productDetails.fetchProductDetails(productId);
        this.props.productDetails.fetchProductReview(productId);
        this.props.productDetails.getCartFromDatabase();
    }

    addUpdateProductToCart = async () => {
        try{
            const userEmail = await AsyncStorage.getItem('token');
            const productId = this.props.navigation.getParam('productId','');
            const {cartDetails}= this.props.productDetails;    
            for(let cartDetail of cartDetails){
                if(cartDetail.email == userEmail){
                    this.setState({cartHaveValue : true})
                }
            } 
            if(this.state.cartHaveValue){
                this.props.productDetails.updateProductToCart(userEmail, productId, this.state.productCount);
                alert('Product added to cart');
            }
            else{
                this.props.productDetails.addProductToCart(userEmail, productId, this.state.productCount);
                alert('Product added to cart');
            }     
            
        }catch(error){
            alert(error);
        }
    }
    
    render(){
        const { navigation } = this.props;
        const {itemDetails, fetchProductDetails, itemReview, fetchProductReview} = this.props.productDetails;     
        return(
            <View style={styles.container}>
                
                    <View style={styles.upperScreen}>
                    <ScrollView>
                        <Image source={{ uri: itemDetails.images }} style={styles.imageView} /> 
                        <Text style={styles.text}>{itemDetails.name}</Text>
                        <View style={styles.rowView}>
                            <View style={styles.itemLeft}>
                                <Text style={styles.textStrike}>Price - {itemDetails.price} </Text>
                                <Text style={styles.text}>Our Price - {itemDetails.special_price}</Text>
                            </View>
                            <View style={styles.itemRight}>
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
                        <View style={styles.rowView}>
                            <TouchableOpacity style={styles.shareButton} onPress={() => this.onSharePress()}>
                                <Text style ={styles.headingText}>Share to friends  </Text>
                                <MaterialCommunityIcons name="share-variant" color="#42275a" size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemSeparator}/>
                        <Text style ={styles.headingText}>Details :</Text>
                        <Text style={styles.text}>{itemDetails.descriptions}</Text>
                        <Text style={styles.text}>Created at : {itemDetails.created_at}</Text>
                        <Text style={styles.text}>Updated at : {itemDetails.updated_at}</Text>
                        <View style={styles.itemSeparator}/>
                        <Text style ={styles.headingText}>Review :</Text>
                        { itemReview.map((item, key)=>(
                            <View key={key}>
                                <Text  style={styles.text}>{item.date} </Text>
                                <Text  style={styles.text}>{item.nickname}</Text>
                                <Text  style={styles.text}>{item.detail} </Text>
                                <Text  style={styles.text}>{item.vote}</Text>
                                <View style={styles.reviewSeparator}/>
                            </View>
                            ))                          
                        }
                     </ScrollView>                 
                    </View>
                
                <View style={styles.lowerScreen}>
                    <View style={styles.footerButtonView}>
                        <TouchableOpacity style={styles.button} onPress={() => this.addUpdateProductToCart()}>
                            <Text style ={styles.buttonText}> Add to cart</Text>
                        </TouchableOpacity>
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
    itemLeft :{
        flex : 0.5,
        justifyContent : 'center'
    },  
    itemRight :{
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
    counterButton: {
        backgroundColor : '#bdbcb9',
        alignSelf : 'center',
        width : 30
    },
    headingText: {
        fontSize: 25,
        paddingBottom : 10,
        color: '#260361',
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
    footerButtonView: {
        flexDirection: 'row',
        flex :1,
        backgroundColor : '#e3e3e3',
        //borderTopColor : '#ccccca',
        borderTopWidth : 2,
        borderTopColor : 'red',
        borderTopWidth : 3,
    },
    button :{
        flex : 0.5,
        borderRightWidth: 1,
        borderLeftWidth : 1,
        borderRightColor : '#686869',
        borderLeftColor : '#686869',
        justifyContent : 'center'
    },
    shareButton :{
        flex : 1,
        flexDirection : 'row',
        backgroundColor : '#aeb5b0',
        justifyContent : 'center',
        borderRadius : 10,
        borderWidth : 2,
        borderColor : '#5e6360'
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333333',
        alignSelf : 'center',  
    },   
    itemSeparator :{
        height: 3,
        width: "100%",
        marginTop : 30,
        marginBottom : 20,
        backgroundColor: "#0BDB8F",
    }, 
    reviewSeparator :{
        height: 1,
        width: "100%",
        marginTop : 20,
        marginBottom : 20,
        marginHorizontal : 10,
        backgroundColor: "#a3a5a8",
    },
})

export default ProductDetails;