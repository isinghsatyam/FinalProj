import { observable, action, computed } from "mobx";

class DashBoard {
    @observable itemList = [];
    @observable pageNo = 1;
    @observable isLoading = true;

    @action fetchItems = () => {
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
                    "sort":"",
                    "customer_id":96,
                    "wcode":"DWK,HWH,S71" 
            })
        }).then(res => res.json())
            .then((res) =>{
            this.itemList = [...this.itemList, ...res.data.items];
            this.pageNo += 1;
        }
         ).catch(error => {
            console.log('error in fetching data', error);
        }).finally(() => this.isLoading = false)
    };

    @computed get getItemList() {
        return this.itemList;
    }
}
export default DashBoard;