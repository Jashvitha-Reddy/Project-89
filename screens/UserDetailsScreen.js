import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config.js';

export default class UserDetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId : firebase.auth().currentUser.userId,
        }
    }
    getUserDetails(){
        db.collection('users').where('user_id','==',this.state.userId).get()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
            this.setState({
              userId : doc.data().user_id,
            })
          })
        });}
render(){
    return(
        <View>

        </View>
    )
}
}