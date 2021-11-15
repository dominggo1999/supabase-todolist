import { supabase } from '../config/supabase';

export const signUp = async (email, password, setError) => {
  console.log('stato');

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setError(error);

    return {
      success: true,
    };
  } catch (err) {
    setError(err);
    return {
      success: false,
    };
  }
};

export const signIn = async (email, password, setError) => {
  try {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    if(error) throw new Error(error.message);

    return {
      success: true,
    };
  } catch (err) {
    setError(err);
    return {
      success: false,
    };
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if(error) throw new Error(error.message);
    if(!error) console.log('logout');
  } catch (error) {
    console.log(error);
  }
};

export const simulateFetch = async () => {
  try {
    const res = await fetch('https://jsonplaceaholder.typicode.com/todos/1');
    const data = await res.json();

    return { data };
  } catch (error) {
    return { error: error.message };
  }
};
