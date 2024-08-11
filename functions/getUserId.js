import supabase from './supabase';

async function getUserId(matchValue, userId) {
  console.log(matchValue, userId);
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
  console.log(data);
  return data;
}

export default getUserId;
