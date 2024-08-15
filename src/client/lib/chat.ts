import { isArray } from "lodash";
import { NextRouter } from "next/router";
import { useMemo } from "react";

export function useChatId(router: NextRouter) {
    return useMemo(
        () => {
            if (router.isReady) {
                let chatId = router.query.chatId;
                if (isArray(chatId)) ([chatId] = chatId);
                return chatId;
            }
            return;
        }, [router]);
}