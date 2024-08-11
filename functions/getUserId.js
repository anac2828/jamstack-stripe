// import supabase from './supabase';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rvfqcjgttkcybnhkemjv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getUserId(matchValue, userId) {
  // Get stripeID
  const { data, error } = await supabase
    .from('User')
    .select('netlifyID, stripeID')
    .eq(matchValue, userId)
    .single();
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export default getUserId;
