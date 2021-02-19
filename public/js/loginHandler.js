const form = document.querySelector('.login-form');

const login = (e) => {
  e.preventDefault();
  const email = form['email'].value;
  const password = form['password'].value;

  if (!email || !password) {
    return; //@todo - alert msg
  }

  const postform = {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch('/auth/login', postform)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

form.addEventListener('submit', login);
