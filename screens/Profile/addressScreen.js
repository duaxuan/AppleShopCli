import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AddressScreen = ({navigation}) => {
  const [dataAddress, setDataAddress] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn Hùng',
      phone: '0283232222',
      address:
        'Tòa nhà A3, Công Ty Cổ Phần Vật Tư Thiết Bị Và Phụ Tùng , Đường hàm nghi,' +
        ' khu đô thị mỹ đình 1, Phường cầu điễn, Quận nam từ liêm, Hà nội',
    },
    {
      id: 2,
      name: 'Nguyễn Văn Hùng',
      phone: '0283232222',
      address:
        'Tòa nhà A3, Công Ty Cổ Phần Vật Tư Thiết Bị Và Phụ Tùng , Đường hàm nghi,' +
        ' khu đô thị mỹ đình 1, Phường cầu điễn, Quận nam từ liêm, Hà nội',
    },
    {
      id: 3,
      name: 'Nguyễn Văn Hùng',
      phone: '0283232222',
      address:
        'Tòa nhà A3, Công Ty Cổ Phần Vật Tư Thiết Bị Và Phụ Tùng , Đường hàm nghi,' +
        ' khu đô thị mỹ đình 1, Phường cầu điễn, Quận nam từ liêm, Hà nội',
    },
    {
      id: 4,
      name: 'Nguyễn Văn Hùng',
      phone: '0283232222',
      address:
        'Tòa nhà A3, Công Ty Cổ Phần Vật Tư Thiết Bị Và Phụ Tùng , Đường hàm nghi,' +
        ' khu đô thị mỹ đình 1, Phường cầu điễn, Quận nam từ liêm, Hà nội',
    },
    {
      id: 5,
      name: 'Nguyễn Văn Hùng',
      phone: '0283232222',
      address:
        'Tòa nhà A3, Công Ty Cổ Phần Vật Tư Thiết Bị Và Phụ Tùng , Đường hàm nghi,' +
        ' khu đô thị mỹ đình 1, Phường cầu điễn, Quận nam từ liêm, Hà nội',
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={25}
          color="black"
        />
        <Text style={styles.txtHeader}>My address</Text>
      </View>

      <View style={{marginTop: '10%', maxHeight: '90%'}}>
        {/* Avatar */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataAddress}
          keyExtractor={item => item.id.toString()} // Ensure key is a string
          renderItem={({item}) => (
            <Pressable style={styles.itemAddress}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'black'}}>
                  {item.name} | {item.phone}
                </Text>
              </View>
              <Text numberOfLines={3} style={{marginTop: 5, fontSize: 12}}>
                {item.address}
              </Text>
            </Pressable>
          )}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate('AddAddress');
        }}
        style={styles.btnAppAddress}>
        <FontAwesome5 name="plus" color={'black'} />
        <Text style={styles.txtAdd}>Thêm địa chỉ mới</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%',
    marginHorizontal: '6%',
  },
  header: {
    flexDirection: 'row',
    height: 25,
    alignItems: 'center',
  },
  txtHeader: {
    color: 'black',
    left: '30%',
    fontSize: 18,
    fontWeight: '500',
  },
  itemAddress: {
    minHeight: 80,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  btnAppAddress: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '5%',
  },
  txtAdd: {
    marginLeft: 10,
    color: 'black',
  },
});

export default AddressScreen;
