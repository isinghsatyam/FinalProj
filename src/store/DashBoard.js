import { observable, action, computed } from "mobx";

class DashBoard {
    @observable productList = [];
    @observable pageNo = 1;
    @observable isLoading = true;

    @action fetchProducts = (sortProducts) => {
        fetch('https://preprod.vestigebestdeals.com/api/rest/dynamickittingproductlistwithfiltersortwarehouse ', 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "category_id":13,
                    "filter": "",
                    "page_num":this.pageNo,
                    "sort":sortProducts,
                    "customer_id":96,
                    "wcode":"DWK,HWH,S71" 
            })
        }).then(res => res.json())
            .then((res) =>{
            this.productList = [...this.productList, ...res.data.items];
            this.pageNo += 1;
        }
         ).catch(error => {
            console.log('error in fetching data', error);
        }).finally(() => this.isLoading = false)
    };

    @action clearProductList = () => {
        this.productList = [];
        this.pageNo = 1;
        console.log(this.productList);
    }
    @computed get getproductList() {
        return this.productList;
    }
}
export default DashBoard;