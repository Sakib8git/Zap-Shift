import { FaQuoteLeft } from "react-icons/fa";

const ReviewsCard = ({ rev }) => {
  const { userName, user_photoURL, review:comment } = rev;
  return (
    <div className="bg-base-100 shadow-xl rounded-lg p-6 max-w-xl mx-auto text-center">
      {/* Quote Icon */}
      <div className="text-4xl text-primary mb-4">
        <FaQuoteLeft />
      </div>

      {/* Quote Text */}
      <p className="text-gray-700 text-lg italic mb-6">{comment}</p>

      {/* Divider */}
      <div className="border-t border-dotted border-gray-300 my-6"></div>

      {/* User Image + Info */}
      <div className="flex flex-col items-center">
        <img
          src={user_photoURL}
          alt="Awlad Hossin"
          className="w-16 h-16 rounded-full object-cover mb-2"
        />
        <h4 className="text-md font-semibold text-gray-800">{userName}</h4>
        <p className="text-sm text-gray-500">Senior Product Designer</p>
      </div>
    </div>
  );
};

export default ReviewsCard;
