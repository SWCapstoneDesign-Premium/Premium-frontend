import React, { Component } from 'react'
import { Modal, View, Image,Text,TouchableOpacity,ScrollView,Alert } from 'react-native';

class Popup extends Component{
 
  state={
    modalVisible:true
  }
  render(){
    return (
      <View style={{width:100, height:100}}>
          <Modal
          animationType="slide"
          visible={modalVisible}
          >
              <View>
                <View >

                <Text>알림</Text>
                <View>
                <TouchableOpacity
                style={{margin:100}}
                    onPress={() => {
                      this.setState({modalVisible:false})
                    }}>
                    <Text>취소</Text>
                </TouchableOpacity>
                     </View>
                </View>

            </View>
        </Modal>

      </View>
    );
  }
}




export { Popup };
