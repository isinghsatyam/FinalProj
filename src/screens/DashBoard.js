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
import  Modal  from "react-native-modal";

@inject('dashBoard')
@observer
export default class DashBoard extends Component{
    constructor(props) {
        super(props);
        this.props = props;
        this.state ={
            isGridView : false,
            isModalVisible : false,
            cardFlexDirection : 'row',
            buttonText : 'Grid View',
            sortProducts : '',
        }
        this.props.dashBoard.fetchProducts(this.state.sortProducts);
    }

    changeFlatlistView = () => {
        this.setState({ isGridView: !this.state.isGridView }, () => {
            if (this.state.isGridView) {
                this.setState({ buttonText: 'List View' });
                this.setState({cardFlexDirection : 'column'})
            }
            else {
              this.setState({ buttonText: 'Grid View' });
              this.setState({cardFlexDirection : 'row'})
            }
        });
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    render(){
        const {productList, fetchProducts, isLoading, clearProductList } = this.props.dashBoard;
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
            <StatusBar backgroundColor="#f04800" barStyle="light-content" />
                <View style={styles.upperScreen}>
                {isLoading ? <ActivityIndicator size='large' color='red' animating/>
                : (
                    <FlatList 
                        style={styles.upperScreen}
                        keyExtractor = {(item, index) => String(index)}
                        data={productList}
                        key={this.state.isGridView}
                        numColumns={this.state.isGridView ? 2: 1}
                        renderItem = {({item}) =>{
                            return (
                                <TouchableOpacity style={[styles.flatList,{flexDirection : this.state.cardFlexDirection}]} 
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
                        onEndReached={() => fetchProducts(this.state.sortProducts)}
                        onEndReachedThreshold={6}
                    />
                )}
                </View>
                <View style={styles.lowerScreen}>
                    <View style={styles.buttonPosition}>
                        <TouchableOpacity style={styles.button} onPress ={this.toggleModal}>
                                <Text style ={styles.buttonText}> Sort By</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.changeFlatlistView}>
                                <Text style ={styles.buttonText}>{this.state.buttonText}</Text>   
                        </TouchableOpacity>
                    </View>

                    <Modal 
                    isVisible={this.state.isModalVisible} 
                    onBackdropPress={this.toggleModal}
                    style={styles.sortModal}>
                        <TouchableOpacity 
                        style={styles.sortModalButton} 
                        onPress={() => {
                                this.setState({sortProducts : 'price_desc'});
                                clearProductList;
                                fetchProducts(this.state.sortProducts);
                                this.toggleModal();}}
                        >
                            <Text style={styles.sortModalButtonText}>Price High to Low</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.sortModalButton}
                        onPress={() => {
                                this.setState({sortProducts : 'price_asc'});
                                clearProductList;
                                fetchProducts(this.state.sortProducts);
                                this.toggleModal();}}
                        >
                            <Text style={styles.sortModalButtonText}>Price Low to High</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.sortModalButton}
                        onPress={() => {
                            this.state.sortProducts({sortProducts : ''});
                            fetchProducts(this.state.sortProducts);
                            this.toggleModal();}}>
                            <Text style={styles.sortModalButtonText}>Reset</Text>
                        </TouchableOpacity>
                    </Modal>
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
        flex: 0.92,
        backgroundColor : '#0BDB8F',
        paddingBottom : 5,
    },
    lowerScreen: {
        flex: 0.08,
        justifyContent: 'flex-start',
    },
    flatList :{
        flex : 1,
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
        margin : 5,
        alignSelf : 'center'
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
        justifyContent : 'center',
    },
    flatListItemRight :{
        flex : 0.7,
    },
    buttonPosition: {
        flexDirection: 'row',
        flex :1,
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10
    },
    button :{
        flex : 0.5,
        borderRightWidth: 1,
        borderLeftWidth : 1,
        borderRightColor : '#3d3f42',
        borderLeftColor : '#3d3f42',
        justifyContent : 'center',
        backgroundColor : '#f04800',        
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf : 'center',  
    },
    sortModal : {
        flex : 0.9,
        justifyContent : 'flex-end'
    },
    sortModalButton:{
        flex:0.1,
        justifyContent : 'center',
        alignItems :'center',
        backgroundColor:'#ffffff',
        borderColor : '#f04800',
        borderWidth : 1,
        borderRadius : 10
    },
    sortModalButtonText :{      
        fontSize: 25,
        fontWeight: 'bold',
        color: '#0BDB8F',
        alignSelf : 'center',
    }
});

