import * as React from 'react'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import { WebView, WebViewNavigation } from 'react-native-webview'

import { getAmountValueInKobo, getChannels } from './helper'
import { initialize } from './service/api'
import { IInitializeResponseBody, PayStackProps } from './types'

const CLOSE_URL = 'https://standard.paystack.co/close'

const Paystack: React.ForwardRefRenderFunction<
  React.ReactNode,
  PayStackProps
> = (
  {
    paystackKey,
    billingEmail,
    // phone,
    // lastName,
    // firstName,
    amount = '0.00',
    // currency = 'NGN',
    // channels = ['card'],
    // refNumber,
    // billingName,
    // handleWebViewMessage,
    // onCancel,
    autoStart = false,
    // onSuccess,
    activityIndicatorColor = 'green',
  },
  ref
) => {
  const [isLoading, setisLoading] = React.useState<boolean>(false)
  const [showModal, setshowModal] = React.useState<boolean>(false)
  const [uri, uriSet] = React.useState<IInitializeResponseBody>({
    authorization_url: '',
    reference: '',
    access_code: '',
  })
  const webView = useRef(null)

  const onLoad = React.useCallback(() => {
    if (autoStart && paystackKey) {
      const data = {
        email: billingEmail,
        amount: getAmountValueInKobo(amount)?.toString(),
      }
      initialize(paystackKey, data)
      setshowModal(true)
    }
  }, [amount, autoStart, billingEmail, paystackKey])

  React.useEffect(() => {
    onLoad()
  }, [onLoad])

  React.useImperativeHandle(ref, () => ({
    async startTransaction() {
      setshowModal(true)
      const data = {
        email: billingEmail,
        amount: getAmountValueInKobo(amount)?.toString(),
      }
      const response = await initialize(paystackKey, data)
      if (response.data && response.data?.authorization_url) {
        const { access_code, reference, authorization_url } = response.data
        uriSet(() => ({ access_code, reference, authorization_url }))
        setisLoading(false)
      } else {
        setshowModal(false)
      }
    },
    endTransaction() {
      setshowModal(false)
    },
  }))

  const onNavigationStateChange = (state: WebViewNavigation) => {
    console.log('After transaction State', state)
    const { url } = state
    // if (url === CLOSE_URL) {
    //   setshowModal(false)
    // }
  }

  return (
    <Modal
      style={styles.container}
      visible={showModal}
      animationType='slide'
      transparent={false}
    >
      <View style={[styles.modal]}>
        {uri.authorization_url ? (
          <WebView
            style={styles.web_view}
            // source={{ html: Paystackcontent }}
            source={{ uri: uri.authorization_url }}
            javaScriptEnabled={true}
            onMessage={(e) => {
              console.log('Event Data', e)
              // messageReceived(e.nativeEvent?.data)
            }}
            // onLoadStart={() => setisLoading(true)}
            // onLoadEnd={() => setisLoading(false)}
            onNavigationStateChange={onNavigationStateChange}
            ref={webView}
            cacheEnabled={false}
            cacheMode={'LOAD_NO_CACHE'}
          />
        ) : (
          <View>
            <ActivityIndicator size='large' color={activityIndicatorColor} />
          </View>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  modal: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  web_view: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default forwardRef(Paystack)
