interface UnreadButtonProps {
    title:string;
    count: number;
    scrollToBottom: () => void;
}

export const UnreadButton: React.FC<UnreadButtonProps> = (props) => {
    return (
        <>
            {props.count > 0 && (
                <button
                    className='fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-full shadow-md'
                    onClick={props.scrollToBottom}
                >
                    ({props.title}) ({props.count})
                </button>
            )}
        </>
    );
}