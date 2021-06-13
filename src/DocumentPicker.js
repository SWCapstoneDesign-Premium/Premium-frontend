import DocumentPicker from 'react-native-document-picker';

const PickMultipleFile = async () => {
  try {
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    });
    for (const res of results) {
      console.log(res.uri, res.type, res.name, res.size);
    }
    return results;
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      console.log('User cancel file pick');
    } else {
      console.log(error);
    }
  }
};

export {PickMultipleFile};
