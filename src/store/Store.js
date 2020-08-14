import SignIn from './SignIn';
import DashBoard from "./DashBoard";
import ProductDetails from './ProductDetails';
import Cart from './Cart';

class Store {
    signIn: SignIn;
    dashBoard : DashBoard;
    productDetails : ProductDetails;
    cart : Cart;

    constructor() {
        this.signIn = new SignIn(this);
        this.dashBoard = new DashBoard(this);
        this.productDetails = new ProductDetails(this);
        this.cart = new Cart(this);
    }
}
export default new Store();