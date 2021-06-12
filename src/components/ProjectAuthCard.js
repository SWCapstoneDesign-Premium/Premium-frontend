import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import colors from '../../src/colors';

const ProjectAuthCard = ({navigation, project}) => {
  useEffect(() => {
    console.log(navigation);
  });
  return (
    <View style={styles.buttonView}>
      <TouchableOpacity
        onPress={() => {
          navigation('TuteeAuthdetail', project);
        }}>
        <View style={{margin: 10}}>
          <Text style={styles.titleStyle}>{project.title}</Text>
          <Text style={styles.subStyle}>고등 수학 / 수학</Text>
          <Text style={styles.dayStyle}>{project.experience_period} DAYS</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  buttonView: {
    width: 350,
    margin: 10,
    backgroundColor: colors.subcolor,
    borderRadius: 10,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 25,
  },
  subStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: '#2E3E5C',
  },
  dayStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#2E3E5C',
  },
};
export default ProjectAuthCard;
