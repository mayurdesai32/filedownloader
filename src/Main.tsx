import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import RNFetchBlob from 'rn-fetch-blob';

const Main = () => {
  const [pasteURL, setPasteURL] = useState<any>();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'My file downloader Storage Permission',
          message:
            'My file downloader App needs access to your Storage ' +
            'so you can save file.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadfile = (): void => {
    const {config, fs} = RNFetchBlob;
    const fileDir = fs.dirs.DownloadDir;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: fileDir + '/download_' + 'fdfsfs' + '.mp4',
        description: 'file Download',
      },
    });

    RNFetchBlob.fetch('GET', pasteURL, {
      Authorization: 'Bearer access-token...',
      // more headers  ..
    }).then(res => {
      //   let status = res.info().status;

      console.log('file downloaded');
      Alert.alert('file downloaded');
    });
    //   .catch((errorMessage, statusCode) => {
    //     console.log(errorMessage);
    //   });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',

        backgroundColor: 'black',
      }}>
      <TextInput
        onChange={e => {
          setPasteURL(e);
        }}
        value={pasteURL}
        style={{
          width: '80%',
          height: 50,
          backgroundColor: 'red',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'green',
          width: 300,
          alignSelf: 'center',
          padding: 20,
          marginTop: 30,
        }}
        onPress={() => {
          if (pasteURL === '') {
            Alert.alert('please enter text');
          } else {
            downloadfile();
          }
        }}>
        <Text>download</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
