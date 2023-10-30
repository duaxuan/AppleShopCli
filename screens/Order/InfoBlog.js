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

const InfoBlog = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={styles.backIcon}
              name="arrow-back-sharp"
              size={25}
              color="#242424"
            />
          </TouchableOpacity>
          <Text style={styles.itemTitle}>Blog ShopApple</Text>
        </View>

        <Image style={styles.itemImage} source={{uri: item.image}} />
        <View style={{padding: 20}}>
          <Text style={styles.itemName}>{item.title}</Text>
        </View>
        <Text style={styles.sectionHeader}>Mô tả</Text>
        <View style={styles.itemDesc}>
          <Text style={{color: 'black'}}>{item.desc}</Text>
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
    margin: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    left: '50%',
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  itemImage: {
    height: 300,
    width: '98%',
    marginTop: '2%',
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 10,
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
    marginLeft: 20,
  },
  itemDesc: {
    marginLeft: 20,
    marginTop: 10,
  },
});

export default InfoBlog;
