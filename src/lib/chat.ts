import React from "react";

export function useChatId({ pathname }: any) {
    return React.useMemo(
        () => pathname.split('/')?.[2], [pathname]);
}