import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { white, black } from '../utils/colors'

 export default function Button({children,onPress,textColor, disabled = false, style = {}}){
   const additionalStyle = textColor ? { color : textColor } : {};
   
   return (
    <View style={{opacity : disabled? 0.5: 1}}>
      <TouchableOpacity onPress={onPress}  disabled={disabled} style={[styles.btn,style]}>
        <Text style={[styles.btnText, additionalStyle ]}>{children}</Text>
      </TouchableOpacity>
    </View>)
 }

const styles = StyleSheet.create({
  btn:{
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 5,
    width: 150 ,
    height: 45,
    padding: 10,
    backgroundColor:black
  },
  btnText:{
    textAlign: 'center',
    fontSize: 18,
    color:white 
  }
})