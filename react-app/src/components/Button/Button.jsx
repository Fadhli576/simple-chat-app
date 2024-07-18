const Button = (props) => {
    return (
            <button onClick={props.onClick} className={`p-2 ease-linear transition ${props.className} `} >{props.logo}</button>
    );
}

export default Button