function Letter({ text }){
    text = text.toUpperCase();
    return (
        <div className="letter">
            { text }
        </div>
    )
}

export default Letter;