import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import cat from '../../assets/cat2.png';
import colors from '../../src/colors';
class Projectcard extends Component {
  render() {
    return (
      <View>
        <Card
          onPress={() => {
            this.props.navigation.navigate('ProjectDetail');
          }}>
          <View style={styles.card}>
            <View style={{margin: 20}}>
              <TouchableOpacity
                style={styles.profilePosition}
                onPress={() => {
                  this.props.navigation.navigate('ProfileView');
                }}>
                <Image style={styles.imageStyle} source={cat} />
                <View>
                  <View style={{flexDirection: 'row', marginBottom: 6}}>
                    <Text style={styles.profileStyle1}>튜터 </Text>
                    <Text style={styles.profileStyle2}> 김모씨</Text>
                  </View>
                  <Text style={styles.profileStyle3}>00 대학교 000 학과</Text>
                </View>
              </TouchableOpacity>

              <View>
                <Text style={styles.projectName}>
                  {this.props.data.description}
                </Text>
                <Text style={styles.bookname}>교재명 : 수능 특강</Text>
                <Text style={styles.deposit}>
                  보증금 : {this.props.data.deposit} 원
                </Text>
                <Text style={styles.experience_period}>
                  프로젝트 기간 : {this.props.data.experience_period}
                </Text>
                <Text style={styles.project_bio}>
                  기출 문제 기반의 반복 학습을 통한 성적 향상법!!
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = {
  card: {
    backgroundColor: colors.subcolor,
    borderWidth: 0,
    borderRadius: 20,
    margin: 10,
    height: 300,
  },

  profilePosition: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  imageStyle: {
    marginRight: 20,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profileStyle1: {
    top: '5%',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FF6464',
  },
  profileStyle2: {
    top: '6%',
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileStyle3: {
    top: '7%',
    fontSize: 15,
  },
  projectName: {
    margin: 5,
    fontSize: 25,
    fontWeight: 'bold',
  },
  bookname: {
    margin: 5,
    fontSize: 15,
  },
  deposit: {
    margin: 5,
    fontSize: 15,
  },
  experience_period: {
    margin: 5,
    fontSize: 15,
    marginBottom: 15,
  },
  project_bio: {
    margin: 5,
    fontSize: 18,
  },
};

export default Projectcard;
