import React,{Component} from 'react';
import { View,TouchableOpacity,Text,StyleSheet } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';
import {Avatar} from 'react-native-elements';

export default class customSideBarMenu extends Component{
    selectPicture=async()=>{
        const{cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(!cancelled){
            this.uploadImage(uri,this.state.userId)
        }
    }
    uploadImage=async(uri,imageName)=>{
        var response=await fetch(uri);
        var blob=await response.blob()
        var ref=firebase.storage().ref().child("user_profiles/"+ imageName)
        return ref.put(blob).then((response)=>{
            this.fetchImage(imageName)
        })
    }
    render(){
        return(
            <View style={{flex:1}}>
                <DrawerItems {...this.props}/>
                <Avatar
                    rounded
                    source={{uri:this.state.image}}
                     size="medium"
                     onPress={()=>this.selectPicture()}
                    containerStyle={styles.imageContainer}
                    showEditButton
                    />
                <View style={{flex:1,justifyContent:'flex-end',paddingBottom:30}}>
                    <TouchableOpacity style={{justifyContent:'center',padding:10,height:30,width:"100%"}}
                    onPress={()=>{
                        this.props.navigation.navigate("HomeScreen")
                        firebase.auth().signOut()
                    }}>
                    <Text>Logout</Text>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
