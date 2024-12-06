


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Alert,
//   Dimensions,
//   Linking,
//   Platform,
// } from 'react-native';
// import RNFS from 'react-native-fs';

// import EvilIcons from "react-native-vector-icons/EvilIcons"

// const WHATSAPP_STATUS_DIR = 'Android/media/com.whatsapp/WhatsApp/Media/.Statuses';

// const StatusDownloaderScreen = () => {
//   const [statuses, setStatuses] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('Images'); // To track the selected view
//   const [savedStatuses, setSavedStatuses] = useState([]); // To store saved statuses
//   const screenWidth = Dimensions.get('window').width;

//   useEffect(() => {
//     fetchStatuses();
//   }, []);

//   const fetchStatuses = async () => {
//     const statusPath = `${RNFS.ExternalStorageDirectoryPath}/${WHATSAPP_STATUS_DIR}`;
//     try {
//       const files = await RNFS.readDir(statusPath);
//       const statusFiles = files.filter(
//         (file) =>
//           file.isFile() &&
//           (file.name.endsWith('.jpg') || file.name.endsWith('.mp4'))
//       );
//       setStatuses(statusFiles);
//     } catch (error) {
//       console.error('Error accessing statuses:', error);
//       Alert.alert('Error', 'Could not access WhatsApp statuses.');
//     }
//   };

//   const saveStatus = async (file) => {
//     const downloadPath = `${RNFS.ExternalStorageDirectoryPath}/WhatsAppDownloader`;
//     try {
//       await RNFS.mkdir(downloadPath);
//       const newFilePath = `${downloadPath}/${file.name}`;
//       await RNFS.copyFile(file.path, newFilePath);
//       setSavedStatuses((prevSaved) => [...prevSaved, file]);
//       Alert.alert('Saved', `Status saved to ${newFilePath}`);
//     } catch (error) {
//       console.error('Error saving status:', error);
//       Alert.alert('Error', 'Could not save the status.');
//     }
//   };

//   const openWhatsApp = async () => {
//     const url = 'whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}';
//     try {
//       const supported = await Linking.canOpenURL(url);
//       if (supported) {
//         await Linking.openURL(url);
//       } else {

//         console.log(" Error, WhatsApp is not installed or cannot be opened on this device.");

//         Alert.alert(
//           'Error',
//           'WhatsApp is not installed or cannot be opened on this device.'
//         );

//       }
//     } catch (error) {
//       console.error('Error opening WhatsApp:', error);
//       Alert.alert('Error', 'Something went wrong while trying to open WhatsApp.');
//     }
//   };

//   const renderStatusItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.statusContainer, { width: screenWidth / 2 - 20 }]}
//       onPress={() => saveStatus(item)}
//     >
//       <Image
//         source={{ uri: `file://${item.path}` }}
//         style={styles.statusImage}
//         resizeMode="cover"
//       />
//     </TouchableOpacity>
//   );

//   // Filter statuses into images and videos
//   const images = statuses.filter((file) => file.name.endsWith('.jpg'));
//   const videos = statuses.filter((file) => file.name.endsWith('.mp4'));

//   // Determine which data to display based on selectedTab
//   const dataToDisplay =
//     selectedTab === 'Images'
//       ? images
//       : selectedTab === 'Videos'
//         ? videos
//         : savedStatuses;

//   return (
//     <View style={styles.container}>

//       <View style={styles.iconContainer} >

//         <View style = {{flexDirection:"row"}}>

//             <TouchableOpacity style = {{top:"12%"}}>
//                <EvilIcons  name = "navicon" size = {35} color= {"green"}  />
//             </TouchableOpacity>
//              <Text style={styles.title}>Status Saver</Text>
//         </View>


//         <View>

//           <TouchableOpacity onPress={openWhatsApp}>
//             <Image
//               source={{
//                 uri: 'data:image/png;base64,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',
//               }}
//               style={styles.iconImage}
//             />

//           </TouchableOpacity>



//         </View>

//       </View>

//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'Images' && styles.selectedTab]}
//           onPress={() => setSelectedTab('Images')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === 'Images' && styles.selectedTabText, // Apply a special style for selected tab
//             ]}
//           >
//             Images
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'Videos' && styles.selectedTab]}
//           onPress={() => setSelectedTab('Videos')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === 'Videos' && styles.selectedTabText, // Apply a special style for selected tab
//             ]}
//           >
//             Videos
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'Saved' && styles.selectedTab]}
//           onPress={() => setSelectedTab('Saved')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === 'Saved' && styles.selectedTabText, // Apply a special style for selected tab
//             ]}
//           >
//             Saved
//           </Text>
//         </TouchableOpacity>

//       </View>

//       <Text style={styles.subtitle}>Statuses:</Text>
//       <FlatList
//         data={dataToDisplay}
//         keyExtractor={(item) => item.path}
//         renderItem={renderStatusItem}
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     width: "100%",
//     height: "100%"

//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: 'green',
//     marginVertical: 15,
//     left:"20%"
//   },
//   iconContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//     width: "96%",
//     padding: 30,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 4,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     top: "2%",
//     alignSelf: "center"
//   },
//   iconImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//   },
//   iconText: {
//     fontSize: 12,
//     marginTop: 10,
//     color: '#25D366',
//     fontWeight: '600',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 15,
//   },
//   tabButton: {
//     padding: 10,
//     marginHorizontal: 10,
//     borderRadius: 15,
//     backgroundColor: '#eaeaea',
//   },
//   selectedTab: {
//     backgroundColor: '#25D366',
//   },
//   selectedTabText: {
//     color: '#fff', // Change to the desired color for selected tab text
//   },

//   tabText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#4A4A4A',
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#4A4A4A',
//     marginVertical: 10,
//     left: "5%"
//   },
//   listContainer: {
//     alignItems: 'center',
//   },
//   statusContainer: {
//     margin: 10,
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#eaeaea',
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   statusImage: {
//     width: '100%',
//     height: 150,
//   },
// });

// export default StatusDownloaderScreen;


///////////Most important////////////////////////////////////

import React, { useEffect, useState, useCallback } from 'react';
import {
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
  Linking,
  ActivityIndicator,
  MediaScannerConnection
 
  
} from 'react-native';
import RNFS from 'react-native-fs';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import RNFetchBlob from "rn-fetch-blob";
//import CameraRoll from "@react-native-media-capture";

const WHATSAPP_STATUS_DIR = 'Android/media/com.whatsapp/WhatsApp/Media/.Statuses';

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const StatusDownloaderScreen = () => {

  const navigation = useNavigation();

  const [statuses, setStatuses] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Images'); // Images, Videos, or Saved
  const [savedStatuses, setSavedStatuses] = useState([]); // Store saved statuses
  const [fullScreenImage, setFullScreenImage] = useState(null); // Image for full-screen view
  const screenWidth = Dimensions.get('window').width;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whatsappReturn, setWhatsappReturn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Current playback time
  const [duration, setDuration] = useState(0); // To
  const [isSaved, setIsSaved] = useState(false); // Track save status
  const [savedFiles, setSavedFiles] = useState([]); // To track saved files
  

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const onLoad = (data) => {
    setDuration(data.duration);
  };



  // const saveFile = async () => {
  //   try {
  //     if (!fullScreenImage) {
  //       console.warn("No file to save");
  //       return;
  //     }
  
  //     const fileName = fullScreenImage.split("/").pop(); // Get the file name
  //     const savePath = `${RNFS.PicturesDirectoryPath}/${fileName}`; // Path to save the file
  
  //     console.log("File will be saved to path:", savePath); // Log the full path where the file will be saved
  
  //     if (Platform.OS === "android") {
  //       // Request storage permissions
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: "Storage Permission Needed",
  //           message: "This app needs access to your storage to save files.",
  //         }
  //       );
  
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         ToastAndroid.show("Permission Denied", ToastAndroid.SHORT);
  //         return;
  //       }
  //     } else if (Platform.OS === "ios") {
  //       const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
  //       if (result !== RESULTS.GRANTED) {
  //         const requestResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
  //         if (requestResult !== RESULTS.GRANTED) {
  //           Alert.alert("Permission Denied", "Cannot save file without permission.");
  //           return;
  //         }
  //       }
  //     }
  
  //     // Copy the file to the gallery directory
  //     await RNFS.copyFile(fullScreenImage, savePath);
  
  //     console.log("File successfully saved to path:", savePath); // Log the full path after saving the file
  
  //     // Add the saved file to the list of saved files
  //     setSavedFiles((prev) => [...prev, fullScreenImage]);
  
  //     // Show success message
  //     if (Platform.OS === "android") {
  //       ToastAndroid.show("File saved to gallery!", ToastAndroid.SHORT);
  //     } else {
  //       Alert.alert("Success", "File saved to gallery!");
  //     }
  //   } catch (error) {
  //     console.error("Error saving file:", error);
  //     if (Platform.OS === "android") {
  //       ToastAndroid.show("Failed to save file.", ToastAndroid.SHORT);
  //     } else {
  //       Alert.alert("Error", "Failed to save file.");
  //     }
  //   }
  // };


  
  
  const saveFile = async () => {
    try {
      if (!fullScreenImage) {
        console.warn("No file to save");
        return;
      }
  
      const fileName = fullScreenImage.split("/").pop(); // Get the file name
      const savePath = `${RNFS.PicturesDirectoryPath}/${fileName}`; // Path to save the file
  
      console.log("File will be saved to path:", savePath); // Log the full path where the file will be saved
  
      if (Platform.OS === "android") {
        // Request storage permissions
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Needed",
            message: "This app needs access to your storage to save files.",
          }
        );
  
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          ToastAndroid.show("Permission Denied", ToastAndroid.SHORT);
          return;
        }
      } else if (Platform.OS === "ios") {
        const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
        if (result !== RESULTS.GRANTED) {
          const requestResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
          if (requestResult !== RESULTS.GRANTED) {
            Alert.alert("Permission Denied", "Cannot save file without permission.");
            return;
          }
        }
      }
  
      // Copy the file to the gallery directory
      await RNFS.copyFile(fullScreenImage, savePath);
  
      // Notify Android to add the saved file to the media gallery
      if (Platform.OS === "android") {
        // Use MediaScannerConnection to scan the file and add it to the gallery
        RNFS.scanFile(savePath)
          .then(() => {
            console.log("File added to media scan:", savePath);
            ToastAndroid.show("File saved to gallery!", ToastAndroid.SHORT);
          })
          .catch((error) => {
            console.error("Error scanning file:", error);
          });
      }
  
      // Add the saved file to the list of saved files
      setSavedFiles((prev) => [...prev, fullScreenImage]);
  
      // Show success message for iOS
      if (Platform.OS === "ios") {
        Alert.alert("Success", "File saved to gallery!");
      }
  
    } catch (error) {
      console.error("Error saving file:", error);
      if (Platform.OS === "android") {
        ToastAndroid.show("Failed to save file.", ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", "Failed to save file.");
      }
    }
  };
  


  const closeModal = () => {
    setIsSaved(false);
    setFullScreenImage(null);
  };

 // useEffect(() => {
  //   fetchStatuses();
  // }, []);

  useEffect(() => {
    if (!isModalVisible) {
      fetchStatuses();  // Call fetchStatuses whenever the modal is closed
    }
  }, [isModalVisible]);  // Dependency array makes sure it runs when modal state changes


  useFocusEffect(
    useCallback(() => {
      fetchStatuses();
    }, [])
  );

  // const fetchStatuses = async () => {
  //   const statusPath = `${RNFS.ExternalStorageDirectoryPath}/${WHATSAPP_STATUS_DIR}`;
  //   try {
  //     const files = await RNFS.readDir(statusPath);
  //     const statusFiles = files.filter(
  //       (file) =>
  //         file.isFile() &&
  //         (file.name.endsWith('.jpg') || file.name.endsWith('.mp4'))
  //     );
  //     setStatuses(statusFiles);
  //   } catch (error) {
  //     console.error('Error accessing statuses:', error);
  //     Alert.alert('Error', 'Could not access WhatsApp statuses.');
  //   }
  // };

  const fetchStatuses = async () => {
    const statusPath = `${RNFS.ExternalStorageDirectoryPath}/${WHATSAPP_STATUS_DIR}`;
    console.log('Status path:', statusPath); // Log the status path
    try {
      setLoading(true);
      setStatuses([]);
      console.log('Fetching files from the status directory...');
      const files = await RNFS.readDir(statusPath);
      console.log('Files fetched:', files); // Log the raw files fetched
      const statusFiles = files.filter(
        (file) =>
          file.isFile() &&
          (file.name.endsWith('.jpg') || file.name.endsWith('.mp4'))
      );
      console.log('Filtered status files:', statusFiles); // Log the filtered files
      setStatuses(statusFiles);
    } catch (error) {
      console.error('Error accessing statuses:', error);
      Alert.alert('Error', 'Could not access WhatsApp statuses.');
    } finally {
      setLoading(false);
    }
  };

  const saveStatus = async (file) => {
    const downloadPath = `${RNFS.ExternalStorageDirectoryPath}/WhatsAppDownloader`;
    try {
      await RNFS.mkdir(downloadPath);
      const newFilePath = `${downloadPath}/${file.name}`;
      await RNFS.copyFile(file.path, newFilePath);
      setSavedStatuses((prevSaved) => [...prevSaved, file]);
      Alert.alert('Saved', `Status saved to ${newFilePath}`);
    } catch (error) {
      console.error('Error saving status:', error);
      Alert.alert('Error', 'Could not save the status.');
    }
  };

  const openWhatsApp = () => {

    const whatsappURL = 'whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}';
    Linking.canOpenURL(whatsappURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsappURL);
        } else {
          Alert.alert('Error', 'WhatsApp is not installed on this device.');
        }
      })
      .catch((err) => console.error('Error opening WhatsApp:', err));
  };

  // const openWhatsApp = () => {

  //   const whatsappURL = 'whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}';
  //   Linking.canOpenURL(whatsappURL)
  //     .then((supported) => {
  //       if (supported) {
  //         setWhatsappReturn(false); // Reset before opening WhatsApp
  //         Linking.openURL(whatsappURL)
  //         .then(() => {
  //           setWhatsappReturn(true); // Trigger state on return
  //         })
  //         .catch((err) => console.error('Error opening WhatsApp:', err));


  //       } else {
  //         Alert.alert('Error', 'WhatsApp is not installed on this device.');
  //       }
  //     })
  //     .catch((err) => console.error('Error opening WhatsApp:', err));
  // };



  const renderStatusItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.statusContainer, { width: screenWidth / 2 - 20 }]}
      onPress={() => setFullScreenImage(item.path)} // Open image in full screen
    >
      <Image
        source={{ uri: `file://${item.path}` }}
        style={styles.statusImage}
        resizeMode="cover"
      />

      {item.name.endsWith('.mp4') && (
        <Ionicons
          name="play-circle"
          size={36}
          color="white"
          style={styles.videoIcon}
        />
      )}
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => saveStatus(item)}
      >
        <Text style={styles.downloadText}>Save</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // const renderStatusItem = ({ item }) => (
  //   <TouchableOpacity
  //     style={[styles.statusContainer, { width: screenWidth / 2 - 20 }]}
  //     onPress={() => {
  //       if (item.name.endsWith('.mp4')) {
  //         setFullScreenImage(item.path); // Open video in full-screen mode
  //       } else {
  //         setFullScreenImage(item.path); // Open image in full-screen mode
  //       }
  //     }}
  //   >
  //     {item.name.endsWith('.mp4') ? (
  //       <View>
  //         <Video
  //           source={{ uri: `file://${item.path}` }}
  //           style={styles.videoThumbnail}
  //           paused={true} // Keeps the video paused initially
  //           resizeMode="cover"
  //         />
  //         <Ionicons
  //           name="play-circle"
  //           size={36}
  //           color="black"
  //           style={styles.videoIcon}
  //         />
  //       </View>
  //     ) : (
  //       <Image
  //         source={{ uri: `file://${item.path}` }}
  //         style={styles.statusImage}
  //         resizeMode="cover"
  //       />
  //     )}
  //     <TouchableOpacity
  //       style={styles.downloadButton}
  //       onPress={() => saveStatus(item)}
  //     >
  //       <Text style={styles.downloadText}>Save</Text>
  //     </TouchableOpacity>
  //   </TouchableOpacity>
  // );

  // Filter statuses into images and videos

  const images = statuses.filter((file) => file.name.endsWith('.jpg'));
  const videos = statuses.filter((file) => file.name.endsWith('.mp4'));

  // Determine which data to display based on selectedTab
  const dataToDisplay =
    selectedTab === 'Images'
      ? images
      : selectedTab === 'Videos'
        ? videos
        : savedStatuses;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <EvilIcons name="navicon" size={35} color={'green'} />
          </TouchableOpacity>

          <Modal
            visible={isModalVisible}
            transparent={true}
            // onRequestClose={() => setIsModalVisible(false)} // Close modal on back button
            onRequestClose={() => {
              setIsModalVisible(false); // Close modal

            }}

          >
            <View style={styles.fullScreenModal}>
              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Ionicons name="close" size={30} color="black" />
              </TouchableOpacity>

              <View>

                {/* <LoginLogo/> */}

                <TouchableOpacity style={{ alignSelf: "center"}} onPress={openWhatsApp}>

                  {/* <Image
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKimsLvTitGNjXhbytt4yhhqnejgi_x4l9g&s' }}
                  style={{ width: 100, height: 100, borderRadius: 20, alignSelf: "center", top: "60%" }}
                  resizeMode="cover"
                /> */}
                  <FontAwesome name="whatsapp" size={60} color={'green'} />

                </TouchableOpacity>


                <Text style={{ fontSize: 20, fontWeight: "600", color: "green", alignSelf: "center",top:"20%"}}>Open Whatsapp</Text>

              </View>

              {/* <View style={{ left: "10%", marginVertical: 20, top: "15%" }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
                  <Icon name="language" size={27} color="#3498db" style={{ marginRight: 10 }} />
                  <TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Language</Text>
                  </TouchableOpacity>

                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
                  <Icon name="help-outline" size={27} color="orange" style={{ marginRight: 10 }} />
                  <TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>How to Use</Text>
                  </TouchableOpacity>

                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
                  <Icon name="share" size={27} color="#f1c40f" style={{ marginRight: 10 }} />
                  <TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Share</Text>
                  </TouchableOpacity>

                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
                  <Icon name="star-rate" size={27} color="#e74c3c" style={{ marginRight: 10 }} />
                  <TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Rate Us</Text>
                  </TouchableOpacity>

                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
                  <Icon name="privacy-tip" size={27} color="#34495e" style={{ marginRight: 10 }} />
                  <TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Privacy Policy</Text>
                  </TouchableOpacity>

                </View>
              </View> */}

            </View>
          </Modal>

          <Text style={styles.title}>Status Saver</Text>
        </View>
        {/* <TouchableOpacity onPress={openWhatsApp} style={{ right: "3%" }} >
          <FontAwesome name="whatsapp" size={30} color={'green'} />
        </TouchableOpacity> */}
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Images' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('Images')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Images' && styles.activeTabText,
            ]}
          >
            Images
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Videos' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('Videos')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Videos' && styles.activeTabText,
            ]}
          >
            Videos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Saved' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('Saved')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Saved' && styles.activeTabText,
            ]}
          >
            Saved
          </Text>
        </TouchableOpacity>
      </View>

      {/* Status List */}
      {/* <FlatList
        data={dataToDisplay}
        renderItem={renderStatusItem}
        // keyExtractor={(item) => item.name}
        keyExtractor={(item) => item.path} // Unique identifier
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      /> */}

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={dataToDisplay}
          renderItem={renderStatusItem}
          keyExtractor={(item) => item.path}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Full Screen Modal */}

      {fullScreenImage && (
        <Modal
          visible={!!fullScreenImage}
          transparent={true}
          // onRequestClose={() => setFullScreenImage(null)}
          onRequestClose={closeModal}
        >
          <View style={styles.fullScreenModal1}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => setFullScreenImage(null)}>
                <Ionicons name="arrow-back" size={25} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerText}>
                {fullScreenImage?.endsWith(".jpg") ? "Image" : "Video"}
              </Text>
              <TouchableOpacity onPress={() => setFullScreenImage(null)}>
                <Ionicons name="close" size={25} color="white" />
              </TouchableOpacity>
            </View>

            {fullScreenImage.endsWith(".mp4") ? (
              <Video
                source={{ uri: `file://${fullScreenImage}` }}
                style={styles.fullScreenVideo}
                controls={true} // Enables playback controls
                resizeMode="contain"
                onProgress={onProgress} // Track progress
                onLoad={onLoad} // Get duration
              />
            ) : (
              <Image
                source={{ uri: `file://${fullScreenImage}` }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            )}

            {fullScreenImage.endsWith(".mp4") && (
              <>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${(currentTime / duration) * 100}%` },
                    ]}
                  />
                </View>

                {/* Time Display */}
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                  <Text style={styles.timeText}> / {formatTime(duration)}</Text>
                </View>
              </>
            )}

            <View style={styles.saveContainer}>
              {savedFiles.includes(fullScreenImage) ? (
                <MaterialIcons name="check" size={18} color={"#fff"} />
              ) : (
                <TouchableOpacity style = {{flexDirection:"row"}} onPress={saveFile}>
                  <MaterialIcons name="save-alt" size={18} color={"#fff"} />
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    top: "1%"
  },
  iconContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: 'green',
    marginLeft: "30%"
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: { padding: 10 },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: 'green'
  },
  tabText: {
    fontSize: 16,
    color: '#888'
  },
  activeTabText: {
    color: 'green'
  },
  statusContainer: {
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden'
  },
  statusImage: {
    width: '100%',
    height: 150
  },
  downloadButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  downloadText: {
    color: '#fff',
    fontSize: 12
  },
  listContainer: {
    paddingBottom: 20
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 20,
    left: 10,
  },
  // fullScreenImage: {
  //   width: '100%',
  //   height: '80%'
  // },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
  },

  closeButtonText: {
    fontSize: 16, color: 'black', fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 20,
    zIndex: 1, // Ensures it is on top of other elements
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 10,
  },


  mediaTypeText: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  videoIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  // fullScreenModal: {
  //   flex: 1,
  //   backgroundColor: '#fff', // Semi-transparent background
  //   width: "100%",
  //   height: "100%"

  // },
  // closeModalButton: {
  //   position: 'absolute',
  //   top: 40,
  //   right: 20,
  //   zIndex: 1,
  // },

  videoThumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  fullScreenVideo: {
    width: '100%',
    height: '80%',
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
  },
  videoIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    zIndex: 1,
  },
  fullScreenModal1: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: "center",
    justifyContent: "center"

  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:"center",
    alignItems:"center",
   

  },
  closeModalButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
  },
  // fullScreenModal: {
  //   flex: 1,
  //   backgroundColor: "black",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  // fullScreenVideo: {
  //   width: "100%",
  //   height: "70%",
  // },
  // fullScreenImage: {
  //   width: "100%",
  //   height: "70%",
  // },
  progressBarContainer: {
    height: 5,
    width: "90%",
    backgroundColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "green",
  },
  saveContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 5,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 5,
  },
  timeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default StatusDownloaderScreen;


////////////////////////////////////////////////////////////////






// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Alert,
//   Dimensions,
//   Modal,
//   ActivityIndicator,
//   Linking,
// } from 'react-native';
// import RNFS from 'react-native-fs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const WHATSAPP_STATUS_DIR = 'Android/media/com.whatsapp/WhatsApp/Media/.Statuses';

// const StatusDownloaderScreen = () => {
//   const [statuses, setStatuses] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('Images'); // Images, Videos, or Saved
//   const [savedStatuses, setSavedStatuses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState(null);
//   const screenWidth = Dimensions.get('window').width;

//   useEffect(() => {
//     fetchStatuses();
//   }, []);

//   const fetchStatuses = async () => {
//     const statusPath = `${RNFS.ExternalStorageDirectoryPath}/${WHATSAPP_STATUS_DIR}`;
//     try {
//       setLoading(true);
//       const files = await RNFS.readDir(statusPath);
//       const statusFiles = files.filter(
//         (file) => file.isFile() && (file.name.endsWith('.jpg') || file.name.endsWith('.mp4'))
//       );
//       setStatuses(statusFiles);
//     } catch (error) {
//       Alert.alert('Error', 'Could not access WhatsApp statuses.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openWhatsApp = () => {
//     const whatsappURL = 'whatsapp://';
//     Linking.canOpenURL(whatsappURL)
//       .then((supported) => {
//         if (supported) {
//           Linking.openURL(whatsappURL);
//         } else {
//           Alert.alert('Error', 'WhatsApp is not installed on this device.');
//         }
//       })
//       .catch((err) => console.error('Error opening WhatsApp:', err));
//   };

//   const saveStatus = async (file) => {
//     const downloadPath = `${RNFS.ExternalStorageDirectoryPath}/WhatsAppDownloader`;
//     try {
//       await RNFS.mkdir(downloadPath);
//       const newFilePath = `${downloadPath}/${file.name}`;
//       await RNFS.copyFile(file.path, newFilePath);
//       setSavedStatuses((prev) => [...prev, file]);
//       Alert.alert('Saved', `Status saved to ${newFilePath}`);
//     } catch (error) {
//       Alert.alert('Error', 'Could not save the status.');
//     }
//   };

//   const renderStatusItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.statusContainer, { width: screenWidth / 2 - 20 }]}
//       onPress={() => setFullScreenImage(item.path)}
//     >
//       <Image
//         source={{ uri: `file://${item.path}` }}
//         style={styles.statusImage}
//         resizeMode="cover"
//       />
//       {item.name.endsWith('.mp4') && (
//         <Ionicons name="play-circle" size={36} color="white" style={styles.videoIcon} />
//       )}
//       <TouchableOpacity
//         style={styles.downloadButton}
//         onPress={() => saveStatus(item)}
//       >
//         <Text style={styles.downloadText}>Save</Text>
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   const images = statuses.filter((file) => file.name.endsWith('.jpg'));
//   const videos = statuses.filter((file) => file.name.endsWith('.mp4'));
//   const dataToDisplay =
//     selectedTab === 'Images'
//       ? images
//       : selectedTab === 'Videos'
//       ? videos
//       : savedStatuses;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Status Saver</Text>
//         <TouchableOpacity onPress={openWhatsApp}>
//           <FontAwesome name="whatsapp" size={30} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.tabContainer}>
//         {['Images', 'Videos', 'Saved'].map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             style={[styles.tab, selectedTab === tab && styles.activeTab]}
//             onPress={() => setSelectedTab(tab)}
//           >
//             <Text
//               style={[styles.tabText, selectedTab === tab && styles.activeTabText]}
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       {loading ? (
//         <ActivityIndicator size="large" color="green" />
//       ) : (
//         <FlatList
//           data={dataToDisplay}
//           renderItem={renderStatusItem}
//           keyExtractor={(item) => item.path}
//           numColumns={2}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}
//       {fullScreenImage && (
//         <Modal visible transparent>
//           <View style={styles.fullScreenContainer}>
//             <Image source={{ uri: `file://${fullScreenImage}` }} style={styles.fullScreenImage} />
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setFullScreenImage(null)}
//             >
//               <Ionicons name="close" size={30} color="white" />
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#2ecc71',
//   },
//   title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
//   tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
//   tab: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, backgroundColor: '#f0f0f0' },
//   activeTab: { backgroundColor: '#2ecc71' },
//   tabText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
//   activeTabText: { color: '#fff' },
//   listContainer: { paddingHorizontal: 10 },
//   statusContainer: { margin: 10, borderRadius: 10, overflow: 'hidden', backgroundColor: '#f0f0f0' },
//   statusImage: { height: 150, borderRadius: 10 },
//   downloadButton: { position: 'absolute', bottom: 10, right: 10, backgroundColor: '#0008', padding: 5 },
//   downloadText: { color: '#fff' },
//   videoIcon: { position: 'absolute', top: '40%', left: '40%' },
//   fullScreenContainer: { flex: 1, justifyContent: 'center', backgroundColor: '#000' },
//   fullScreenImage: { flex: 1, resizeMode: 'contain' },
//   closeButton: { position: 'absolute', top: 40, right: 20, backgroundColor: '#0008', padding: 10 },
// });

// export default StatusDownloaderScreen;
































