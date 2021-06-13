import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createlike, deletelike, islike} from '../Api';

const Like = (props) => {
  console.log('※※※※※※※※※※※※※※※※※※※※※');
  console.log(props.likecondition, props.tutor.name, props.tutor.likes_count);
  // console.log('※※※※※※※※※※※※※※※※※※※※※')
  const [like, setLike] = useState(props.likecondition);
  const [numOfLike, setNumOfLike] = useState(props.tutor.likes_count); //api 요청보내서 받아옴
  const [likeid, setLikeid] = useState(props.likeid);
  // console.log('※※※※※※※※※※※※※※※※※※※※※')
  console.log(like, numOfLike);
  console.log('※※※※※※※※※※※※※※※※※※※※※');
  useEffect(() => {
    console.log(props.setNumoflike);
    console.log(props);
    if (!like) {
      islike({
        like: {
          likable_type: 'User',
          likable_id: props.tutor.id,
        },
      })
        .then((res) => {
          console.log('좋아요 확인중');
          console.log(res.data.id);
          setLike(true);
          setLikeid(res.data.id);
        })
        .catch((e) => {
          console.log('///////////////////////////////');
          console.log(e);
          console.log('///////////////////////////////');
        });
    }
  }, []);

  const _toggle = () => {
    if (props.fromlist === undefined) {
      if (!like) {
        console.log('좋아요 눌림');
        setNumOfLike((prev) => prev + 1);
        createlike({
          like: {
            likable_type: 'User',
            likable_id: props.tutor.id,
          },
        })
          .then((res) => {
            console.log(res.data);
            setLikeid(res.data.id);
            props.setNumoflike((prev) => prev + 1);
          })
          .catch((e) => console.log(e));
      } else {
        console.log('좋아요 취소 id : ', likeid);
        setNumOfLike((prev) => prev - 1);
        deletelike(likeid)
          .then((res) => {
            console.log(res);
            props.setNumoflike((prev) => prev - 1);
          })
          .catch((e) => {
            console.log('★★★★★★★★★★★★★★★★★★');
            console.log(e);
            console.log('★★★★★★★★★★★★★★★★★★');
          });
      }
      setLike((prev) => !prev);
    } else {
      console.log('좋아요 취소 id : ', likeid);
      deletelike(likeid)
        .then((res) => {
          console.log(res);
          props.setNumoflike((prev) => prev - 1);
        })
        .catch((e) => {
          console.log('★★★★★★★★★★★★★★★★★★');
          console.log(e);
          console.log('★★★★★★★★★★★★★★★★★★');
        });
    }
  };
  return (
    <TouchableOpacity style={styles.likebox} onPress={() => _toggle()}>
      {like === false ? (
        <MaterialCommunityIcons
          name="heart-outline"
          size={24}
          color={colors.maincolor}
        />
      ) : (
        <MaterialCommunityIcons name="heart" size={24} color="red" />
      )}
      <Text style={styles.likeText}>{numOfLike} likes</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  likebox: {
    flexDirection: 'row',
    margin: 5,
  },
  likeText: {
    fontWeight: 'bold',
    color: colors.maincolor,
    fontSize: 20,
    marginLeft: 5,
  },
});
export default Like;
