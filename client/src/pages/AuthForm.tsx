//@ts-nocheck

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../utils/utils';

const AuthForm = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  const {auth}=useAuth()

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
    if(auth?.role=='admin'){
      navigate('/booksall')
    }
    else{
      navigate('/books');
    }
    }
  }, [navigate,auth]);

  const handleSubmit = async (event, type) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData.entries());

    try {
      const VITE_APIURL = type === 'login' ? `${import.meta.env.VITE_APIURL}/api/v1/auth/login` : `${import.meta.env.VITE_APIURL}/api/v1/auth/signup`;
      const response = await axios.post(VITE_APIURL, formFields);
      const { access_token } = response.data;
      if(type==='signup'){
        showToast(`Signup successful! Please Login`,'success')
      }
      else{
        showToast('Login successful','success')
      }
      if(type=='login'){
        login(access_token);
      }
    } catch (error) {
      console.error(error)
      showToast('Authentication failed. Please try again.','error')
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" grid place-items-center h-[100vh]">
      <Card className="w-72 sm:w-full max-w-md mx-auto">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, 'login')}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        type="email"
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Login'}
                </Button>
              </form>
            </CardContent>
          </TabsContent>

          <TabsContent value="signup">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Enter your details to create a new account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, 'signup')}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (123) 456-7890"
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="signup-email"
                        name="email"
                        placeholder="your@email.com"
                        type="email"
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForm;
