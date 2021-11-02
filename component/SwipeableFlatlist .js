import React  from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import firebase from 'firebase';
import db from '../config.js';

export default class SwipeableFlatList extends React.Component{
    updateMarkAsread =(notification)=>{
        db.collection("all_notifications").doc(notification.doc_id).update({
          "notification_status" : "read"
        })
      }
      renderItem = data => (
        <ListItem
       title={data.item.item_name}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       subtitle={data.item.message}
       bottomDivider
     />
    );
    renderHiddenItem = (data, item) => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}></Text>
            </View>
        </View>
    ); 
    render(){
        return(
            <View>
                <SwipeListView
                disableRightSwipe
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get('window').width}
                previewkey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    }
})