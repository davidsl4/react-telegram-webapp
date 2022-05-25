import { createContext, useContext } from "react";
import { Telegram } from "./Telegram/Telegram";

export type TelegramWebAppModel = {
  app: Telegram.Unsafe.WebApp;
  startParam: string | null;
  isReady: boolean;
};

export const TelegramWebAppContext = createContext<TelegramWebAppModel>({} as any);

export function useStartParam() {
  const { startParam } = useContext(TelegramWebAppContext);
  return startParam;
}

export function useTelegramWebApp() {
  const { app } = useContext(TelegramWebAppContext);
  return app;
}

export function useIsTelegramWebAppReady() {
  const { isReady } = useContext(TelegramWebAppContext);
  return isReady;
}
