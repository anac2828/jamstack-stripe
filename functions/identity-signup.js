// This is serverless function that lets you communication with the funa database

exports.handler = async function (event) {
  const user = JSON.parse(event.body);
  console.log(JSON.stringify(user, null, 2));

  const netlifyID = user.id;
  const stripeID = 1;

  // TODO create a customer record in supabase
  const response = await fetch('https://nlovbzcjlodktqpwmpdu.supabase.co', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
    },
    body: JSON.stringify({ netlifyID, stripeID }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(JSON.stringify(err, null, 2)));

  console.log(response);

  // sub:free -- subscription type is free
  return {
    statusCode: 200,
    body: JSON.stringify({ app_metadata: { roles: ['sub:free'] } }),
  };
};
