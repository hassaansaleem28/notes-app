import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddNoteModal({
  modalVisible,
  setModalVisible,
  newNote,
  setNewNote,
  addNote,
}) {
  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      animationType="slide"
      transparent
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add a New Note</Text>
          <TextInput
            style={styles.input}
            value={newNote}
            onChangeText={setNewNote}
            placeholder="Enter note..."
            placeholderTextColor="#aaa"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => addNote()}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
