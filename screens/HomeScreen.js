import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, TextInput, FlatList , ListItem } from 'react-native';

export default class HomeScreen extends React.Component{
   renderItem=({item,i}) => {
        console.log(item.item_name);
        return(
            <listItem
            key={i}
            tittle={item.item_name}
            subtitle={item.description}
            tittleStyle={{color:'black', fontWeight:'bold'}}
            rightElement={
                <TouchableOpacity style={StyleSheet.button}> 
                  <Text style={{color:'#ffff'}}>Exchange</Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )   
   }
render(){
    return(
        <View>
            <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.allRequests}
            renderItem={this.renderItem}
            />
        </View>
    )
}


}