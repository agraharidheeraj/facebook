const User = require("../model/User");
const response = require("../utils/responceHandler");



//follow user
const followUser =  async(req,res) =>{
    const {userIdToFollow} = req.body;
    const userId = req?.user?.userId;
    //prevent the user to follow itself 
    if(userId === userIdToFollow){
        return response(res,400,'You are not allowed to follow yourself');
    }
    try {
        const userToFollow = await User.findById(userIdToFollow)
        const currentUser = await User.findById(userId);

        //check both user is exit in database or not
        if(!userToFollow || !currentUser){
            return response(res,404,'User not found')
        }

        //check if current user is already following
        if(currentUser.following.includes(userIdToFollow)){
            return response(res,404, 'User already following this user');
        }

        //add user to the current user in following list
        currentUser.following.push(userIdToFollow);

        //add current user id to the user to follow ke follower vale list mein 
        userToFollow.followers.push(currentUser)

        //update the follower and following count
        currentUser.followingCount +=1;
        userToFollow.followerCount +=1;

        //save the update current user aur user to follow
        await currentUser.save()
        await userToFollow.save()
        
        return response(res,200,'User followed successfully')

    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}




//unfollow user
const unfollowUser =  async(req,res) =>{
    const {userIdToUnFollow} = req.body;
    const userId = req?.user?.userId;

    //prevent the user to follow itself 
    if(userId === userIdToUnFollow){
        return response(res,400,'You are not allowed to unfollow yourself');
    }
    try {
        const userToUnFollow = await User.findById(userIdToUnFollow)
        const currentUser = await User.findById(userId);

        //check both user is exit in database or not
        if(!userToUnFollow || !currentUser){
            return response(res,404,'User not found')
        }

        //check if current user is already following
        if(!currentUser.following.includes(userIdToUnFollow)){
            return response(res,404, 'You are not following this user');
        }

        //remove the user from the following list and update the follower count
        currentUser.following = currentUser.following.filter(id => id.toString() !==userIdToUnFollow)
        userToUnFollow.followers = userToUnFollow.following.filter(id => id.toString() !==userId)

        //update the follower and following count
        currentUser.followingCount -=1;
        userToUnFollow.followerCount -=1;

        //save the update current user aur user to follow
        await currentUser.save()
        await userToUnFollow.save()
        
        return response(res,200,'User unfollowed successfully')

    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}

const deleteUserFromRequest = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;
        const {requestSenderId} = req.body;

        const requestSender = await User.findById(requestSenderId)
        const loggedInUser = await User.findById(loggedInUserId);

        //check both user is exit in database or not
        if(!requestSender || !loggedInUser){
            return response(res,404,'User not found')
        }

        //check if the request sender is following to loggedin user or not
        const isRequestSend = requestSender.following.includes(loggedInUserId)

        if(!isRequestSend){
            return response(res, 404, 'No request found for this user')
        }

        //remove the loggedIn userId from the request sender following list
        requestSender.following = requestSender.following.filter(user => user.toString() !== loggedInUserId)

      //remove the sender id from the loggedIn user followers list
      loggedInUser.followers = loggedInUser.followers.filter(user => user.toString() !== requestSenderId)

      //update follower and following counts
      loggedInUser.followerCount = loggedInUser.followers.length;
      requestSender.followingCount= requestSender.following.length
      

      //save both users
      await loggedInUser.save()
      await requestSender.save()

      return response(res,200,`Friends request from ${requestSender.username} deleted successfully `)

    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}


//get all frined request fro user
const getAllFriendsRequest = async (req, res) => {
    try {
         const loggedInUserId = req.user.userId;

         //find the logged in user and retrive their followers and following

         const loggedInUser = await User.findById(loggedInUserId).select('followers following')
         if(!loggedInUser){
            return response(res, 404, 'User not found')
         }

         //find user who follow the logged in user but are not followed back
          const userToFollowBack = await User.find({
            _id:{
                $in:loggedInUser.followers, //user who follow the logged in user
                $nin: loggedInUser.following // exclued users the logged in user already follow back
            }
          }).select('username profilePicture email followerCount');

          return response(res,200, 'user to follow back get successfully',userToFollowBack)

    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}


//get all frined request fro user
const getAllUserForRequest = async (req, res) => {
    try {
         const loggedInUserId = req.user.userId;

         //find the logged in user and retrive their followers and following

         const loggedInUser = await User.findById(loggedInUserId).select('followers following')
         if(!loggedInUser){
            return response(res, 404, 'User not found')
         }

         //find user who  neither followers not following of the login user
          const userForFriendRequest = await User.find({
            _id:{
                $ne:loggedInUser, //user who follow the logged in user
                $nin: [...loggedInUser.following, ...loggedInUser.followers]// exclued both
            }
          }).select('username profilePicture email followerCount');

          return response(res,200, 'user for frined request get successfully ',userForFriendRequest)

    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}

//api for get mutual friends
const getAllMutualFriends = async (req, res) => {
    try {
        const ProfileUserId = req.params.userId;

        //find the logged in user and retrive their followers and following
        const loggedInUser = await User.findById(ProfileUserId)
        .select('followers following')
        .populate('following', 'username profilePicture email followerCount followingCount')
        .populate('followers','username profilePicture email followerCount followingCount')

        if(!loggedInUser){
           return response(res, 404, 'User not found')
        }

        //create a set of user id that logged in user is following
        const followingUserId = new Set(loggedInUser.following.map(user => user._id.toString()))

        //filter followers to get only those who are also following you and followed by loggin user 
        const mutualFriends = loggedInUser.followers.filter(follower => 
            followingUserId.has(follower._id.toString())
        )

        return response(res,200, 'Mutual friends get successfully', mutualFriends)

   } catch (error) {
       return response(res, 500, 'Internal server error', error.message)
   }
}


//get all users so that you can search for profile 
const getAllUser = async(req, res) =>{
    try {
        const users = await User.find().select('username profilePicture email followerCount')
         return response(res,200, 'users get successfully',users)
   } catch (error) {
       return response(res, 500, 'Internal server error', error.message)
   }
}

//check if user is authenticated or not 
const checkUserAuth = async(req, res) =>{
     try {
        const userId = req?.user?.userId;
        if(!userId) return response(res,404, 'unauthenticated ! please login before access the data')

        //fetch the user details and excude sensitive information
        const user = await User.findById(userId).select('-password');

        if(!user) return response(res,403, 'User not found')

        return response(res,201, 'user retrived and allow to use facebook', user)
     } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
     }
}


const getUserProfile = async(req, res) =>{
    try {
        const {userId} = req.params;
        const loggedInUserId = req?.user?.userId

        //fetch the user details and excude sensitive information
        const userProfile = await User.findById(userId).select('-password').populate('bio').exec();

        if(!userProfile) return response(res,403, 'User not found')

        const isOwner = loggedInUserId === userId;

        return response(res,201, 'user profile get successfully', {profile:userProfile,isOwner})
     } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
     }
}



module.exports= {
    followUser,
    unfollowUser,
    deleteUserFromRequest,
    getAllFriendsRequest,
    getAllUserForRequest,
    getAllMutualFriends,
    getAllUser,
    checkUserAuth,
    getUserProfile
}