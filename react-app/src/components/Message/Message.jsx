const Message = ({role, message, time}) => {
    return (
        <div className={`p-4 border mx-4 my-2 gap-4 bg-white flex drop-shadow-sm rounded-md ${role === 'send' ? 'self-end' : 'self-start'}`}>
            <p>{message}</p>
            <span className="font-thin">{time}</span>
        </div>
    )
}

export default Message