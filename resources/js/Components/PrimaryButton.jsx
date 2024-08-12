export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-customPurple border border-transparent rounded-md font-semibold text-xs text-customLightblue hover:text-customPurple/70 uppercase 
                tracking-widest hover:bg-customLightblue/70 focus:bg-custom active:bg-gray-900 focus:outline-none 
                focus:ring-offset-2 transition ease-in-out duration-500 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

