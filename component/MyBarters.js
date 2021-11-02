import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput} from 'react-native';

export default class MyBarters extends React.Component{
    sendNotifications=()=>{
        this.requestRef=db.collection("all_notifications")
        .where("notification_status","==","unread")
        .where("targeted_uer_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotification=doc.data()
            notification["doc_id"]=doc.doc_id
            allNotifications.push(notification)
        });
        this.setState({
            allNotification:allNotification
        })
    }
    addNotification=()=>{
        console.log("in the function",this.state.rec)
        var message=this.state.exchangerName + "has shown interest in exchanging the item"
        db.collection("all_notifications").add({
            "targeted_user_id" : this.state.exchangerName,
            "donor_id" : this.state.userId,
            "exchangeId" : this.state.exchangeId,
            "item_name" : this.sate.itemName,
            "date" : firebase.firestore.fieldValue.serverTimestamp(),
            "notification_status" : "unread",
            "message" : message        
        })
    }
    getAllBarters=()=>{
        this.requestRef=db.collection("my_barters").where("exchange_id",'==',this.state.exchangeId)
        .onSnapshot((snapshot)=>{
            var myBarters=snapshot.doxs.map(document=>document.data());
            this.setState({
                myBarters:myBarters
            })
        })
    }
    addBarters=async()=>{
        db.collection('my_barters').add({
            "item_name":itemName,
            "exchanger_name":exchangerName,
            "exchanger_contact":exchangerContact,
            "exchanger_address":exchangerAddress,
            "exchange_id":exchangeId,
            "status_to_exchange":"exchanged" 
        })
    }
    render(){
        return(
            <View>
                <TouchableOpacity style={styles.button}
                       onPress={()=>{this.getAllBarters,this.addNotification(this.state.exchangerName,this.state.statusToExchange)}}>
                        <Text>Exchange</Text>
                       </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button:{
        width:"75%", 
        height:50, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:10,
         backgroundColor:"#ff5722", 
         shadowColor: "#000", 
         shadowOffset: { width: 0, height: 8, }, 
         shadowOpacity: 0.44, 
         shadowRadius: 10.32, 
         elevation: 16,
          marginTop:20 
       }, 
 })

