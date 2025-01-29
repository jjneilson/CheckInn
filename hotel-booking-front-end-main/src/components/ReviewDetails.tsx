import ReviewItem from "./ReviewItem";

interface ReviewDetailsProps{
  reviewId: number;
  title:string;
  description:string;
  rating: number;
  userFN: string;
  userLN: string;
  userId: any;
}

export default function ReviewDetails({reviewId,title,description,rating,userFN, userLN, userId}:ReviewDetailsProps) {
  
  // console.log(`firstname ${userFN}`);

  return (
    <div className="flex h-full flex-col xxs:hidden">
      <h1 className="font-bold xxs:hidden">Most Recent Review</h1>
      <div className=""><ReviewItem profile={false} reviewId={reviewId} title={title} description={description} rating={rating} userFN={userFN} userLN={userLN} show={true} userId={userId} /></div>
    </div>
  );
}