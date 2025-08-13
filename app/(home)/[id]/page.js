import { User } from "@/models/schemas/userSchema.js";
import { getLoggedInUser } from "@/models/queries/user.js";
import FollowButton from "@/components/followButton";
import { auth } from "@/auth.js";
export default async function UserProfilePage({ params }) {
  const { id } = await params;
  const session = await auth();

  const user = await User.findById({ _id: id }).lean();
  const currentUser = await getLoggedInUser(session?.user?.email);

  const isFollowing = currentUser[0]?.following?.some(
    (id) => id.toString() === user._id.toString()
  );

  const users = await User.find({ _id: id })
    .populate("followers", "username email") // followers এর username, email নিবে
    .populate("following", "username email") // following এর username, email নিবে
    .exec();
  console.log(users[0]?.followers);
  return (
    <div className="p-4">
      <h1 className="text-2xl">{user.name}</h1>
      <p>{user.email}</p>
      <p>{user?.username}</p>

      {currentUser && (
        <FollowButton
          targetUserId={user._id.toString()}
          isFollowing={isFollowing}
        />
      )}
    </div>
  );
}
