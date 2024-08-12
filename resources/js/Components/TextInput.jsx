import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'bg-white/70 border-customLightblue focus:border-customPurple focus:ring-customPurple rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
