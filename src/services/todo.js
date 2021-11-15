import { supabase } from '../config/supabase';

export const addTodo = async (title, description, user, setError) => {
  try {
    if(!user) {
      throw new Error('cred false');
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          title,
          description,
          user: user.id,
        },
      ]);

    if(error) throw new Error(error.message);
    if(!error) console.log('todo added');
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    setError(error);
    return {
      success: false,
    };
  }
};

export const updateTodo = async (title, description, todoId, user, setError) => {
  try {
    if(!user) {
      throw new Error('cred false');
    }

    const { data, error } = await supabase
      .from('todos')
      .update([
        {
          title,
          description,
        },
      ]).eq('id', todoId);

    if(error) throw new Error(error.message);
    if(!error) console.log('todo updated');
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    setError(error);
    return {
      success: false,
    };
  }
};

export const changeTodoStatus = async (status, todoId, user, setError) => {
  try {
    if(!user) {
      throw new Error('cred false');
    }

    const { data, error } = await supabase
      .from('todos')
      .update([
        {
          is_finished: status,
        },
      ]).eq('id', todoId);

    if(error) throw new Error(error.message);
    if(!error) console.log('todo updated');
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    setError(error);
    return {
      success: false,
    };
  }
};

export const getTodos = async (uid) => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select()
      .match({ user: uid })
      .order('created_at', { ascending: false });

    if(error) throw new Error(error.message);
    if(!error) {
      console.log('todo added');
      return {
        success: true,
        data,
      };
    }
  } catch (error) {
    return {
      sucess: false,
    };
  }
};

export const getSingleTodo = async (todoId) => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select()
      .match({ id: todoId });

    if(error) throw new Error(error.message);
    if(!error) {
      console.log('single todo fetched');
      return {
        success: true,
        data: data[0],
      };
    }
  } catch (error) {
    return {
      sucess: false,
    };
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .match({ id: todoId });

    if(error) throw new Error(error.message);
    if(!error) {
      console.log('single todo deleted');
      return {
        success: true,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};
