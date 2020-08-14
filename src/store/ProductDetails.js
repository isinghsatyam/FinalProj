import { observable, action, computed } from "mobx";
import { addProductToCart, getCartFromDatabase, updateProductToCart } from '../database/CartHandler';

class ProductDetails {
    @observable itemDetails = [];
    @observable itemReview = [];
    @observable cartDetails = [];

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

    @action fetchProductReview = (productId) => {
        fetch('https://preprod.vestigebestdeals.com/api/rest/getreview/productId/'+productId,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }}).then(res => res.json())
            .then((res) =>{
            this.itemReview = res.data.reviewlist;
        }
        ).catch(error => {
            console.log('error in fetching data', error);
        })
    }
    
    @action addProductToCart = (userEmail, productId, productCount) =>{
        addProductToCart(userEmail, productId, productCount);
    }

    @action updateProductToCart = (userEmail, productId, productCount) =>{
        updateProductToCart(userEmail, productId, productCount);
    }
    
    @action getCartFromDatabase = () =>{
        getCartFromDatabase().then((res) => {
            this.cartDetails = res;
            console.log(this.cartDetails)
          }).catch((error) => {
            console.log(error);
          });
        };
    @computed get getItemDetails() {
        return this.itemDetails;
    }
}
export default ProductDetails;