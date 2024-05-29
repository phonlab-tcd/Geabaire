import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useRecoilState } from "recoil";

/**
 * DropdownEntry component renders a dropdown entry with a title and dropdown menu.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the dropdown entry.
 * @param {Array<Object>} props.data - The data array for dropdown options.
 * @param {string} props.value - The currently selected value.
 * @param {function} props.setValue - Function to set the selected value.
 * @returns {JSX.Element} A dropdown entry component.
 */
export default function DropdownEntry({ title, data, value, setValue }) {
  // State to manage focus state of the dropdown
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.key}>{title}</Text>
      <Dropdown
          style={[styles.value, styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  )
}

// Styles for the DropdownEntry component
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  fill: {
    width: 50,
  },
  key: {
    fontSize: 20,
    fontWeight: "bold"
  },
  value: {
    width: 150,
    marginLeft: "auto",
    marginRight: 35,
  },
  dropdown: {
    width: 200,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});