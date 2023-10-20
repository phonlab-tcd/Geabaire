import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import FlatGrid from "../../components/FlatGrid";

export default function TestPage() {
  const arr = [];

  // Number of rows
  const numColumns = 11;

  // Calculate the height of each item
  const itemHeight = Dimensions.get('window').height / 7;

  for (let i = 0; i < numColumns * 7; i++) {
    arr.push(i);
  }

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={arr}
        scrollEnabled={false}
        numColumns={numColumns}
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={[styles.item, { height: itemHeight }]}>
            <Text>{item}</Text>
          </View>
        )}
      /> */}
      <FlatGrid
        numRows={7}
        numColumns={11}
        data={arr}
        renderItem={({ item }) => (<Text>{item}</Text>)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua"
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});
