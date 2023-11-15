import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {API_URL} from '../../API/getAPI';

const InfoBlog = ({navigation, route}) => {
  const {item} = route.params;

  const formatDate = dateString => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', options);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp" size={25} color="#242424" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Blog ShopApple</Text>
        </View>

        <Image
          style={styles.itemImage}
          source={{uri: `${API_URL}${item.image}`}}
        />
        <View style={styles.content}>
          <Text style={styles.createdAtText}>{formatDate(item.createdAt)}</Text>
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.sectionHeader}>Mô tả</Text>
          <View style={styles.itemDesc}>
            <Text style={styles.descText}>{item.desc}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 'auto',
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  itemImage: {
    height: 300,
    width: '98%',
    marginTop: 10,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
  itemName: {
    fontSize: 21,
    color: 'black',
    fontWeight: '500',
    marginBottom: 10,
  },
  sectionHeader: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  itemDesc: {
    marginTop: 10,
  },
  descText: {
    color: 'black',
  },
  createdAtText: {
    color: 'black',
    marginTop: 10,
  },
});

export default InfoBlog;
