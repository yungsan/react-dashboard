interface Props {
    text: string,
    width: string,
    rounded: string,
    onClick: () => void
}

function MyButton(props: Props) {
    return (
        <button
            className={`w-${props.width} h-fit bg-primary-500 py-4 px-4 text-lg rounded-${props.rounded} text-white`}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

export default MyButton;