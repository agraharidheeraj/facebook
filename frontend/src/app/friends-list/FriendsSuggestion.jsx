import { AnimatePresence } from "framer-motion";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { UserMinus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const FriendsSuggestion = ({friend ,onAction}) => {
  const userPlaceholder = friend?.username
  ?.split(" ")
  .map((name) => name[0])
  .join("");
  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white mb-4 dark:bg-gray-800 p-4 shadow rounded-lg"
    >
      <Avatar className="h-32 w-32 rounded mx-auto mb-4">
      {friend?.profilePicture ? (
            <AvatarImage src={friend?.profilePicture} alt={friend?.username} />
          ) : (
            <AvatarFallback>{userPlaceholder}</AvatarFallback>
          )}
          </Avatar>
      <h3 className="text-lg font-semibold text-center mb-4 ">
        {friend?.username}
      </h3>

      <div className="flex flex-col justify-between">
        <Button className="bg-blue-500 " size="lg" onClick={() => onAction("confirm",friend?._id)}>
          <UserPlus className="mr-2 h-4 w-4" /> Add Friend
        </Button>
      </div>
    </motion.div>
  </AnimatePresence>
  )
}

export default FriendsSuggestion