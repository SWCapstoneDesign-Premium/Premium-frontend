import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import colors from '../colors';
import {getlikes} from '../Api';
import cat from '../../assets/cat2.png';
import Like from './Like';

const RenderLikeList = (props) => {
  return props.likelist.map((tutor, index) => {
    if (tutor.likable) {
      return (
        <View style={styles.container} key={index.toString()}>
          <View style={styles.profile}>
            {tutor.likable.image === ' ' ? (
              <Image source={cat} style={styles.image} />
            ) : (
              <Image source={{uri: tutor.likable.image}} style={styles.image} />
            )}
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>{tutor.likable?.name}</Text>

            <Like
              fromlist={index.toString()}
              tutor={tutor.likable}
              likecondition={true}
              likeid={tutor.id}
              setNumoflike={props.setNumoflike}
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
  });
};

const MyLike = (props) => {
  const [likelist, setLikelist] = useState(props.route.params.mylikelists);
  const [numoflike, setNumoflike] = useState(
    props.route.params.mylikelists.length,
  );
  useEffect(() => {
    getlikes()
      .then((res) => {
        setLikelist(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [numoflike]);

  return (
    <View style={{margin: 20}}>
      <RenderLikeList
        likelist={likelist}
        numoflike={numoflike}
        setNumoflike={setNumoflike}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopLeftRadius: 20,
  },
  profile: {
    backgroundColor: colors.maincolor,
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '80%',
    height: '100%',
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MyLike;
