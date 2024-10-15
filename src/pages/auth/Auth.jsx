import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { login, signup } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { signupSchema } from "@/lib/validations";
import savingLogo from "../../../public/saving.gif";
import { saveUserData } from "@/lib/utils";

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
  });
  const [errors, setErrors] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signupSchema.parse(formData);
      setErrors({});
    } catch (err) {
      const validationErrors = {};
      err.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
    }
    setIsLoading(true);
    try {
      let res;
      if (isSignUp) {
        res = await signup(formData);
        if (res?.status === 200) {
          toast({
            title: "Success",
            description: res?.data,
          });
          setIsSignUp(false);
        }
      } else {
        res = await login(formData);
        if (res?.status === 200) {
          saveUserData(res?.data);
          toast({
            title: "Success",
            description: "login in to your account",
          });
          navigate("/");
        }
      }
      if (res?.status !== 200) {
        toast({
          title: "Error",
          description: res?.data,
          variant: "destructive",
        });
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        storeName: "",
      });
    } catch (error) {
      console.error("signup error: ", error);
      toast({
        title: "Error",
        description: "Error while saving data to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toogleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-96 h-auto flex flex-col items-start justify-start bg-slate-100 rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isSignUp ? "Sign Up" : "Sign In"} to Store!
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "This action will create a new account for you. Please provide valid information to set up your profile and access your store."
              : "This action will log you into your account. Ensure your credentials are correct to access store."}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full h-auto">
          <form onSubmit={handleSubmit} className="space-y-2 w-full h-auto">
            {isSignUp && (
              <FormField name="name">
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      name="name"
                      className="bg-white"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  {errors.name && <FormMessage>{errors.name}</FormMessage>}
                </FormItem>
              </FormField>
            )}
            <FormField name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    className="bg-white"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                {errors.email && <FormMessage>{errors.email}</FormMessage>}
              </FormItem>
            </FormField>
            <FormField name="password">
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    className="bg-white"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </FormControl>
                {errors.password && (
                  <FormMessage>{errors.password}</FormMessage>
                )}
              </FormItem>
            </FormField>
            {isSignUp && (
              <FormField name="storeName">
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your store name"
                      name="storeName"
                      className="bg-white"
                      value={formData.storeName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  {errors.storeName && (
                    <FormMessage>{errors.storeName}</FormMessage>
                  )}
                </FormItem>
              </FormField>
            )}
            <Button type="submit" className="w-full">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-row items-center justify-center w-full h-auto gap-3">
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </p>
          <div className="cursor-pointer underline" onClick={toogleForm}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </div>
        </CardFooter>
      </Card>
      <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isSignUp
                ? "Sending signup data to server"
                : "Checking login info with server"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
            <div className="w-full h-36 mt-6 flex items-center justify-center">
              <img
                src={savingLogo}
                alt="saving"
                className="w-full h-full object-contain object-center"
              />
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Auth;
