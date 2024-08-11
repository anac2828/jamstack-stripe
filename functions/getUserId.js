import supabase from './supabase';

async function getUserId(matchValue, userId) {
  console.log('USER ID', userId);
  // Get stripeID
  const { data, error } = await supabase
    .from('User')
    .select('netlifyID, stripeID')
    .eq(matchValue, userId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export default getUserId;
