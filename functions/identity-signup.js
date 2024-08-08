// This is serverless function that lets you communication with the funa database

exports.handler = async function (event) {
  const user = JSON.parse(event.body);
  console.log(JSON.stringify(user, null, 2));

  // sub:free -- subscription type is free
  return {
    statusCode: 200,
    body: JSON.stringify({ app_metadata: { roles: ['sub:free'] } }),
  };
};
