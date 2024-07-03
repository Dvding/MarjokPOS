// Importing required modules
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack"
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootSiblingParent } from 'react-native-root-siblings';


// Import screen components
import HomeScreen from './pages/Home';
import ProductScreen from './pages/Product';
import TransationScreen from './pages/Transaction';
import ProfileScreen from './pages/Profile';
import LoginScreen from './pages/auth/Login';
import RegisterScreen from './pages/auth/Register';
import ProductsScreen from './pages/admin/products/Products';
import AddProductsScreen from './pages/admin/products/AddProducts';
import DetailProductsScreen from './pages/admin/products/DetailProducts';
import EditProductsScreen from './pages/admin/products/EditProducts';
import LaporanScreen from './pages/admin/laporan/Laporan';
import LaporanResultScreen from './pages/admin/laporan/LaporanResult';
import CartScreen from './pages/Cart';
import CartDetailScreen from './pages/CartDetail';
import InvoiceScreen from './pages/Invoice';

// Import DB
import DB from './helpers/db';

// Main App function
export default function App() {

  // Indicate if user is login
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // DB.dropUsersTable()
    // DB.logout()
    DB.createDatabase()
    checkUserLogin()
  }, []);

  // Create a Tab Navigator
  const Tab = createMaterialBottomTabNavigator();

  // Create a Stack Navigator
  const Stack = createStackNavigator();

  // Login Screen Navigator
  function LoginScreenComponents() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login Screen" 
          component={(props) => <LoginScreen {...props} setIsLogin={setIsLogin} />} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Register Screen" 
          component={(props) => <RegisterScreen {...props} setIsLogin={setIsLogin} />} 
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    );
  }

  // Check user login
  function checkUserLogin() {
    DB.getUsers().then((result) => {
      if(result.length > 0) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  // Navigator for Home subpages
  const HomeNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: true, title: "Transaksi"}} />
      <Stack.Screen name="Product Detail" component={ProductScreen} options={{title: "Barang"}} />
    </Stack.Navigator>
  );

  // Navigator for Profile subpages
  const ProfileNavigator = () => (
    <Stack.Navigator>

      <Stack.Screen 
          name="Profile Screen" 
          component={(props) => <ProfileScreen {...props} setIsLogin={setIsLogin} />}
          options={{
            headerShown: false
          }}
        />

      <Stack.Screen name="Atur Barang" component={ProductsScreen} options={{title: "Barang"}}/>
      <Stack.Screen name="Tambah Barang" component={AddProductsScreen} />
      <Stack.Screen name="Detail Barang" component={DetailProductsScreen } options={{title: "Detail"}} />
      <Stack.Screen name="Edit Barang" component={EditProductsScreen} />
      <Stack.Screen name="Laporan Penjualan" component={LaporanScreen} options={{title: "Laporan"}} />
      <Stack.Screen name="Hasil Laporan" component={LaporanResultScreen} options={{title: "Hasil Laporan"}} />
      <Stack.Screen name="Invoice Screen" component={InvoiceScreen} options={{title: "Transaksi"}} />
    </Stack.Navigator>
  );

  // Navigator for Transaction subpages
  const TransactionNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name="Transaction Screen" component={TransationScreen} options={{title: "Riwayat Transaksi"}} />
      <Stack.Screen name="Invoice Screen" component={InvoiceScreen} options={{title: "Transaksi"}} />
    </Stack.Navigator>
  );

  // Navigator for Cart subpages
  const CartNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name="Cart Screen" component={CartScreen} options={{title: "Keranjang"}} />
      <Stack.Screen name="Cart Detail" component={CartDetailScreen} options={{title: "Detail Keranjang"}} />
      <Stack.Screen name="Invoice Screen" component={InvoiceScreen} options={{title: "Transaksi"}} />
    </Stack.Navigator>
  );

  // If user is login
  // show full bottom navigation
  if (isLogin) {
    return (
      <RootSiblingParent>
        <NavigationContainer>
          <Tab.Navigator>
      
            {/* Home Screen Navigator */}
              <Tab.Screen name="Home" component={HomeNavigator} 
                options={{
                  title: "Transaksi",
                  tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="calculator-variant" color={color} size={26}/>
                  ),
              }}/>

            {/* Home Screen Navigator */}

            {/* Cart Screen Navigator */}
            <Tab.Screen name="Keranjang" component={CartNavigator} 
                options={{
                  tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="cart" color={color} size={26}/>
                  ),
              }}/>
            {/* Cart Screen Navigator */}
            
            {/* Transation Screen Navigator */}
              <Tab.Screen name="Riwayat" component={TransactionNavigator} 
                options={{
                  tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="briefcase-clock-outline" color={color} size={26}/>
                  ),
              }}/>
            {/* Transation Screen Navigator */}
            
            {/* Profile Screen Navigator */}
              <Tab.Screen name="Profile" component={ProfileNavigator} 
                options={{
                  tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                  ),
              }}/>
            {/* Profile Screen Navigator */}
            
          </Tab.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    ); 

  // If user is not login
  // show login screen only
  } else {
    return (
      <RootSiblingParent>
        <NavigationContainer>
          <LoginScreenComponents />
        </NavigationContainer>
      </RootSiblingParent>
    );
  }
}