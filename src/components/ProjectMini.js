import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import ddasup_icon from '../../assets/ddasup_icon.png';
const ProjectMini = ({navigation, project}) => {
  return (
    <View style={{marginRight: 20}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProjectDetail', {project});
        }}>
        <ImageBackground
          source={ddasup_icon}
          style={styles.imgStyle}
          opacity={0.07}
          blurRadius={5}>
          <View style={{margin: 10}}>
            <Text style={styles.titleStyle}>{project.title}</Text>
            <Text style={styles.subStyle}>튜터 : {project.tutor.name}</Text>
            <Text style={styles.dayStyle}>
              체험기간 : {project.experience_period} DAYS
            </Text>
            <Text style={styles.dayStyle}>보증금 : {project.deposit} 원</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  imgStyle: {
    width: 180,
    height: 180,
    borderRadius: 20,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    height: '45%',
  },
  subStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    height: '25%',
    color: '#2E3E5C',
  },
  dayStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#2E3E5C',
    height: '15%',
  },
};

export default ProjectMini;
