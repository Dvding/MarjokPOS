// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdiMPfu0eGSwIapec8KmVf35WAfDOAfz0",
    authDomain: "marjokpos.firebaseapp.com",
    projectId: "marjokpos",
    storageBucket: "marjokpos.appspot.com",
    messagingSenderId: "259458441507",
    appId: "1:259458441507:web:9146b971f0c40b3ee52c96",
    measurementId: "G-70NVJWT654"
  };

// Define admin users email
const ADMIN_USERS_EMAIL = [
  'dingqolbuadi123@gmail.com',
  'admin@mail.com',
]


// Define API URL
const INVOICE_API = 'https://marjokpos-api.bdv.or.id/'
const INVOICE_API_KEY = 'MBleSOnIcasHoWflEthorIciEtONtaNEYBuNIchlIftypTiBne'

// Define store name
const STORE_NAME = 'MarjokPOS'

// Sqlite Database Name
const DB_NAME = 'marjokopos.db'

export {
  ADMIN_USERS_EMAIL, 
  firebaseConfig, 
  INVOICE_API, 
  INVOICE_API_KEY,
  STORE_NAME,
  DB_NAME
}