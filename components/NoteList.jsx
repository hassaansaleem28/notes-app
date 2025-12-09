import { FlatList, View } from "react-native";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onEdit }) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={notes}
        keyExtractor={item => item.$id}
        renderItem={({ item }) => (
          <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />
        )}
      />
    </View>
  );
}

export default NoteList;
