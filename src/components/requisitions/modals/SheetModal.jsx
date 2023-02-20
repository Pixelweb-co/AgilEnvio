import React, { useState } from 'react';
import { View, Button, Modal, Text } from 'react-native';

const SheetModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Mostrar modal" onPress={toggleModal} />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            {!props.children ? (
            <Text>Contenido de la modal</Text>
            ):(
                <>
                {props.children}
                </>
            )}
            <Button title="Cerrar" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SheetModal;
