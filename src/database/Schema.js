export const AuthSchema = {
    name : 'user_details',
    primaryKey : 'email',
    properties : {
        username : 'string',
        email : 'string',
        password : 'string',
        image_path : 'string'
    }
}

export const ProductSchema = {
    name: 'product',
    primaryKey : 'product_id',
    properties: {
      product_id: 'string',
      product_count: 'int',
    }
};
  
export const CartSchema = {
    name: 'cart_details',
    properties: {
      email:     'string',
      products:     {type: 'list', objectType: 'product'},
    }
  };
