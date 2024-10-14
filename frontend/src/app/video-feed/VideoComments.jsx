import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { formateDate } from '@/lib/utils';

const VideoComments = ({comments}) => {
  return (
     <>
     {comments?.map((comment)=>(
         <div key={comment?._id} className='flex items-start space-x-2 mb-4'>
             <Avatar className="h-8 w-8 ">
             {comment?.user?.profilePicture ? (
                <AvatarImage
                  src={comment?.user?.profilePicture}
                  alt={comment?.user?.username}
                />
              ) : (
                <AvatarFallback className="dark:bg-gray-400">
                  {comment?.user?.username
                    ?.split(" ")
                    .map((name) => name[0])
                    .join(" ")}
                </AvatarFallback>
              )}
  
            </Avatar>
            <div className='flex-1'>
                  <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-2'>
                    <p className='font-semibold text-sm'>{comment?.user?.username}</p>
                    <p className='text-sm'>{comment?.text}</p>
                    
                  </div>
                  <div className='flex items-center mt-1 text-xs text-gray-400'>
                    <Button variant="ghost" size="sm">Like</Button>
                    <Button variant="ghost" size="sm">Reply</Button>
                    <span>{formateDate( comment.createdAt)}</span>
                  </div>
            </div>
         </div>
     ))}
     </>
  )
}

export default VideoComments