import React from 'react';
import {Image, View, Text, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodoList = ({todos, deleteItem, alterItem}) => {
  const TodoItem = ({todo}) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'teal',
          padding: 10,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View
          style={{
            width: '50%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 25,
              textDecorationLine: todo.done ? 'line-through' : 'none',
            }}>
            {todo.name}
          </Text>
        </View>
        {todo.loading ? (
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../assests/loader.gif')}
          />
        ) : (
          <View
            style={{
              width: '50%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            {todo.done ? (
              <Icon.Button
                name="close"
                backgroundColor="white"
                color="red"
                onPress={alterItem.bind(null, todo.id)}></Icon.Button>
            ) : (
              <Icon.Button
                name="check"
                backgroundColor="white"
                color="green"
                onPress={alterItem.bind(null, todo.id)}></Icon.Button>
            )}
            <Icon.Button
              name="trash"
              backgroundColor="white"
              color="red"
              onPress={deleteItem.bind(null, todo.id)}></Icon.Button>
          </View>
        )}
      </View>
    );
  };

  const renderItem = ({item}) => <TodoItem todo={item} />;

  return (
    <FlatList
      style={{
        paddingLeft: 10,
        paddingRight: 10,
      }}
      data={todos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default TodoList;
