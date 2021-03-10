export const defaultHeader = ({ options = {} }) => {
  const config = { ...options };
  if (localStorage.token) {
    const token = localStorage.getItem('token');
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  console.log(config);
  return config;
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyDDpXBnLVIw2JucVkHKhmuSCuooZSF28cg',
//   authDomain: 'my-momentum.firebaseapp.com',
//   projectId: 'my-momentum',
//   storageBucket: 'my-momentum.appspot.com',
//   messagingSenderId: '1000550740891',
//   appId: '1:1000550740891:web:b9f1d9a0fe35b0313c673e',
//   measurementId: 'G-MDXK308QRQ',
// };

// firebase.initializeApp(firebaseConfig);
// firebase.auth().onAuthStateChanged(async (user) => {
//   if (user) {
//     const token = await user.getIdTokenResult();
//     console.log(token);
//   }
// });
