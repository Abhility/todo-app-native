import React from 'react';
import TodoApp from './components/TodoApp';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>Todo App</Text>
      </SafeAreaView>
      <TodoApp />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'teal',
    height: '7%',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
});
export default App;
