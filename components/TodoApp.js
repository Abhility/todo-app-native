import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Keyboard,
  ToastAndroid,
  Image,
  Text,
  Alert,
} from 'react-native';
import TodoList from './TodoList';
import httpRequest from '../helpers/httpClient';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://abhility-fakedb.glitch.me/todos';

  const getData = async (showLoader) => {
    setLoading(showLoader);
    try {
      let data = await httpRequest(API_URL, 'GET', null);
      data = data.reverse().map((item) => {
        return {
          ...item,
          loading: false,
        };
      });

      setLoading(false);
      Array.isArray(data) ? setTodos(data) : setTodos([]);
    } catch (err) {
      setLoading(false);
      ToastAndroid.show('Some error occured!', 3000);
    }
  };

  useEffect(() => {
    getData(true);
  }, []);

  const handleChange = (value) => {
    setItem(value);
  };

  const addTodo = async () => {
    if (item === '') {
      Alert.alert('Please provide an input');
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    const todo = {
      name: item,
      date: Date.now(),
      done: false,
    };
    setItem('');
    try {
      await httpRequest(API_URL, 'POST', todo);
      await getData(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      ToastAndroid.show('Some error occured!', 3000);
    }
  };

  const deleteItem = async (id) => {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.loading = true;
      }
      return todo;
    });
    setTodos(newTodos);
    try {
      await httpRequest(`${API_URL}/${id}`, 'DELETE', null);
      await getData(false);
      ToastAndroid.show('Item deleted!', 1000);
    } catch (err) {
      setLoading(false);
      ToastAndroid.show('Some error occured!', 3000);
    }
  };

  const alterItem = async (id) => {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.loading = true;
      }
      return todo;
    });

    let todo = todos.find((todo) => todo.id === id);
    todo = {...todo, done: !todo.done};
    setTodos(newTodos);
    try {
      await httpRequest(`${API_URL}/${id}`, 'PUT', todo);
      await getData(false);
      todo.done
        ? ToastAndroid.show('Marked as completed!', 1000)
        : ToastAndroid.show('Marked as Inprogress!', 1000);
    } catch (err) {
      setLoading(false);
      ToastAndroid.show('Some error occured!', 3000);
    }
  };

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          width: '90%',
          marginTop: 30,
          marginBottom: 30,
          marginLeft: '5%',
          marginRight: '5%',
        }}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'teal',
            borderBottomWidth: 2,
            fontSize: 20,
            width: '100%',
            height: 50,
            marginBottom: 30,
            marginLeft: 20,
            marginRight: 20,
          }}
          onChangeText={handleChange}
          value={item}
          placeholder="Add your todo here..."
          blurOnSubmit={true}
        />
        <View
          style={{
            width: '100%',
          }}>
          <Icon.Button name="plus" backgroundColor="teal" onPress={addTodo}>
            Add
          </Icon.Button>
        </View>
      </View>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={require('../assests/spin.gif')}
          />
        </View>
      ) : (
        <TodoList todos={todos} deleteItem={deleteItem} alterItem={alterItem} />
      )}
    </>
  );
}
