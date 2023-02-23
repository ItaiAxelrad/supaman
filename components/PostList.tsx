import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Alert from '@/components/Alert';
import Todo from '@/components/Post';

export default function Todos({ user }) {
  const supabase = useSupabaseClient();
  const [todos, setTodos] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [errorText, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true });
    if (error) console.log('error', error);
    else setTodos(todos);
  };

  const addTodo = async (taskText) => {
    let task = taskText.trim();
    if (task.length) {
      let { data: todo, error } = await supabase
        .from('todos')
        .insert({ task, user_id: user.id })
        .single();
      if (error) setError(error.message);
      else setTodos([...todos, todo]);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await supabase.from('todos').delete().eq('id', id);
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='w-full'>
      <h1 className='mb-6 text-slate-800 text-3xl'>Todo List</h1>
      <div className='flex gap-2 my-2'>
        <input
          className='form-input rounded w-full cursor-pointer p-2'
          type='text'
          placeholder='make coffee'
          value={newTaskText}
          onChange={(e) => {
            setError('');
            setNewTaskText(e.target.value);
          }}
        />
        <button className='btn' onClick={() => addTodo(newTaskText)}>
          Add
        </button>
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className='bg-white ring-1 ring-gray-900/5 shadow-lg overflow-hidden rounded-md'>
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
