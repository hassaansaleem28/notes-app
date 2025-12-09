import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import notesService from "@/services/notesService";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NotesScreen() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function loadNotes() {
      setLoading(true);
      const response = await notesService.fetchNotes();
      if (response.error) {
        setError(response.error);
        Alert.alert("Error", response.error);
      } else {
        setNotes(response.data);
        setError(null);
      }
      setLoading(false);
    }
    loadNotes();
  }, []);

  async function addNote() {
    if (newNote.trim() === "") return;

    const response = await notesService.createNote(newNote);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes([...notes, response.data]);
    }
    setNewNote("");
    setModalVisible(false);
  }
  return (
    <View style={styles.container}>
      <NoteList notes={notes} />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    left: 20,
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
