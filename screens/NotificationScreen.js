import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const NotificationScreen = ({navigation}) => {
  //Thay bằng api
  const [array, setArray] = useState([
    {
      title: 'Săn deal thần tốc chỉ 9.000Đ',
      image:
        'https://th.bing.com/th/id/OIP.gNUBs04z8JxuYJ_CzWE9gQHaEc?pid=ImgDet&rs=1',
      information:
        '👉Top deal hàng hiệu giảm đến 30% 🚀Freeship mọi đơn đến 35.000đ 🔥Săn ngay, đừng bỏ lỡ!',
    },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Thông tin khuyến mãi</Text>
      </View>
      {/* FlatList notifi */}
      <FlatList
        data={array}
        style={{marginTop: '2%'}}
        renderItem={data => (
          <Pressable style={styles.itemNoti}>
            <View style={styles.rowItem}>
              <Image style={styles.imageItem} source={{uri: data.item.image}} />
              <View style={{width: '70%'}}>
                <Text style={{fontWeight: '500'}}>{data.item.title}</Text>
                <Text style={{fontSize: 12, marginTop: '3%'}}>
                  {data.item.information}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemNoti: {
    height: 105,
    marginTop: '0.5%',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '1%',
  },
  imageItem: {
    width: 100,
    height: 60,
    marginHorizontal: '2%',
  },
});
