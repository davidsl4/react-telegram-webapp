import { ComponentType, ReactNode, useEffect, useRef, useState } from "react";
import { TelegramWebAppContext, TelegramWebAppModel } from "./TelegramWebAppContext";
import React from 'react';

type TelegramWebAppProps = {
    children: ReactNode;
    validateHash(hash: string): boolean | Promise<boolean>;
}

export function TelegramWebApp(props: TelegramWebAppProps) {
    const { children, validateHash } = props;

    const [isReady, setIsReady] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const tgWebAppStartParamRef = useRef(new URLSearchParams(window.location.search).get("tgWebAppStartParam"));

    const model: TelegramWebAppModel = {
        get app() {
            return (window as any).Telegram?.WebApp
        },
        startParam: tgWebAppStartParamRef.current!,
        isReady
    }

    const onReady = () => {
        setIsReady(true);

        const hashValidation = validateHash(model.app.initData);
        if (hashValidation instanceof Promise) {
            hashValidation.then(setIsValid);
        } else {
            setIsValid(hashValidation);
        }
    }

    if (isReady && !isValid) throw new Error("Invalid hash");

    return (
        <TelegramWebAppScript onLoad={onReady}>
            <TelegramWebAppContext.Provider value={model}>
                {children}
            </TelegramWebAppContext.Provider>
        </TelegramWebAppScript>
    );
}

export function withTelegramWebApp(Component: ComponentType<any>, contextProps: Omit<TelegramWebAppProps, 'children'>) {
    return function WithTelegramWebApp(props: any) {
        return (
            <TelegramWebApp {...contextProps}>
                <Component {...props} />
            </TelegramWebApp>
        );
    }
}

function TelegramWebAppScript({ children, onLoad }: { children: ReactNode, onLoad: () => void }) {
    // inject on load, remove on unload (using effect). but only once per page
    useEffect(() => {
        const tgWebAppScript = document.createElement("script");
        tgWebAppScript.src = "https://telegram.org/js/telegram-web-app.js";
        tgWebAppScript.onload = onLoad;
        document.head.appendChild(tgWebAppScript);
        (window as any).__TELEGRAM_WEB_APP_SCRIPT_INJECTED__ = true;

        return () => {
            document.head.removeChild(tgWebAppScript);
            (window as any).__TELEGRAM_WEB_APP_SCRIPT_INJECTED__ = false;
        };
    }, []);

    return <>{children}</>;
}