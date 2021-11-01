const Star = ({ marked, starId }) => {
    return (
        <span data-star-id={starId} style={{color: "#ff9933"}}>
            {marked ? '\u2605' : '\u2606'}
        </span>
    );
};

const StarRating = ({ value }) => {
    return (
        <div>
            {Array.from({ length: 5 }, (v, i) => (
                <Star
                    starId={i + 1}
                    key={`star_${i + 1}`}
                    marked={value >= i + 1}
                />
            ))}
        </div>
    );
};

export default StarRating