import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Todo {
  id: string;
  value: string;
}

export default function App() {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (): void => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), value: text }]);
    setText('');
  };

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.safeArea}>
      {/* translucent={true} is often better for modern Android styling */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      {/* THIS IS THE SPACER: It physically pushes everything down */}

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
        style={styles.container}
      >
        <Text style={styles.title}>My Todo List</Text>

        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Add a task"
            placeholderTextColor="#888"
            style={styles.input}
          />
          <TouchableOpacity onPress={addTodo} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item.value}</Text>
              <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // This logic gives Android extra space based on the status bar height
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 60 : 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#F9F9F9',
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: { color: '#FFF', fontWeight: '700' },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  todoText: { fontSize: 16, color: '#333', flex: 1 },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: { color: '#FFF', fontWeight: '600', fontSize: 12 },
});