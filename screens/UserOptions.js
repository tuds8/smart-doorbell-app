// UserOptions.js
import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UserOptions = () => {
    const [userPhotos, setUserPhotos] = useState([]);
    const [facePhoto, setFacePhoto] = useState(null);

    const pickUserImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            setUserPhotos([...userPhotos, ...result.assets]);
        }
    };

    const pickFaceImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setFacePhoto(result.assets[0]);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <View style={{ width: '100%', marginBottom: 40 }}>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>Create UserID</Text>
                <Button title="Pick Images" onPress={pickUserImages} />
                {userPhotos.length >= 5 && <Button title="Submit UserID" onPress={() => console.log('UserID Submitted')} />}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
                    {userPhotos.map((photo, index) => (
                        <Image key={index} source={{ uri: photo.uri }} style={{ width: 100, height: 100, margin: 5 }} />
                    ))}
                </View>
            </View>

            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>Create FaceID</Text>
                <Button title="Pick Image" onPress={pickFaceImage} />
                {facePhoto && <Button title="Submit FaceID" onPress={() => console.log('FaceID Submitted')} />}
                {facePhoto && (
                    <Image source={{ uri: facePhoto.uri }} style={{ width: 100, height: 100, marginTop: 20 }} />
                )}
            </View>
        </ScrollView>
    );
}

export default UserOptions;
