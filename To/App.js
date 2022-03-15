import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,FlatList, TouchableOpacity, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


function App () {
  const [mytext,setMyText] = useState('')
  const [todos,setTodos] = useState([
    {
      id:0,
      task:'First Todo',
      completed:false
    },
    {
      id:1,
      task:'Second Todo',
      completed:true
    }
  ])
  const taskCompleted = (todoId) => {
    const newTodos = todos.map((item) => {
      if (item.id == todoId) {
        if (item.completed==false) {
          return{...item,completed:true}
        } else {
          return {...item,completed:false}
        }
        
      }
      return item;
    })
    setTodos(newTodos)
  }
  const removeTask = (todoId) => {
    const newTodos = todos.filter(item => item.id != todoId)
    setTodos(newTodos)
  }
  const removeAllTasks = () => {
    Alert.alert('Remove Tasks' , 'Do you want to remove all tasks?', [
      {
        text:'ok',
        onPress:()=> setTodos([])
      },
      {
        text:'cancel'
      }
    ])
  }
  const ListItem = ({todo}) => {
    return(
      <View style={styles.listview} >
        <Text style={[styles.mytasktext,{textDecorationLine:todo.completed==true?'line-through':'none'}]} >{todo.task}</Text>
        <View style={{flexDirection:'row'}} >
          
          <TouchableOpacity onPress={()=>taskCompleted(todo?.id)} >
          <FontAwesome5 name='check' size={20} color='green'  />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>removeTask(todo?.id)} >
          <FontAwesome5 name='trash' size={20} color='red' style={{marginLeft:15}} />
          </TouchableOpacity>
        </View>
      </View>
    ) 
  }
   const addTodo = () => {
   if (mytext=='') {
     Alert.alert('The value cannot be empty!!!')
   } else {
    const newTodo = {
      id:Math.random(),
      task:mytext,
      completed:false
    }
    setTodos([...todos,newTodo])
    setMyText('')
   }
    
   }
  return(
    <View style={styles.container} >
      <View style={styles.myheader} >
      <Text style={styles.myheadertext} >TODO APP</Text>
      <TouchableOpacity onPress={removeAllTasks} >
      <FontAwesome5 name='trash' size={40} color='red' />
      </TouchableOpacity>
      </View>
      <FlatList
      data={todos}
      renderItem={({item,index}) => <ListItem todo={item} index={index}/> }
      />
      <View style={styles.myfooter} >
        <TextInput
        style={styles.mytextinput}
        value={mytext}
        placeholder='Add Todo...'
        onChangeText={(text) => setMyText(text)}
        />
      <TouchableOpacity styles={styles.myaddbutton} onPress={addTodo}>
      <FontAwesome5 name='plus' size={40} color='#080AB7' style={{flex:1,marginLeft:20}} />
      </TouchableOpacity>
      
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFC300'
  },
  myheader:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:30,
    marginBottom:40,
    alignItems:'center'
  },
  myheadertext:{
    color:'white',
    fontSize:40,
    fontWeight:'bold'
  },
  myfooter:{
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    flex:1,
    padding:10,
    margin:10,
  },
  mytextinput:{
    backgroundColor:'#C2C2C8',
    borderRadius:10,
    flex:4,
    marginHorizontal:5,
    paddingHorizontal:10
  },
  myaddbutton:{
    backgroundColor:'white',
    borderRadius:'50'
  },
  listview:{
    backgroundColor:'white',
    borderRadius:10,
    margin:10,
    height:50,
    alignItems:'center',
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between'

  },
  mytasktext:{
    color:'black',
    fontSize:20
  }
})
export default App;