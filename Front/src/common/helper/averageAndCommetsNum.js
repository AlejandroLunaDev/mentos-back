
export default function averageAndCommetsNum(reviews) {
    // Calcular el promedio de puntajes
    let average = 0;
    let countComents = 0;

    if (reviews && reviews.length > 0) {
        const validReviews = reviews.filter(review => review.overallRating);
        const totalRating = reviews.reduce(
            (sum, review) => sum + (review.overallRating || 0),
            0
        );

        countComents = validReviews.length;
        const averagePuntaje = totalRating / countComents;
        average = averagePuntaje.toFixed(1)

        return ({average, countComents})
    }
    
    return ({ average, countComents})
    
}
