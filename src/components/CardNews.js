import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import card1 from '../../assets/cardNews1/cardNews1-001.png';
import card2 from '../../assets/cardNews1/cardNews1-002.png';
import card3 from '../../assets/cardNews1/cardNews1-003.png';
import card4 from '../../assets/cardNews1/cardNews1-004.png';
import card5 from '../../assets/cardNews1/cardNews1-005.png';
import card2_1 from '../../assets/cardNews2/cardNews2-001.png';
import card2_2 from '../../assets/cardNews2/cardNews2-002.png';
import card2_3 from '../../assets/cardNews2/cardNews2-003.png';
import card2_4 from '../../assets/cardNews2/cardNews2-004.png';
import card2_5 from '../../assets/cardNews2/cardNews2-005.png';

function CardNews({navigation, route}) {
  return (
    <View style={{alignItems: 'center', marginTop: 50}}>
      {route.params.num === 1 ? (
        <ScrollView>
          <Image style={{width: 400, height: 400}} source={card2_1} />
          <Image style={{width: 400, height: 400}} source={card2_2} />
          <Image style={{width: 400, height: 400}} source={card2_3} />
          <Image style={{width: 400, height: 400}} source={card2_4} />
          <Image style={{width: 400, height: 400}} source={card2_5} />
        </ScrollView>
      ) : (
        <ScrollView>
          <Image style={{width: 400, height: 400}} source={card1} />
          <Image style={{width: 400, height: 400}} source={card2} />
          <Image style={{width: 400, height: 400}} source={card3} />
          <Image style={{width: 400, height: 400}} source={card4} />
          <Image style={{width: 400, height: 400}} source={card5} />
        </ScrollView>
      )}
    </View>
  );
}

export default CardNews;
