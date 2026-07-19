import { createContext, useContext, useEffect, useState } from "react";

const AppStateContext = createContext(null);

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function AppStateProvider({ children }) {
  const [budget, setBudget] = useLocalStorage("budget", {
    income: "",
    housing: "",
    food: "",
    utilities: "",
    transport: "",
    other: "",
    savingsGoal: "",
    savingsMonths: "",
  });

  const [points, setPoints] = useLocalStorage("points", 0);
  const [completedLessons, setCompletedLessons] = useLocalStorage("completedLessons", []);
  const [streak, setStreak] = useLocalStorage("streak", 0);
  const [lastActive, setLastActive] = useLocalStorage("lastActive", null);

  const markLessonComplete = (id, earnedPoints) => {
    if (completedLessons.includes(id)) return;
    setCompletedLessons([...completedLessons, id]);
    setPoints(points + earnedPoints);

    const today = new Date().toDateString();
    if (lastActive !== today) {
      setStreak(streak + 1);
      setLastActive(today);
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        budget,
        setBudget,
        points,
        completedLessons,
        markLessonComplete,
        streak,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}
