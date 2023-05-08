import React ,{useState,useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, Image, View, ScrollView, Button, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Line from '../container/Line';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableHighlight } from 'react-native-gesture-handler';
const PartyDetailScreen = () => {
  const [partyData, setPartyData] = useState({
    address: '',
    date: '',
    time: '',
    partyName: '',
    numOfPeople: '',
    description: '',
  });



  const navigation = useNavigation();

  const handleButtonPress = () => {
    console.log("Hi");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('partyData');
        setPartyData(storedData ? JSON.parse(storedData) : []);
      } catch(e){
        console.log(e)
      }
    }

    getData();
  }, []);

  const handleGoBack = () => {
    navigation.goBack(); // 이전으로 돌아가기
  }

  const handleAttendeePress = () => {
    // 참가자 버튼을 눌렀을 때 동작
    console.log("참가자 버튼이 눌렸습니다.");
  }

  const images = [
    require('../assets/party1.jpeg'),
    require('../assets/party2.jpeg'),
    require('../assets/party3.jpeg'),
    // 이미지 경로 추가
  ]
  
  return (
    <ScrollView>
      <Line style={{marginTop: 20}} />

      <TouchableOpacity onPress={handleGoBack} style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 2,}}>
        <MaterialIcons name="chevron-left" size={24} color="black" style={{ marginRight: 2}} />
        <Text>{partyData.partyName}</Text>
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <Image source={require('../assets/party1.jpeg')} style={styles.cardImage} />
      </View>

      <TouchableOpacity onPress={handleButtonPress} style={styles.hostProfile}>
        <View style={styles.profileTextContainer}>
          <MaterialIcons name="account-circle" size={50} color="gray" />
          <View>
            <Text>김영찬</Text>
            <Text>Show profile</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="black" style={{marginRight:8}}/>
      </TouchableOpacity>

      <Line/>

      <View style={{width:"90%", marginHorizontal:"5%", height:177}}>
        <Text>파티소개</Text>
        <Text>{partyData.description} {partyData.numOfPeople} {partyData.date} {partyData.time} {partyData.address}</Text>
      </View>

      <Line/>  

      {/* onPress 동작이 안함 */}
      <View style={styles.attendeesContainer}>
        <ScrollView horizontal>
          {[...Array(10)].map((_, index) => (
            <TouchableHighlight
              key={index}
              underlayColor="#DDD"
              onPress={handleAttendeePress}
              style={styles.attendeeButton}
            >
              <View style={styles.attendee}>
                <MaterialIcons name="account-circle" size={50} color="gray"/>
                <Text>참가자</Text>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.cartContainer}>
          <MaterialIcons name="shopping-cart" size={28} color="gray" />
          {/* <Text style={styles.cartText}>100</Text> */}
        </View>
          <Button
            title="참석하기"
            color="gray"
            onPress={() => Alert.alert("참석하기를 누르셨습니다!")}
          />
        <MaterialIcons name="favorite-border" size={28} color="gray" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 2,
  },
  partyTitle: {
    marginLeft: 2,
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  cardImage: {
    width: '90%',
    height: 222,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  hostProfile: {
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  profileTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    marginLeft: '5%',
    marginBottom: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: '5%',
  },
  attendeesContainer: {
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 5,
  },
  attendeeButton: {
    marginRight: 10,
  },
  attendee: {
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 5,
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartText: {
    marginLeft: 5,
  },
});


export default PartyDetailScreen;
