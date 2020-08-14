import { observable, action, computed } from "mobx";
import { getUserFromDatabase } from "../database/AuthHandler";

class SignIn {
    @observable userDetails = [];

    @action getUserFromDatabase = (email) => {
        getUserFromDatabase(email).then((res) => {
          this.userDetails = res;
          console.log(this.userDetails)
        }).catch((error) => {
          console.log(error);
        });
      };

    @computed get _userDetails () {
        return this.userDetails;
    }
}
export default SignIn;