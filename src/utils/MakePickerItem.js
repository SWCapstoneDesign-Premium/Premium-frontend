import React from 'react';
import {Picker} from '@react-native-picker/picker';
export function makeCategoryItem(projectlist) {
  const temp = projectlist.map((pr) => ({
    label: pr.title,
    value: pr.id,
  }));
  return temp;
}

export function makePickerItemlist(start, end) {
  var item = [];
  for (var i = start; i < end + 1; i++) {
    item.push({
      label: `${i}`,
      value: `${i}`,
    });
  }
  return item;
}

export function makelist(end) {
  var array = [...Array(end).keys()];
  return array.map((value) => {
    return (
      <Picker.Item
        key={value + 1}
        label={(value + 1).toString()}
        value={(value + 1).toString()}
      />
    );
  });
}
