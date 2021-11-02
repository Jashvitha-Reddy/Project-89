import React from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'

export default class MyReceivedItemsScreen extends React.Component{
    constructor(){
        super()
        this.state = {
          userId  : firebase.auth().currentUser.name,
          receivediemsList : []
        }
      this.requestRef= null
      }
    
      getReceivedBooksList =()=>{
        this.requestRef = db.collection("requested_items")
        .where('user_id','==',this.state.userId)
        .where("item_status", '==','received')
        .onSnapshot((snapshot)=>{
          var receivedBooksList = snapshot.docs.map((doc) => doc.data())
          this.setState({
            receivedItemsList : receivedItemsList
          });
        })
      }
    
      componentDidMount(){
        this.getReceivedItemsList()
      }
    
      componentWillUnmount(){
        this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        console.log(item.item_name);
        return (
          <ListItem
            key={i}
            title={item.item_name}
            subtitle={item.itemStatus}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            bottomDivider
          />
        )
      }
    
    render(){
        return(
          <View style={{flex:1}}>
            <MyHeader title="Received Items" navigation ={this.props.navigation}/>
            <View style={{flex:1}}>
              {
                this.state.receivedIemsList.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List Of All Received Items</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.receivedBooksList}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize:RFValue(20),
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })