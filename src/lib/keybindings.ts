import { useEffect } from 'react';

function useEscapeKey(callback: any) {
    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'Enter') {
                callback();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [callback]);
}

export default useEscapeKey;
