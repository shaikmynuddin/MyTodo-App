import { View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

export interface Todo {
  title: string;
  description: string;
  dateTime: string;
  deadline: string;
  priority: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, 'todos');

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: Todo[] = [];
        snapshot.docs.forEach(doc => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });

    return () => subscriber();
  }, []);

  const addTodo = async () => {
    if (!title || !description || !dateTime || !deadline || !priority) return;
    await addDoc(collection(FIRESTORE_DB, 'todos'), { title, description, dateTime, deadline, priority, done: false });
    setTitle('');
    setDescription('');
    setDateTime('');
    setDeadline('');
    setPriority('');
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && <Ionicons name='checkmark-circle' size={32} color="green" />}
          {!item.done && <Entypo name="circle" size={32} color="black" />}
          <View style={styles.todoDetails}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoDescription}>{item.description}</Text>
            <Text>Due: {item.deadline} | Priority: {item.priority}</Text>
          </View>
        </TouchableOpacity>
        <Ionicons name='trash-bin-outline' size={24} color="red" onPress={deleteItem} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <TextInput
          style={styles.input}
          placeholder="Date & Time"
          onChangeText={(text) => setDateTime(text)}
          value={dateTime}
        />
        <TextInput
          style={styles.input}
          placeholder="Deadline"
          onChangeText={(text) => setDeadline(text)}
          value={deadline}
        />
        <TextInput
          style={styles.input}
          placeholder="Priority (Low, Medium, High)"
          onChangeText={(text) => setPriority(text)}
          value={priority}
        />
        <Button onPress={addTodo} title="Add Task" disabled={!title || !description || !deadline || !priority} />
      </View>
      {todos.length > 0 && (
        <FlatList data={todos} renderItem={(item) => renderTodo(item)} keyExtractor={(todo: Todo) => todo.id} />
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  form: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 4,
  },
  todoDetails: {
    flex: 1,
    paddingHorizontal: 10,
  },
  todoTitle: {
    fontWeight: 'bold',
  },
  todoDescription: {
    color: '#555',
  },
  todo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
