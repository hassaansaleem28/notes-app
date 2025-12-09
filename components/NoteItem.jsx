import { StyleSheet, Text, View } from "react-native";

function NoteItem({ note }) {
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noteItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
  },
  noteText: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default NoteItem;
