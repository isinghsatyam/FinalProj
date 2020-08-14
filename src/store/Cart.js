import { observable, action, computed } from "mobx";
import {getUserCartFromDatabase } from '../database/CartHandler';

class Cart {
    @observable userCart = {};
    @observable itemDetails = [];

    @action fetchProductDetails = (productId) => {
        fetch('https://preprod.vestigebestdeals.com/api/rest/productdetails ', 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "product_id":productId,
                "customer_id":96, 
                "wcode":"DWK,HWH,S71"
            })
        }).then(res => res.json())
            .then((res) =>{
            this.itemDetails = res.data;
        }
        ).catch(error => {
            console.log('error in fetching data', error);
        })
    };

    @action getUserCartFromDatabase = (userEmail) => {
        getUserCartFromDatabase(userEmail).then((res) => {
            this.userCart = res;
            console.log(this.userCart)
          })
          .catch((error) => {
            console.log(error);
        });
    };
}

export default Cart;