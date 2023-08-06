// Import the functions you need from the SDKs you need
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/hooks/useUser";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useTodosStore } from "@/hooks/useTodoStore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

export const registerUser = async (email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const loginUser = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const setUser = useUserStore.getState().setUser;
export const logOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const emailVerification = async () => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      toast({
        title: "Email verification sent",
        description: "Check your email for a verification link",
      });
      return;
    }
    return;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
const user = useUserStore.getState().user;
const todoRef = "user/" + user?.uid + "/todos";
export const createTodoFirebase = async (title: string, status: string) => {
  try {
    const result = await addDoc(collection(database, todoRef), {
      title: title,
      status: status,
    });
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const updateTodoFirebase = async (status: string, docId: string) => {
  try {
    await updateDoc(doc(database, todoRef, docId), {
      status: status,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

onSnapshot(collection(database, todoRef), (doc) => {
  const result = doc.docs.map((todo) => {
    return {
      title: todo.get("title"),
      id: todo.id,
      status: todo.get("status"),
    };
  });

  useTodosStore.getState().setTodos(result);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    setUser(user);
  } else {
    setUser(null);
  }
});
