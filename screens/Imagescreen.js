import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Linking,
  Dimensions,
  Platform,
} from 'react-native';
import RNFS from 'react-native-fs';

const WHATSAPP_STATUS_DIR = 'Android/media/com.whatsapp/WhatsApp/Media/.Statuses';

const Imagescreen = () => {
  const [statuses, setStatuses] = useState([]);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    requestPermissions();
    fetchStatuses();
  }, []);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Cannot access statuses without permission.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchStatuses = async () => {
    const statusPath = `${RNFS.ExternalStorageDirectoryPath}/${WHATSAPP_STATUS_DIR}`;
    try {
      const files = await RNFS.readDir(statusPath);
      const statusFiles = files.filter(
        (file) =>
          file.isFile() &&
          (file.name.endsWith('.jpg') || file.name.endsWith('.mp4'))
      );
      setStatuses(statusFiles);
    } catch (error) {
      console.error('Error accessing statuses:', error);
      Alert.alert('Error', 'Could not access WhatsApp statuses.');
    }
  };

  const saveStatus = async (file) => {
    const downloadPath = `${RNFS.ExternalStorageDirectoryPath}/WhatsAppDownloader`;
    try {
      await RNFS.mkdir(downloadPath);
      const newFilePath = `${downloadPath}/${file.name}`;
      await RNFS.copyFile(file.path, newFilePath);
      Alert.alert('Saved', `Status saved to ${newFilePath}`);
    } catch (error) {
      console.error('Error saving status:', error);
      Alert.alert('Error', 'Could not save the status.');
    }
  };

  // const openWhatsApp = async () => {
  //   const url = 'whatsapp://send?text=Hello';
  //   try {
  //     const supported = await Linking.canOpenURL(url);
  //     if (supported) {
  //       await Linking.openURL(url);
  //     } else {
  //       Alert.alert(
  //         'Error',
  //         'WhatsApp is not installed or cannot be opened on this device.'
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error opening WhatsApp:', error);
  //     Alert.alert('Error', 'Something went wrong while trying to open WhatsApp.');
  //   }
  // };

  const openWhatsApp = async () => {
    const url = Platform.select({
      android: 'whatsapp://send?text=Hello',
      ios: 'whatsapp://', // Adjust if using WhatsApp Business on iOS
    });
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {

        console.log("WhatsApp (or its variant) is not installed or cannot be opened.");
        Alert.alert(
          'Error',
          'WhatsApp (or its variant) is not installed or cannot be opened.'
        );
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };
  
  

  const renderStatusItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.statusContainer, { width: screenWidth / 2 - 20 }]}
      onPress={() => saveStatus(item)}
    >
      <Image
        source={{ uri: `file://${item.path}` }}
        style={styles.statusImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WhatsApp Downloader</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={openWhatsApp}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKimsLvTitGNjXhbytt4yhhqnejgi_x4l9g&s',
          }}
          style={styles.iconImage}
        />
        <Text style={styles.iconText}>Open WhatsApp</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Saved WhatsApp Statuses:</Text>
      <FlatList
        data={statuses}
        keyExtractor={(item) => item.path}
        renderItem={renderStatusItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginVertical: 15,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  iconImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  iconText: {
    fontSize: 18,
    marginTop: 10,
    color: '#25D366',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginVertical: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  statusContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eaeaea',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  statusImage: {
    width: '100%',
    height: 150,
  },
});

export default Imagescreen;

/////////////////////////////////////////////////////////

// import React, { useEffect, useState, useCallback } from 'react';
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
//   Linking,
//   ActivityIndicator
// } from 'react-native';
// import RNFS from 'react-native-fs';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Video from 'react-native-video';

// const WHATSAPP_STATUS_DIR = 'Android/media/com.whatsapp/WhatsApp/Media/.Statuses';

// const StatusDownloaderScreen = () => {

//   const navigation = useNavigation();

//   const [statuses, setStatuses] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('Images'); // Images, Videos, or Saved
//   const [savedStatuses, setSavedStatuses] = useState([]); // Store saved statuses
//   const [fullScreenImage, setFullScreenImage] = useState(null); // Image for full-screen view
//   const screenWidth = Dimensions.get('window').width;
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [whatsappReturn, setWhatsappReturn] = useState(false);
  



//   // useEffect(() => {
//   //   fetchStatuses();
//   // }, []);

//   useEffect(() => {
//     if (!isModalVisible) {
//       fetchStatuses();  // Call fetchStatuses whenever the modal is closed
//     }
//   }, [isModalVisible]);  // Dependency array makes sure it runs when modal state changes


//   useFocusEffect(
//     useCallback(() => {
//       fetchStatuses();
//     }, [])
//   );

//   // const fetchStatuses = async () => {
//   //   const statusPath = `${RNFS.ExternalStorageDirectoryPath}/${WHATSAPP_STATUS_DIR}`;
//   //   try {
//   //     const files = await RNFS.readDir(statusPath);
//   //     const statusFiles = files.filter(
//   //       (file) =>
//   //         file.isFile() &&
//   //         (file.name.endsWith('.jpg') || file.name.endsWith('.mp4'))
//   //     );
//   //     setStatuses(statusFiles);
//   //   } catch (error) {
//   //     console.error('Error accessing statuses:', error);
//   //     Alert.alert('Error', 'Could not access WhatsApp statuses.');
//   //   }
//   // };

//   const fetchStatuses = async () => {
//     const statusPath = `${RNFS.ExternalStorageDirectoryPath}/${WHATSAPP_STATUS_DIR}`;
//     console.log('Status path:', statusPath); // Log the status path
//     try {
//       setLoading(true);
//       setStatuses([]);
//       console.log('Fetching files from the status directory...');
//       const files = await RNFS.readDir(statusPath);
//       console.log('Files fetched:', files); // Log the raw files fetched
//       const statusFiles = files.filter(
//         (file) =>
//           file.isFile() &&
//           (file.name.endsWith('.jpg') || file.name.endsWith('.mp4'))
//       );
//       console.log('Filtered status files:', statusFiles); // Log the filtered files
//       setStatuses(statusFiles);
//     } catch (error) {
//       console.error('Error accessing statuses:', error);
//       Alert.alert('Error', 'Could not access WhatsApp statuses.');
//     } finally {
//       setLoading(false);
//     }
//   };

//    const saveStatus = async (file) => {
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

//    const openWhatsApp = () => {

//     const whatsappURL = 'whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}';
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

//   // const openWhatsApp = () => {

//   //   const whatsappURL = 'whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}';
//   //   Linking.canOpenURL(whatsappURL)
//   //     .then((supported) => {
//   //       if (supported) {
//   //         setWhatsappReturn(false); // Reset before opening WhatsApp
//   //         Linking.openURL(whatsappURL)
//   //         .then(() => {
//   //           setWhatsappReturn(true); // Trigger state on return
//   //         })
//   //         .catch((err) => console.error('Error opening WhatsApp:', err));


//   //       } else {
//   //         Alert.alert('Error', 'WhatsApp is not installed on this device.');
//   //       }
//   //     })
//   //     .catch((err) => console.error('Error opening WhatsApp:', err));
//   // };



//   const renderStatusItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.statusContainer, { width: screenWidth / 2 - 20 }]}
//       onPress={() => setFullScreenImage(item.path)} // Open image in full screen
//     >
//       <Image
//         source={{ uri: `file://${item.path}` }}
//         style={styles.statusImage}
//         resizeMode="cover"
//       />

//       {item.name.endsWith('.mp4') && (
//         <Ionicons
//           name="play-circle"
//           size={36}
//           color="white"
//           style={styles.videoIcon}
//         />
//       )}
//       <TouchableOpacity
//         style={styles.downloadButton}
//         onPress={() => saveStatus(item)}
//       >
//         <Text style={styles.downloadText}>Save</Text>
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   // const renderStatusItem = ({ item }) => (
//   //   <TouchableOpacity
//   //     style={[styles.statusContainer, { width: screenWidth / 2 - 20 }]}
//   //     onPress={() => {
//   //       if (item.name.endsWith('.mp4')) {
//   //         setFullScreenImage(item.path); // Open video in full-screen mode
//   //       } else {
//   //         setFullScreenImage(item.path); // Open image in full-screen mode
//   //       }
//   //     }}
//   //   >
//   //     {item.name.endsWith('.mp4') ? (
//   //       <View>
//   //         <Video
//   //           source={{ uri: `file://${item.path}` }}
//   //           style={styles.videoThumbnail}
//   //           paused={true} // Keeps the video paused initially
//   //           resizeMode="cover"
//   //         />
//   //         <Ionicons
//   //           name="play-circle"
//   //           size={36}
//   //           color="black"
//   //           style={styles.videoIcon}
//   //         />
//   //       </View>
//   //     ) : (
//   //       <Image
//   //         source={{ uri: `file://${item.path}` }}
//   //         style={styles.statusImage}
//   //         resizeMode="cover"
//   //       />
//   //     )}
//   //     <TouchableOpacity
//   //       style={styles.downloadButton}
//   //       onPress={() => saveStatus(item)}
//   //     >
//   //       <Text style={styles.downloadText}>Save</Text>
//   //     </TouchableOpacity>
//   //   </TouchableOpacity>
//   // );

 

  


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
//       <View style={styles.iconContainer}>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <TouchableOpacity onPress={() => setIsModalVisible(true)}>
//             <EvilIcons name="navicon" size={35} color={'green'} />
//           </TouchableOpacity>

//           <Modal
//             visible={isModalVisible}
//             transparent={true}
//             // onRequestClose={() => setIsModalVisible(false)} // Close modal on back button
//             onRequestClose={() => {
//               setIsModalVisible(false); // Close modal

//             }}

//           >
//             <View style={styles.fullScreenModal}>
//               {/* Close Button */}
//               <TouchableOpacity
//                 style={styles.closeModalButton}
//                 onPress={() => setIsModalVisible(false)}
//               >
//                 <Ionicons name="close" size={30} color="black" />
//               </TouchableOpacity>

//               <View>

//                 {/* <LoginLogo/> */}

//                 <TouchableOpacity style={{ alignSelf: "center", top: "80%" }} onPress={openWhatsApp}>

//                   {/* <Image
//                   source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKimsLvTitGNjXhbytt4yhhqnejgi_x4l9g&s' }}
//                   style={{ width: 100, height: 100, borderRadius: 20, alignSelf: "center", top: "60%" }}
//                   resizeMode="cover"
//                 /> */}
//                   <FontAwesome name="whatsapp" size={50} color={'green'} />

//                 </TouchableOpacity>


//                 <Text style={{ fontSize: 20, fontWeight: "600", color: "green", alignSelf: "center", top: "90%" }}>Open Whatsapp</Text>

//               </View>

//               <View style={{ left: "10%", marginVertical: 20, top: "15%" }}>
//                 <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
//                   <Icon name="language" size={27} color="#3498db" style={{ marginRight: 10 }} />
//                   <TouchableOpacity>
//                     <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Language</Text>
//                   </TouchableOpacity>

//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
//                   <Icon name="help-outline" size={27} color="orange" style={{ marginRight: 10 }} />
//                   <TouchableOpacity>
//                     <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>How to Use</Text>
//                   </TouchableOpacity>

//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
//                   <Icon name="share" size={27} color="#f1c40f" style={{ marginRight: 10 }} />
//                   <TouchableOpacity>
//                     <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Share</Text>
//                   </TouchableOpacity>

//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
//                   <Icon name="star-rate" size={27} color="#e74c3c" style={{ marginRight: 10 }} />
//                   <TouchableOpacity>
//                     <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Rate Us</Text>
//                   </TouchableOpacity>

//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
//                   <Icon name="privacy-tip" size={27} color="#34495e" style={{ marginRight: 10 }} />
//                   <TouchableOpacity>
//                     <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Privacy Policy</Text>
//                   </TouchableOpacity>

//                 </View>
//               </View>

//             </View>
//           </Modal>

//           <Text style={styles.title}>Status Saver</Text>
//         </View>
//         {/* <TouchableOpacity onPress={openWhatsApp} style={{ right: "3%" }} >
//           <FontAwesome name="whatsapp" size={30} color={'green'} />
//         </TouchableOpacity> */}
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[
//             styles.tab,
//             selectedTab === 'Images' && styles.activeTab,
//           ]}
//           onPress={() => setSelectedTab('Images')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === 'Images' && styles.activeTabText,
//             ]}
//           >
//             Images
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.tab,
//             selectedTab === 'Videos' && styles.activeTab,
//           ]}
//           onPress={() => setSelectedTab('Videos')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === 'Videos' && styles.activeTabText,
//             ]}
//           >
//             Videos
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.tab,
//             selectedTab === 'Saved' && styles.activeTab,
//           ]}
//           onPress={() => setSelectedTab('Saved')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === 'Saved' && styles.activeTabText,
//             ]}
//           >
//             Saved
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Status List */}
//       {/* <FlatList
//         data={dataToDisplay}
//         renderItem={renderStatusItem}
//         // keyExtractor={(item) => item.name}
//         keyExtractor={(item) => item.path} // Unique identifier
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//       /> */}

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

//       {/* Full Screen Modal */}

//       {fullScreenImage && (
//   <Modal
//     visible={!!fullScreenImage}
//     transparent={true}
//     onRequestClose={() => setFullScreenImage(null)}
//   >
//     <View style={styles.fullScreenModal}>
//       <TouchableOpacity
//         style={styles.closeModalButton}
//         onPress={() => setFullScreenImage(null)}
//       >
//         <Ionicons name="close" size={30} color="black" />
//       </TouchableOpacity>
//       {fullScreenImage.endsWith('.mp4') ? (
//         <Video
//           source={{ uri: `file://${fullScreenImage}` }}
//           style={styles.fullScreenVideo}
//           controls={true} // Enables playback controls
//           resizeMode="contain"
//         />
//       ) : (
//         <Image
//           source={{ uri: `file://${fullScreenImage}` }}
//           style={styles.fullScreenImage}
//           resizeMode="contain"
//         />
//       )}
//     </View>
//   </Modal>
// )}

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     backgroundColor: '#fff',
//     top: "1%"
//   },
//   iconContainer: {
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '900',
//     color: 'green',
//     marginLeft: "30%"
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   tab: { padding: 10 },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderColor: 'green'
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#888'
//   },
//   activeTabText: {
//     color: 'green'
//   },
//   statusContainer: {
//     margin: 10,
//     borderRadius: 8,
//     overflow: 'hidden'
//   },
//   statusImage: {
//     width: '100%',
//     height: 150
//   },
//   downloadButton: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 5,
//     borderRadius: 5,
//   },
//   downloadText: {
//     color: '#fff',
//     fontSize: 12
//   },
//   listContainer: {
//     paddingBottom: 20
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     position: 'absolute',
//     top: 20,
//     left: 10,
//   },
//   // fullScreenImage: {
//   //   width: '100%',
//   //   height: '80%'
//   // },
//   closeButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     padding: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     borderRadius: 20,
//   },

//   closeButtonText: {
//     fontSize: 16, color: 'black', fontWeight: 'bold'
//   },
//   backButton: {
//     position: 'absolute',
//     top: 12,
//     left: 20,
//     zIndex: 1, // Ensures it is on top of other elements
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     borderRadius: 20,
//     padding: 10,
//   },


//   mediaTypeText: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: 'white',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 10,
//   },
//   videoIcon: {
//     position: 'absolute',
//     top: '40%',
//     left: '40%',
//   },
//   // fullScreenModal: {
//   //   flex: 1,
//   //   backgroundColor: '#fff', // Semi-transparent background
//   //   width: "100%",
//   //   height: "100%"

//   // },
//   // closeModalButton: {
//   //   position: 'absolute',
//   //   top: 40,
//   //   right: 20,
//   //   zIndex: 1,
//   // },

//   videoThumbnail: {
//     width: '100%',
//     height: 150,
//     borderRadius: 10,
//   },
//   fullScreenVideo: {
//     width: '100%',
//     height: '80%',
//   },
//   fullScreenImage: {
//     width: '100%',
//     height: '100%',
//   },
//   videoIcon: {
//     position: 'absolute',
//     top: '40%',
//     left: '40%',
//     zIndex: 1,
//   },
//   fullScreenModal: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   closeModalButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     zIndex: 2,
//   },
// });

// export default StatusDownloaderScreen;


/////////////////////////////////////////////////////////

// import React, { useEffect, useState, useCallback } from 'react';
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
//   Linking,
//   ActivityIndicator
// } from 'react-native';
// import RNFS from 'react-native-fs';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Video from 'react-native-video';

// const WHATSAPP_STATUS_DIR = 'Android/media/com.whatsapp/WhatsApp/Media/.Statuses';

// const StatusDownloaderScreen = () => {

//   const navigation = useNavigation();

//   const [statuses, setStatuses] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('Images'); // Images, Videos, or Saved
//   const [savedStatuses, setSavedStatuses] = useState([]); // Store saved statuses
//   const [fullScreenImage, setFullScreenImage] = useState(null); // Image for full-screen view
//   const screenWidth = Dimensions.get('window').width;
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [whatsappReturn, setWhatsappReturn] = useState(false);
  



//   // useEffect(() => {
//   //   fetchStatuses();
//   // }, []);

//   useEffect(() => {
//     if (!isModalVisible) {
//       fetchStatuses();  // Call fetchStatuses whenever the modal is closed
//     }
//   }, [isModalVisible]);  // Dependency array makes sure it runs when modal state changes


//   useFocusEffect(
//     useCallback(() => {
//       fetchStatuses();
//     }, [])
//   );

//   // const fetchStatuses = async () => {
//   //   const statusPath = `${RNFS.ExternalStorageDirectoryPath}/${WHATSAPP_STATUS_DIR}`;
//   //   try {
//   //     const files = await RNFS.readDir(statusPath);
//   //     const statusFiles = files.filter(
//   //       (file) =>
//   //         file.isFile() &&
//   //         (file.name.endsWith('.jpg') || file.name.endsWith('.mp4'))
//   //     );
//   //     setStatuses(statusFiles);
//   //   } catch (error) {
//   //     console.error('Error accessing statuses:', error);
//   //     Alert.alert('Error', 'Could not access WhatsApp statuses.');
//   //   }
//   // };

//   const fetchStatuses = async () => {
//     const statusPath = `${RNFS.ExternalStorageDirectoryPath}/${WHATSAPP_STATUS_DIR}`;
//     console.log('Status path:', statusPath); // Log the status path
//     try {
//       setLoading(true);
//       setStatuses([]);
//       console.log('Fetching files from the status directory...');
//       const files = await RNFS.readDir(statusPath);
//       console.log('Files fetched:', files); // Log the raw files fetched
//       const statusFiles = files.filter(
//         (file) =>
//           file.isFile() &&
//           (file.name.endsWith('.jpg') || file.name.endsWith('.mp4'))
//       );
//       console.log('Filtered status files:', statusFiles); // Log the filtered files
//       setStatuses(statusFiles);
//     } catch (error) {
//       console.error('Error accessing statuses:', error);
//       Alert.alert('Error', 'Could not access WhatsApp statuses.');
//     } finally {
//       setLoading(false);
//     }
//   };

//    const saveStatus = async (file) => {
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

//    const openWhatsApp = () => {

//     const whatsappURL = 'whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}';
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

//   // const openWhatsApp = () => {

//   //   const whatsappURL = 'whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}';
//   //   Linking.canOpenURL(whatsappURL)
//   //     .then((supported) => {
//   //       if (supported) {
//   //         setWhatsappReturn(false); // Reset before opening WhatsApp
//   //         Linking.openURL(whatsappURL)
//   //         .then(() => {
//   //           setWhatsappReturn(true); // Trigger state on return
//   //         })
//   //         .catch((err) => console.error('Error opening WhatsApp:', err));


//   //       } else {
//   //         Alert.alert('Error', 'WhatsApp is not installed on this device.');
//   //       }
//   //     })
//   //     .catch((err) => console.error('Error opening WhatsApp:', err));
//   // };



//   const renderStatusItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.statusContainer, { width: screenWidth / 2 - 20 }]}
//       onPress={() => setFullScreenImage(item.path)} // Open image in full screen
//     >
//       <Image
//         source={{ uri: `file://${item.path}` }}
//         style={styles.statusImage}
//         resizeMode="cover"
//       />

//       {item.name.endsWith('.mp4') && (
//         <Ionicons
//           name="play-circle"
//           size={36}
//           color="white"
//           style={styles.videoIcon}
//         />
//       )}
//       <TouchableOpacity
//         style={styles.downloadButton}
//         onPress={() => saveStatus(item)}
//       >
//         <Text style={styles.downloadText}>Save</Text>
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   // const renderStatusItem = ({ item }) => (
//   //   <TouchableOpacity
//   //     style={[styles.statusContainer, { width: screenWidth / 2 - 20 }]}
//   //     onPress={() => {
//   //       if (item.name.endsWith('.mp4')) {
//   //         setFullScreenImage(item.path); // Open video in full-screen mode
//   //       } else {
//   //         setFullScreenImage(item.path); // Open image in full-screen mode
//   //       }
//   //     }}
//   //   >
//   //     {item.name.endsWith('.mp4') ? (
//   //       <View>
//   //         <Video
//   //           source={{ uri: `file://${item.path}` }}
//   //           style={styles.videoThumbnail}
//   //           paused={true} // Keeps the video paused initially
//   //           resizeMode="cover"
//   //         />
//   //         <Ionicons
//   //           name="play-circle"
//   //           size={36}
//   //           color="white"
//   //           style={styles.videoIcon}
//   //         />
//   //       </View>
//   //     ) : (
//   //       <Image
//   //         source={{ uri: `file://${item.path}` }}
//   //         style={styles.statusImage}
//   //         resizeMode="cover"
//   //       />
//   //     )}
//   //     <TouchableOpacity
//   //       style={styles.downloadButton}
//   //       onPress={() => saveStatus(item)}
//   //     >
//   //       <Text style={styles.downloadText}>Save</Text>
//   //     </TouchableOpacity>
//   //   </TouchableOpacity>
//   // );

  


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
//       <View style={styles.iconContainer}>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <TouchableOpacity onPress={() => setIsModalVisible(true)}>
//             <EvilIcons name="navicon" size={35} color={'green'} />
//           </TouchableOpacity>

//           <Modal
//             visible={isModalVisible}
//             transparent={true}
//             // onRequestClose={() => setIsModalVisible(false)} // Close modal on back button
//             onRequestClose={() => {
//               setIsModalVisible(false); // Close modal

//             }}

//           >
//             <View style={styles.fullScreenModal}>
//               {/* Close Button */}
//               <TouchableOpacity
//                 style={styles.closeModalButton}
//                 onPress={() => setIsModalVisible(false)}
//               >
//                 <Ionicons name="close" size={30} color="black" />
//               </TouchableOpacity>

//               <View>

//                 {/* <LoginLogo/> */}

//                 <TouchableOpacity style={{ alignSelf: "center", top: "80%" }} onPress={openWhatsApp}>

//                   {/* <Image
//                   source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKimsLvTitGNjXhbytt4yhhqnejgi_x4l9g&s' }}
//                   style={{ width: 100, height: 100, borderRadius: 20, alignSelf: "center", top: "60%" }}
//                   resizeMode="cover"
//                 /> */}
//                   <FontAwesome name="whatsapp" size={50} color={'green'} />

//                 </TouchableOpacity>


//                 <Text style={{ fontSize: 20, fontWeight: "600", color: "green", alignSelf: "center", top: "90%" }}>Open Whatsapp</Text>

//               </View>

//               <View style={{ left: "10%", marginVertical: 20, top: "15%" }}>
//                 <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
//                   <Icon name="language" size={27} color="#3498db" style={{ marginRight: 10 }} />
//                   <TouchableOpacity>
//                     <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Language</Text>
//                   </TouchableOpacity>

//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
//                   <Icon name="help-outline" size={27} color="orange" style={{ marginRight: 10 }} />
//                   <TouchableOpacity>
//                     <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>How to Use</Text>
//                   </TouchableOpacity>

//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
//                   <Icon name="share" size={27} color="#f1c40f" style={{ marginRight: 10 }} />
//                   <TouchableOpacity>
//                     <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Share</Text>
//                   </TouchableOpacity>

//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
//                   <Icon name="star-rate" size={27} color="#e74c3c" style={{ marginRight: 10 }} />
//                   <TouchableOpacity>
//                     <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Rate Us</Text>
//                   </TouchableOpacity>

//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
//                   <Icon name="privacy-tip" size={27} color="#34495e" style={{ marginRight: 10 }} />
//                   <TouchableOpacity>
//                     <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>Privacy Policy</Text>
//                   </TouchableOpacity>

//                 </View>
//               </View>

//             </View>
//           </Modal>

//           <Text style={styles.title}>Status Saver</Text>
//         </View>
//         {/* <TouchableOpacity onPress={openWhatsApp} style={{ right: "3%" }} >
//           <FontAwesome name="whatsapp" size={30} color={'green'} />
//         </TouchableOpacity> */}
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[
//             styles.tab,
//             selectedTab === 'Images' && styles.activeTab,
//           ]}
//           onPress={() => setSelectedTab('Images')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === 'Images' && styles.activeTabText,
//             ]}
//           >
//             Images
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.tab,
//             selectedTab === 'Videos' && styles.activeTab,
//           ]}
//           onPress={() => setSelectedTab('Videos')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === 'Videos' && styles.activeTabText,
//             ]}
//           >
//             Videos
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.tab,
//             selectedTab === 'Saved' && styles.activeTab,
//           ]}
//           onPress={() => setSelectedTab('Saved')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === 'Saved' && styles.activeTabText,
//             ]}
//           >
//             Saved
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Status List */}
//       {/* <FlatList
//         data={dataToDisplay}
//         renderItem={renderStatusItem}
//         // keyExtractor={(item) => item.name}
//         keyExtractor={(item) => item.path} // Unique identifier
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//       /> */}

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

//       {/* Full Screen Modal */}


//       <Modal
//         visible={!!fullScreenImage}
//         transparent={true}
//         onRequestClose={() => setFullScreenImage(null)}
//       >
//         <View style={styles.modalContainer}>

//           <View style={{ flexDirection: "row", width: "90%", justifyContent: "space-between", }}>

//             <View style = {{flexDirection:"row"}}>
//               <TouchableOpacity

//                 onPress={() => setFullScreenImage(null)}
//               >
//                 <Ionicons name="arrow-back" size={25} color="white" />
//               </TouchableOpacity>

//               {/* Text Indicating Type */}
//               <Text style={{ fontSize: 17, fontWeight:"bold", color: "#fff",left:"50%"}}>
//                 {fullScreenImage?.endsWith('.jpg') ? 'Image' : 'Video'}
//               </Text>

//             </View>
            
//             <TouchableOpacity

//               onPress={() => setFullScreenImage(null)}
//             >
//               <Ionicons name="close" size={25} color="white" />
//             </TouchableOpacity>

//           </View>
          
//           <Image
//             source={{ uri: `file://${fullScreenImage}` }}
//             style={styles.fullScreenImage}
//             resizeMode="contain"
//           />

//           {/* <View  style = {{flexDirection:"row"}}>

//             <View style = {{flexDirection:"row"}}>
//               <Entypo name= "share" size = {18} color= {"#fff"}/>
//               <TouchableOpacity>
//                  <Text style = {{fontSize:14,fontWeight:"600",color:"#fff",left:5}}>Share</Text>
//               </TouchableOpacity>
             
//             </View>

//             <View style = {{flexDirection:"row",left:"4%"}}>
//               <FontAwesome name= "whatsapp" size = {18} color= {"#fff"}/>
//               <TouchableOpacity>
//                 <Text style = {{fontSize:14,fontWeight:"600",color:"#fff",left:5}}>Repost</Text>
//               </TouchableOpacity>
             
//             </View>

//             <View style = {{flexDirection:"row",left:"10%"}}>
//               <MaterialIcons name= "save-alt" size = {18} color= {"#fff"}/>
//               <TouchableOpacity>
//               <Text style = {{fontSize:14,fontWeight:"600",color:"#fff",left:5}}>Save</Text>
//               </TouchableOpacity>
             
//             </View>
//           </View> */}

//           <View style={{ flexDirection: "row" }}>
//             <MaterialIcons name="save-alt" size={18} color={"#fff"} />
//             <TouchableOpacity>
//               <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff", left: 5 }}>Save</Text>
//             </TouchableOpacity>
//           </View>
//          </View>
//       </Modal>

      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     backgroundColor: '#fff',
//     top: "1%"
//   },
//   iconContainer: {
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '900',
//     color: 'green',
//     marginLeft: "30%"
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   tab: { padding: 10 },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderColor: 'green'
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#888'
//   },
//   activeTabText: {
//     color: 'green'
//   },
//   statusContainer: {
//     margin: 10,
//     borderRadius: 8,
//     overflow: 'hidden'
//   },
//   statusImage: {
//     width: '100%',
//     height: 150
//   },
//   downloadButton: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 5,
//     borderRadius: 5,
//   },
//   downloadText: {
//     color: '#fff',
//     fontSize: 12
//   },
//   listContainer: {
//     paddingBottom: 20
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     position: 'absolute',
//     top: 20,
//     left: 10,
//   },
//   fullScreenImage: {
//     width: '100%',
//     height: '80%'
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     padding: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     borderRadius: 20,
//   },

//   closeButtonText: {
//     fontSize: 16, color: 'black', fontWeight: 'bold'
//   },
//   backButton: {
//     position: 'absolute',
//     top: 12,
//     left: 20,
//     zIndex: 1, // Ensures it is on top of other elements
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     borderRadius: 20,
//     padding: 10,
//   },


//   mediaTypeText: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: 'white',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 10,
//   },
//   videoIcon: {
//     position: 'absolute',
//     top: '40%',
//     left: '40%',
//   },
//   fullScreenModal: {
//     flex: 1,
//     backgroundColor: '#fff', // Semi-transparent background
//     width: "100%",
//     height: "100%"

//   },
//   closeModalButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     zIndex: 1,
//   },
// });

// export default StatusDownloaderScreen;
