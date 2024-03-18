function LongText({
    text
}: { text: string }) {
    return (
        <div className="w-48 font-bold text-gray-900 line-clamp-3">
            {text}
        </div>
    );
}

export default LongText;