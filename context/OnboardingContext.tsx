import { createContext, useContext, useState, ReactNode } from "react";

type Gender = "male" | "female" | "other" | null;


type OnboardingData = {
  gender: Gender;
    goal: string | null;
  age: number | null;
  weight: number | null;
    height: number | null;
    neck: number | null;
    waist: number | null;
    hip?: number | null;
};

type AuthData = {
  email: string;
  password: string;
};

type OnboardingContextType = {
  data: OnboardingData;
  setGender: (gender: Gender) => void;
    setGoal: (goal: string) => void;
    setAge: (age: number) => void;
  setWeight: (weight: number) => void;
  setHeight: (height: number) => void;
    setNeck: (neck: number) => void;
    setWaist: (waist: number) => void;
    setHip: (hip: number) => void;

  auth: AuthData;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;

  signUpWithEmail: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;

  progress: number;
  setProgress: (value: number) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<OnboardingData>({
    gender: null,
      goal: null,
    age: null,
    weight: null,
      height: null,
      neck: null,
      waist: null,
        hip: null,
  });

  const [auth, setAuth] = useState<AuthData>({
    email: "",
    password: "",
  });

  const [progress, setProgress] = useState(0.2);

  // ---- setters ----
  const setGender = (gender: Gender) =>
    setData((prev) => ({ ...prev, gender }));

  const setGoal = (goal: string) =>
      setData((prev) => ({ ...prev, goal }));
    
    const setAge = (age: number) =>
    setData((prev) => ({ ...prev, age }));

  const setWeight = (weight: number) =>
    setData((prev) => ({ ...prev, weight }));

  const setHeight = (height: number) =>
    setData((prev) => ({ ...prev, height }));

  const setEmail = (email: string) =>
    setAuth((prev) => ({ ...prev, email }));

  const setPassword = (password: string) =>
    setAuth((prev) => ({ ...prev, password }));

    const setNeck = (neck: number) =>
    setData((prev) => ({ ...prev, neck }));

    const setWaist = (waist: number) =>
    setData((prev) => ({ ...prev, waist }));

    const setHip = (hip: number) =>
    setData((prev) => ({ ...prev, hip }));
  // ---- auth actions ----
  const signUpWithEmail = async () => {
    console.log("Signing up with:", {
      ...data,
      ...auth,
    });

    // 🔥 call backend / Firebase / Supabase here
  };

  const signInWithGoogle = async () => {
    console.log("Signing in with Google");
    // 🔥 Google auth logic here
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        setGender,
        setGoal,
        setWeight,
              setHeight,
              setAge,
        setNeck,
        setWaist,
        setHip,
        auth,
        setEmail,
        setPassword,
        signUpWithEmail,
        signInWithGoogle,
        progress,
        setProgress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  }
  return context;
};

