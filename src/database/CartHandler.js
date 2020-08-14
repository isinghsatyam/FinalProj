import { CartSchema , ProductSchema} from './Schema';

const Realm = require('realm');

export const addProductToCart = async (userEmail, productId, productCount) => new Promise((resolve, reject) => {
    Realm.open({ schema: [ProductSchema, CartSchema] })
        .then(realm => {
            realm.write(() => {
                let addProduct = realm.create('cart_details', {email : userEmail , products :[]});
                addProduct.products.push({product_id: productId, product_count: productCount});
                console.log(addProduct)
                resolve();
            });   
            realm.close(); 
        })
        .catch(error => {
            reject(error);
        });
  });

export const updateProductToCart = async (userEmail, productId, productCount) => new Promise((resolve, reject) => {
    Realm.open({ schema: [ProductSchema, CartSchema] })
        .then(realm => {
            realm.write(() => {
                let updateProduct = realm.objects('cart_details').filtered(`email CONTAINS[C] $0`,userEmail);
                updateProduct.products.push({product_id: productId, product_count: productCount});
                resolve();
            });   
            realm.close(); 
        })
        .catch(error => {
            reject(error);
        });
  });

export const getCartFromDatabase = async () => new Promise((resolve, reject) => {
    Realm.open({ schema: [CartSchema, ProductSchema] })
      .then(realm => {
        let getCart = realm.objects('cart_details');
        resolve(getCart)
      })
      .catch(error => {
        reject(error);
      });;
  });

export const getUserCartFromDatabase = async (userEmail) => new Promise((resolve, reject) => {
    Realm.open({ schema: [ProductSchema, CartSchema] })
      .then(realm => {
        let getCart = realm.objects('cart_details').filtered(`email CONTAINS[C] $0`,userEmail);
        console.log(getCart)
        resolve(getCart)
      })
      .catch(error => {
        reject(error);
      });;
  });