import AddNoteModal from "@/components/AddNoteModal";
import notesService from "@/services/notesService";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NoteList from "../../components/NoteList";

export default function NotesScreen() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    loadNotes();
  }, []);

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

  async function addNote() {
    if (newNote.trim() === "") return;

    const response = await notesService.createNote(newNote);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes([...notes, response.data]);
      await loadNotes();
    }
    setNewNote("");
    setModalVisible(false);
  }

  // async function deleteNote(noteId) {
  //   Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
  //     {
  //       text: "Cancel",
  //       style: "cancel",
  //     },
  //     {
  //       text: "Delete",
  //       style: "destructive",
  //       onPress: async () => {
  //         const response = await notesService.deleteNote(noteId);
  //         if (response.error) {
  //           Alert.alert("Error", response.error);
  //         } else {
  //           setNotes(notes.filter(note => note.$id !== noteId));
  //         }
  //       },
  //     },
  //   ]);
  // }
  async function deleteNote(noteId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    const response = await notesService.deleteNote(noteId);
    if (response.error) {
      alert("Error: " + response.error);
    } else {
      setNotes(notes.filter(note => note.$id !== noteId));
    }
  }
  async function editNote(noteId, newText) {}

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
        </>
      )}
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
});
