import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { API_Address } from '../../API/getAPI';
import { useIsFocused } from '@react-navigation/native';
const AddressScreen = ({ navigation }) => {

    const status = useIsFocused()
    const [dataAddress, setDataAddress] = useState([
        // {
        //     id: 1,
        //     name: "Nguyễn Văn Hùng",
        //     phone: "0283232222",
        //     address: "Tòa nhà A3, Công Ty Cổ Phần Vật Tư Thiết Bị Và Phụ Tùng , Đường hàm nghi," +
        //         " khu đô thị mỹ đình 1, Phường cầu điễn, Quận nam từ liêm, Hà nội"
        // },
        // {
        //     id: 2,
        //     name: "Nguyễn Văn Hùng",
        //     phone: "0283232222",
        //     address: "Tòa nhà A3, Công Ty Cổ Phần Vật Tư Thiết Bị Và Phụ Tùng , Đường hàm nghi," +
        //         " khu đô thị mỹ đình 1, Phường cầu điễn, Quận nam từ liêm, Hà nội"
        // },
        // {
        //     id: 3,
        //     name: "Nguyễn Văn Hùng",
        //     phone: "0283232222",
        //     address: "Tòa nhà A3, Công Ty Cổ Phần Vật Tư Thiết Bị Và Phụ Tùng , Đường hàm nghi," +
        //         " khu đô thị mỹ đình 1, Phường cầu điễn, Quận nam từ liêm, Hà nội"
        // },

    ])

    const onGetAdress = () => {
        fetch(API_Address + "getAllAddress")
            .then(response => response.json())
            .then(item => setDataAddress(item))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        onGetAdress()
    }, [status])



    return (

        <View style={styles.container}>
            <KeyboardAvoidingView
                style={styles.containeredt}
                behavior={Platform.OS === 'ios' ? 'padding' : null}>
                {/* Back */}
                <View style={styles.header}>
                    <AntDesign
                        onPress={() => navigation.goBack()}
                        name="arrowleft"
                        size={25}
                        color="black"
                    />
                    <Text style={styles.txtHeader}>My address</Text>
                </View>
                <View style={{ marginTop: '10%', maxHeight: "90%" }}>
                    {/* Avatar */}
                    <FlatList
                        data={dataAddress}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (
                                <Pressable style={styles.itemAdress}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "black" }}>{item.name} |</Text>
                                        <Text> {item.phone}</Text>
                                    </View>
                                    <Text style={{ marginTop: 5, fontSize: 12 }}>{item.address}
                                    </Text>
                                </Pressable>
                            )
                        }}
                    />


                    <Pressable
                        onPress={() => {
                            navigation.navigate("AddAddress")
                        }}
                        style={styles.btnAppAdress}>
                        <FontAwesome5 name='plus' color={"black"} />
                        <Text style={styles.txtAdd}>Thêm địa chỉ mới</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    btnAppAdress: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    itemAdress: {
        minHeight: 80,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 5
    },
    container: {
        flex: 1,
    },
    containeredt: {
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
    boderbtnAvatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    boderAvatar: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 100,
    },
    boderIcon: {
        width: 30,
        height: 30,
        bottom: 0,
        alignSelf: 'flex-end',
        position: 'absolute',
        borderRadius: 100,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    txt: {
        color: 'black',
        fontWeight: '600',
    },
    txtInput: {
        borderWidth: 1,
        borderRadius: 10,
        height: 45,
        borderColor: '#C6C6C6',
        paddingLeft: 13,
        marginTop: 10,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#C6C6C6',
        height: 45,
        marginTop: 10,
    },
    countryCode: {
        paddingHorizontal: 10,
        fontSize: 16,
    },
    phoneNumberInput: {
        flex: 1,
        fontSize: 16,
    },
    btnUpda: {
        height: 50,
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtAdd: {
        fontSize: 12,
        color: 'black',
        fontWeight: '500',
        marginLeft: 5
    },
});

export default AddressScreen;
