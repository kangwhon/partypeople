import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View, ScrollView, Button, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Line from '../container/Line';
import { TouchableHighlight } from 'react-native-gesture-handler';
const PartyDetailScreen = ({ route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [partyData, setPartyData] = useState({
    address: '',
    date: '',
    time: '',
    partyName: '',
    numOfPeople: '',
    description: '',
    image: [],  // add image state
  });

  const navigation = useNavigation();
  const { partyId } = route.params;  // receive partyId from previous screen

  useEffect(() => {
    fetchPartyDetail();
  }, []);

  const fetchPartyDetail = async () => {
    try {
      const response = await fetch('http://your-backend-server-url/api/partyDetail', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partyId })  // send partyId to server
      });
      
      const data = await response.json();
      setPartyData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch('http://your-backend-server-url/api/toggleFavorite', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partyName: partyData.partyName })
      });
      
      const data = await response.json();
      setIsFavorite(data.isFavorite);
    } catch (e) {
      console.error(e);
    }
  };

  const joinChatRoom = async () => {
    try {
      const response = await fetch('http://your-backend-server-url/api/joinChatRoom', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partyId: partyData.id }) // partyData.id는 참석하려는 파티의 아이디입니다.
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const chatRoomId = responseData.chatRoomId; // 서버에서 반환하는 채팅방 아이디를 받아옵니다.
        navigation.navigate('Chat', { chatRoomId: chatRoomId }); // 채팅방 화면으로 이동할 때 chatRoomId를 같이 전달합니다.
      } else {
        console.error('Failed to join chat room');
      }
    } catch (e) {
      console.error(e);
    }
  };


  const handleGoBack = () => {
    navigation.goBack(); // 이전으로 돌아가기
  }


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
        {partyData.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.cardImage} />
        ))}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userId: partyData.hostId })} style={styles.hostProfile}>
  <View style={styles.profileTextContainer}>
    <MaterialIcons name="account-circle" size={50} color="gray" />
    <View>
      <Text>{partyData.hostName}</Text>
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
      <View style={styles.cartContainer}>
      <MaterialIcons name="shopping-cart" size={28} color="gray" />
      </View>
      <View style={styles.buttonContainer}>
        
      
          {/* <Text style={styles.cartText}>100</Text> */}
        </View>
        <Button title="참석하기" color="gray" onPress={joinChatRoom}/>
    
      <View>
      <TouchableOpacity onPress={toggleFavorite}>
      <View>
        {isFavorite ? (
          <MaterialIcons name="favorite" size={28} color="red" />
        ) : (
          <MaterialIcons name="favorite-border" size={28} color="gray" />
        )}
      </View>
    </TouchableOpacity>
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
