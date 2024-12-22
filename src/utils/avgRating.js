export default function GetAvgRating(ratingArr){
        const totalReviewCount = ratingArr?.reduce((acc, curr) => {
                acc += curr.rating
                return acc
        }, 0)
        const multiplier = Math.pow(10, 1)
        const avgReviewCount = Math.round(totalReviewCount / ratingArr?.length)
        return avgReviewCount
}