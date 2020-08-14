import { AuthSchema } from './Schema';

const Realm = require('realm');

export const addUserToDatabase = async (userDetails) => new Promise((resolve, reject) => {
  Realm.open({ schema: [AuthSchema] })
    .then(realm => {
      realm.write(() => {
        realm.create('user_details', {
            username : userDetails.username,
            email : userDetails.email,
            password : userDetails.password,
            image_path : userDetails.imagePath
        });
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });
});

export const getUserFromDatabase = async (email) => new Promise((resolve, reject) => {
  Realm.open({ schema: [AuthSchema] })
    .then(realm => {
      let getUsers = realm.objects('user_details').filtered(`email CONTAINS[C] $0`,email);
      resolve(getUsers);
    })
    .catch(error => {
      reject(error);
    });;
});