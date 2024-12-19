import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';

export default function PickImage(){
  const [images, setImages] = useState<string[]|null>(null);

  async function buttonClick(){
    let picker = ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 3
    }).catch(e => {
      console.log(e);
    })

    picker.then(results => {
      if(results.selected != null){
        const imageResults = results.selected.map(result => result.uri)
        setImages(imageResults);
      }else{
        setImages([results.uri]);
        console.log(images);  
      }
    })
  }

  return(
    <View>
      <Button  title="Click to upload an image" onPress={buttonClick}/>
      {images && images.map(img => <Image style={styles.image} source={{uri:img}}/>)}
    </View>
  );
  
}
{/* <Image style={styles.image} source={{ uri: images[0]}}/> */}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200
  }
})