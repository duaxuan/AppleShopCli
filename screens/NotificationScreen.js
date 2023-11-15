import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {API_Blog, API_URL} from '../API/getAPI';
import {useFocusEffect} from '@react-navigation/native';

const NotificationScreen = ({navigation}) => {
  const [notificationList, setNotificationList] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await axios.get(API_Blog);
      setNotificationList(response.data.message);
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, []),
  );

  const renderNotificationItem = ({item}) => (
    <Pressable
      style={styles.notificationItem}
      onPress={() => navigation.navigate('InfoBlog', {item})}>
      <Image
        style={styles.notificationImage}
        source={{uri: `${API_URL}${item.image}`}}
      />
      <View style={styles.notificationDetails}>
        <Text style={styles.notificationTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.notificationDesc} numberOfLines={2}>
          {item.desc}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông tin</Text>
      </View>
      <FlatList
        data={notificationList}
        renderItem={renderNotificationItem}
        keyExtractor={item => item._id}
        style={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  notificationList: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
    padding: '2%',
    overflow: 'hidden',
  },
  notificationImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  notificationDetails: {
    flex: 1,
    padding: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  notificationDesc: {
    fontSize: 14,
    color: '#666666',
  },
});

export default NotificationScreen;
