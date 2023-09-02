import React, { useEffect, useRef } from 'react'
import ReactnativePaystack2Module, {
  Paystack,
  paystackProps,
} from 'react-native-webview-paystack-2'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const App = () => {
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>()

  console.log('Finished Loading')
  return (
    <View style={styles.container}>
      <Paystack
        paystackKey={'sk_test_7d03537ff99eb51dc3d76f2da5acaa0ff36dad1b'}
        onCancel={() => {}}
        onSuccess={() => {}}
        billingEmail={'segope44@gmail.com'}
        billingName={'Opeyemi'}
        amount={'700.90'}
        ref={paystackWebViewRef}
        // autoStart={false}
      />

      <TouchableOpacity
        onPress={() => {
          console.log(paystackWebViewRef)
          paystackWebViewRef.current?.startTransaction()
        }}
      >
        <Text style={styles.button}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
})

export default App
