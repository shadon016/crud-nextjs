import { toggleFollow } from "@/actions";

export default async function FollowButton({ targetUserId, isFollowing }) {
  console.log(targetUserId);
  const modifiedAction = await toggleFollow.bind(null, targetUserId);
  return (
    <form action={modifiedAction}>
      <button
        type="submit"
        className={`px-4 py-2 rounded text-white ${
          isFollowing
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </form>
  );
}
