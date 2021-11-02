import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default class SettingsScreen extends React.Component{
    constructor(){
        super();
        this.state={
          firstName : '',
          lastName  : '',
          contact   : '',
          docId : ''
        }
      }
      getData=()=>{
        var firstName = firebase.auth().currentUser.firstName;
        db.collection('users').where('first_name','==',firstName).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
          var data = doc.data()
            this.setState({
              firstName : data.first_name,
              lastName  : data.last_name,
              contact   : data.contact,
              docId     : doc.id
            })
          });
        })
      }
      updateData=()=>{
        db.collection('users').doc(this.state.docId)
        .update({
          "first_name": this.state.firstName,
          "last_name" : this.state.lastName,
          "contact"   : this.state.contact,
        })
    
        Alert.alert("Profile Updated Successfully")
    
      }
    
      componentDidMount(){
        this.getData()

      }
    render(){
        return(
            <View style={styles.container}>
                <TextInput
              style={styles.formTextInput}
              placeholder ={"First Name"}
              maxLength ={8}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
              value ={this.state.firstName}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Last Name"}
              maxLength ={8}
              onChangeText={(text)=>{
                this.setState({
                  lastName: text
                })
              }}
                value ={this.state.lastName}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Contact"}
              maxLength ={10}
              keyboardType={'numeric'}
              onChangeText={(text)=>{
                this.setState({
                  contact: text
                })
              }}
                value ={this.state.contact}
            />
            <TouchableOpacity style={styles.button}
              onPress={()=>{
                this.updateData()
              }}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    }
    },
    buttonText:{
      fontSize:RFValur(25),
      fontWeight:"bold",
      color:"#fff"
    }
})