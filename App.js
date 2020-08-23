import React from 'react';
import TodoApp from './components/TodoApp';
import {View, Text, SafeAreaView} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: 'teal',
          height: '7%',
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 30,
          }}>
          Todo App
        </Text>
      </SafeAreaView>
      <TodoApp />
    </>
  );
};

export default App;
