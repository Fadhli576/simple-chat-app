const Input = (props) => {
    return (
            <input value={props.value} onChange={props.ganti} className={props.className} type={props.type} placeholder={props.placeholder} name={props.name} />
    );
}

export default Input