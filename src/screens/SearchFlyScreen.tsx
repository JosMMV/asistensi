import React, { useContext, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Dialog from 'react-native-dialog'

import { AuthContext } from '../context/AuthContext'

const SearchFly = () => {
  const { logout } = useContext(AuthContext)

  const [showDialog, setShowDialog] = useState(false)
  const [dialogInput, setDialogInput] = useState('')

  return (
    <View style={styles.screen}>
      <Dialog.Container visible={showDialog}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Input
          onChangeText={setDialogInput}
          value={dialogInput}
        />
        <Dialog.Button label='Cancel' onPress={() => setShowDialog(false)} />
        <Dialog.Button label='Delete' onPress={() => console.log('borrar')} />
      </Dialog.Container>

      <Button title='Logout' onPress={() => setShowDialog(true)} />
    </View>
  )
}

export default SearchFly

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
