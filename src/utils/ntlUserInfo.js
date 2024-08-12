// user comes from netlify identity
async function initUserInfo(user) {
  if (!user) {
    user = 'NO USER LOGGED IN';
    document.querySelector('pre').innerText = user;
    return;
  }

  // Token to create login to stripe portal
  const token = await window.netlifyIdentity.currentUser().jwt(true);

  const parts = token.split('.');
  const currentUser = JSON.parse(atob(parts[1]));
  const { roles } = currentUser.app_metadata;

  // DISPLAY ROLES
  document.querySelector('pre').innerText = roles;
  // DISPLAY USERNAME
  document.querySelector('#user-name').innerText = user.user_metadata.full_name;
  // BUTTON TO GO TO STRIPE PORTAL
  document.querySelector('#manage-sub').addEventListener('click', async () => {
    await goToStripePortal(token);
  });
}

async function goToStripePortal(token) {
  try {
    // Makes fetch request to get the netlifyID and stripeID from supabase
    const res = await fetch('/.netlify/functions/create-manage-link', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    const link = await res.json();

    window.location.href = link;
  } catch (error) {
    console.log('ERROR', error);
  }
}

window.netlifyIdentity.on('init', initUserInfo);
