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
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { API_Address } from '../../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddress = ({ navigation }) => {

    const AsyncUser = async () => {
        const user = await AsyncStorage.getItem("user")
        if (user) {
            const newUser = JSON.parse(user)
            setUserID(newUser._id)
        }
    }

    useEffect(() => {
        AsyncUser()
    }, [])
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [street, setStreet] = useState("")
    const [userID, setUserID] = useState("")
    const onAddress = () => {
        const data = { name, phone, address: street, userID }
        fetch(API_Address + "saveAddress", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).catch(err => console.log(err))
    }

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
                    <Text style={styles.txtHeader}>New Address</Text>
                </View>
                <View style={{
                    marginTop: '25%', maxHeight: "90%",
                }}>
                    {/* Avatar */}
                    <TextInput
                        onChangeText={(text) => {
                            setName(text);
                        }}
                        placeholder='Họ và tên'
                        style={styles.inp}
                    />
                    <TextInput
                        onChangeText={(text) => {
                            setPhone(text);
                        }}
                        placeholder='Số điện thoại'
                        style={styles.inp}
                    />
                    <TextInput
                        onChangeText={(text) => {
                            setStreet(text);
                        }}
                        placeholder='Địa chỉ'
                        style={styles.inp}
                    />

                    <Pressable
                        onPress={() => {
                            onAddress()
                        }}
                        style={styles.btnAppAdress}>
                        <Text style={styles.txtAdd}>Hoàn thành</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default AddAddress;

const styles = StyleSheet.create({
    inp: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
        paddingStart: 10,
        marginBottom: 20
    },
    btnAppAdress: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
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
    },
});
