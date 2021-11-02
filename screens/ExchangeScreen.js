import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default class ExchangeScreen extends React.Component{
    getData(){
        db.collection('users')
        .where('itemvalue','==',this.state.itemValue)
        .get()
        .then((snapshot)=>{
            snapshot.forEach(doc=>{
                this.setState({
                    itemValue:doc.data().item_value,
                    docId:doc.id
                })
            })
        })
    }
    getExachangeRequest=()=>{
        var exchangeRequest= db.collection('exchange_requests')
        .where('username','==',this.state.userName)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                if(doc.data().item_status !== "received"){
                    this.setState({
                        exchangeId:doc.data().exchangeId,
                        requestedItemName:doc.data().item_name,
                        itemStatus:doc.data().item_name,
                        docId:doc.id
                    })
                }
            })
        })
    }
    getIsExchangeRequestActive(){
        db.collection('users')
        .where('username','==',this.state.userName)
        .onSnapshot(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                this.setState({
                    IsExchangeRequestActive:doc.data().IsExchangeRequestActive,
                    userDocId:doc.id
                })
            })
        })
    }
    createUniqueId(){
        return Math.random(5)
    }
    addItem=(itemName,itemDescription)=>{
        var userName=this.state.userName
        var randomRequestId=this.createUniqueId()
        db.collection("exchange_requests").add({
            "username":userName,
            "item_name":itemName,
            "item_description":itemDescription
        })
        this.setState({
            itemName:"",
            itemDescription:""
        })
        return Alert.alert(
            "Item Ready to Exchange",
            "",
            [
                {text:OK,onPress:()=>{
                    this.props.navigation.navigate('HomeScreen')
                }}
            ]
        )
    }
    render(){
        if(this.state.IsExchangeRequestActive===true){
            return(
                <View style={{flex:1,justifyContent:'center'}}>
                    <View style={{borderColor:"orange",borderWidth:2,
                    justifyContent:'center',alignItems:'center',padding:10,margin:10}}> 
                    <Text>Item Name</Text>
                    <Text>{this.state.itemStatus}</Text>
                    </View>
                    <View style={{borderColor:"orange",borderWidth:2,
                    justifyContent:'center',alignItems:'center',padding:10,margin:10}}> 
                    <Text> Item Status </Text> 
                    </View>
                    <TouchableOpacity style={{borderWidth:1,borderColor:'orange',
                    backgroundColor:"orange",width:300,alignSelf:'center',
                    alignItems:'center',height:30,marginTop:30}} 
                    onPress={()=>{ 
                        this.sendNotification() 
                        this.updateExchangeRequestStatus(); 
                        this.receivedIem(this.state.requestedItemName) 
                        }}> 
                        <Text>I recieved the item </Text> </TouchableOpacity>
                </View>
            )
        }
        else{
        return(
            <View style={{flex:1}}>
                <MyHeader title="Request Book" navigation={this.props.navigation}/>
                    <KeyboardAvoidingView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                       <TextInput 
                       style={styles.formTextInput}
                       placeholder={"Item Name"}
                        onChangeText={(text)=>{
                            this.setState({
                                itemName:text
                            })
                        }}
                        value={this.state.itemName}
                       />

                    <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Currency Code"}
                    maxLength ={3}
                    onChangeText={(text)=>{
                        this.setState({
                            currenyCode: text
                            })
                        }}
                        value ={this.state.firstName}
                        />
                           
                       <TextInput 
                       style={[styles.formTextInput,{height:300}]}
                       placeholder={"Description"}
                       multiline
                       numberOfLines={4}
                        onChangeText={(text)=>{
                            this.setState({
                                reasonToRequest:text
                            })
                        }}
                        value={this.state.reasonToRequest}
                       />
                       <TouchableOpacity style={styles.button}
                       onPress={()=>{this.addRequest(this.state.itemName,this.state.reasonToRequest)}}>
                        <Text>Submit</Text>
                       </TouchableOpacity>
                       
                       )
                    </KeyboardAvoidingView>    
            </View>
        )
    }
}}
    
    
const styles=StyleSheet.create({
    itemName:{
        width:100,
        height:50,
        borderWidth:1.5,
        borderColor:'#ff5722'
    },
    itemDescription:{
        width:100,
        height:300,
        borderWidth:1.5,
        borderColor:'#ff5722'
    },
    tittle:{
        fontSize:RFValue(20),
        fontWeight:RFValue(300),
        color:'#808080'
    },
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
       formTextInput:{ 
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1,
         marginTop:20, 
         padding:10, 
        }
})