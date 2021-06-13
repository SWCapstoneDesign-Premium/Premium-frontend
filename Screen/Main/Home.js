import React, {Component} from 'react';
import TodayProject from '../../src/components/TodayProjectHome';
import ProjectMini from '../../src/components/ProjectMini';
import {getprojects, getattendances, gettutorprojs} from '../../src/Api';
import colors from '../../src/colors';
import homelogo from '../../assets/homeLogo2.png';
import card1 from '../../assets/cardNews1/cardNews1-001.png';
import card2 from '../../assets/cardNews2/cardNews2-001.png';
import {StyleSheet, ScrollView, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CurrentUser} from '../../src/utils/CurrentUser';

class Home extends Component {
  static contextType = CurrentUser;
  state = {
    subject: '',
    todayprj: [],
    projects: [],
    myprojects: [],
    tutorproj: [],
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('☆☆☆☆☆☆☆☆☆☆☆ context ☆☆☆☆☆☆☆☆☆☆');
    console.log(this.context);
    console.log('☆☆☆☆☆☆☆☆☆☆☆ ☆☆☆☆ ☆☆☆☆☆☆☆☆☆☆');
    const getData = async () => {
      if (this.context[0].type === 'Tutee') {
        console.log('User state : tutee');
        await getattendances()
          .then((res) => this.setState({myprojects: res.data}))
          .catch((err) => console.log('attendances', err));
      } else {
        console.log('User state : tutor');
        await gettutorprojs()
          .then((res) => this.setState({tutorproj: res.data}))
          .catch((err) => console.log('tutorproj', err));
      }

      getprojects()
        .then((res) => {
          const prj = JSON.parse(JSON.stringify(res.data));
          const shuffled = prj.sort(() => Math.random() - 0.5);
          this.setState({
            projects: res.data,
            todayprj: shuffled,
          });
        })
        .catch((err) => console.log(err));
    };

    getData();
  }

  render() {
    // console.log('USER',this.state.user)
    console.log('USER', this.context);
    return (
      <View style={styles.container}>
        <View style={styles.logoposition}>
          <Image source={homelogo} style={styles.logostyle}></Image>
        </View>
        <ScrollView>
          <View style={styles.today}>
            <Text style={styles.todaytext}>
              {this.context[0].name} 님의 오늘의 인증!
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              style={{width: '100%', height: '100%'}}>
              {this.context[0].type === 'Tutor' ? (
                <View>
                  {this.state.tutorproj ? (
                    <View style={{flexDirection: 'row'}}>
                      {this.state.tutorproj.map((project, index) => {
                        return (
                          <TodayProject
                            navigation={this.props.navigation}
                            data={project}
                            startDay={project.started_at}
                            key={index}
                          />
                        );
                      })}
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              ) : (
                <View>
                  {this.state.myprojects ? (
                    <View style={{flexDirection: 'row'}}>
                      {this.state.myprojects.map((project, index) => {
                        return (
                          <TodayProject
                            navigation={this.props.navigation}
                            data={project.project}
                            startDay={project.created_at}
                            key={index}
                          />
                        );
                      })}
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              )}
            </ScrollView>
          </View>
          <View style={{marginTop: 30, margin: 20}}>
            <Text style={styles.todayProjectTxt}>
              따숲이 추천하는 오늘의 카드 뉴스{' '}
            </Text>
            <Text style={{marginBottom: 10}}>
              이거만 보고 다시 열공하기 •'-'•)و✧{' '}
            </Text>
            <ScrollView horizontal={true}>
              <TouchableOpacity
                style={{marginRight: 15}}
                onPress={() => {
                  this.props.navigation.navigate('CardNews', {num: 2});
                }}>
                <Image
                  source={card1}
                  style={{width: 200, height: 150, borderRadius: 20}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('CardNews', {num: 1});
                }}>
                <Image
                  source={card2}
                  style={{width: 200, height: 150, borderRadius: 20}}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={{marginTop: 30, margin: 20}}>
            <Text style={styles.todayProjectTxt}>오늘의 프로젝트 🌷</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              style={styles.projectScroll}>
              {this.state.todayprj.map((project, index) => {
                return (
                  <ProjectMini
                    navigation={this.props.navigation}
                    project={project}
                    key={index}></ProjectMini>
                );
              })}
            </ScrollView>
          </View>

          <View style={{marginTop: 30, margin: 20}}>
            <Text style={styles.todayProjectTxt}>
              좋아요가 많은 프로젝트 ❤️
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              style={styles.projectScroll}>
              {this.state.projects.map((project, index) => {
                return (
                  <ProjectMini
                    navigation={this.props.navigation}
                    project={project}
                    key={index}></ProjectMini>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logoposition: {
    marginTop: '15%',
    marginLeft: 30,
    width: '70%',
    height: '10%',
  },
  logostyle: {
    width: '100%',
    height: '80%',
  },
  pickerstyle: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingRight: 30,
  },
  today: {
    flex: 1,
    backgroundColor: colors.maincolor,
    height: 170,
    alignItems: 'center',
  },
  todaytext: {
    marginTop: '3%',
    marginBottom: '3%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  projectScroll: {
    backgroundColor: '#eee',
    height: 190,
    borderRadius: 5,
  },
  todayProjectTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Home;
