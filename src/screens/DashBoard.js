import React, { Component } from 'react'
import { 
    Text,
    TouchableOpacity,
    StatusBar,
    View,
    StyleSheet,
    ActivityIndicator,
    Image,
    FlatList
} from "react-native";
import { inject, observer } from 'mobx-react';

@inject('dashBoard')
@observer
export default class DashBoard extends Component{
    constructor(props) {
        super(props);
        this.props = props;
        this.props.dashBoard.fetchItems();
        this.state ={
           // productId = ''
           // isLoading : true
        }
    }
    render(){
        const {itemList, fetchItems, isLoading } = this.props.dashBoard;
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
            <StatusBar backgroundColor="#0BDB8F" barStyle="light-content" />
                <View style={styles.upperScreen}>
                {isLoading ? <ActivityIndicator size='large' color='red' animating/>
                : (
                    <FlatList 
                        style={styles.upperScreen}
                        keyExtractor = {(item, index) => item.product_id}
                        data={itemList}
                        renderItem = {({item}) =>{
                            return (
                                <TouchableOpacity style={styles.flatList} 
                                onPress={() => navigate('ProductDetails', { productId : item.product_id })} >
                                    <View style={styles.flatListItemLeft}>
                                        <Image source={{ uri: item.images }} style={styles.imageView} /> 
                                    </View>
                                    <View style={styles.flatListItemRight}>
                                    <Text style={styles.text}>{item.name}</Text> 
                                    <Text style={styles.textStrike}>Price - {item.price} </Text>
                                    <Text style={styles.text}>Our Price - {item.special_price}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        onEndReached={() => fetchItems()}
                        onEndReachedThreshold={4}
                    />
                )}
                </View>
                <View style={styles.lowerScreen}>
                    <View style={styles.buttonPosition}>
                        <TouchableOpacity style={styles.button} onPress ={this.fetchItems}>
                            <Text style ={styles.buttonText}> Sort By</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style ={styles.buttonText}> Grid View</Text>
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
        backgroundColor:'#edeff2',
    },
    upperScreen: {
        flex: 0.91,
        backgroundColor : '#0BDB8F',
        paddingBottom : 5,
    },
    lowerScreen: {
        flex: 0.09,
        justifyContent: 'flex-start',
        backgroundColor: '#0BDB8F', 
    },
    flatList :{
        flex : 1,
        flexDirection : 'row',
        backgroundColor : '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginLeft : 8,
        marginRight : 8,
        marginTop : 10
    },
    imageView: {
        width: 100,
        height: 100,
        margin : 5
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
    flatListItemLeft :{
        flex : 0.3,
        justifyContent : 'center'
    },
    flatListItemRight :{
        flex : 0.7,
    },
    buttonPosition: {
        flexDirection: 'row',
        flex :1,
        backgroundColor : '#dee0e3',
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10
    },
    button :{
        flex : 0.5,
        borderRightWidth: 1,
        borderLeftWidth : 1,
        borderRightColor : '#3d3f42',
        borderLeftColor : '#3d3f42',
        justifyContent : 'center'
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#b52309',
        alignSelf : 'center',  
    },
})
