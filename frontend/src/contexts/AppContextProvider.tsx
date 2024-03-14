import { useState, createContext, useMemo, useContext } from "react";

type AppContextType = {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showModalLogin: boolean;
  setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  showModalRegister: boolean;
  setShowModalRegister: React.Dispatch<React.SetStateAction<boolean>>;
  showMobMenu: boolean;
  setShowMobMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showModalForgot: boolean;
  setShowModalForgot: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext({} as AppContextType);

type PropsType = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: PropsType) => {
  const [showMobMenu, setShowMobMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalForgot, setShowModalForgot] = useState(false);

  const value = useMemo(() => {
    return {
      isCartOpen,
      setIsCartOpen,
      showModalLogin,
      setShowModalLogin,
      showModalRegister,
      setShowModalRegister,
      showMobMenu,
      setShowMobMenu,
      showModalForgot,
      setShowModalForgot,
    };
  }, [
    isCartOpen,
    setIsCartOpen,
    showModalLogin,
    setShowModalLogin,
    showModalRegister,
    setShowModalRegister,
    showMobMenu,
    setShowMobMenu,
    showModalForgot,
    setShowModalForgot,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
