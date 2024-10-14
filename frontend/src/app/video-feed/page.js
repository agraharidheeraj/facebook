"use client"
import React, { useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import VideoCard from './VideoCard'
import { usePostStore } from '@/store/usePostStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Page = () => {
  const [likePosts,setLikePosts] = useState(new Set());
  const {posts,fetchPost,handleLikePost,handleCommentPost,handleSharePost} = usePostStore();
 const router = useRouter()
  useEffect(() =>{
    fetchPost()
  },[fetchPost])

  useEffect(() =>{
    const saveLikes = localStorage.getItem('likePosts');
    if(saveLikes){
      setLikePosts(new Set(JSON.parse(saveLikes)));
    }
  },[]);


  const handleLike = async(postId)=>{
    const updatedLikePost = new Set(likePosts);
    if(updatedLikePost.has(postId)){
      updatedLikePost.delete(postId);
      toast.error('post disliked successfully')
    }else {
      updatedLikePost.add(postId)
      toast.success('post like successfully')
    }
    setLikePosts(updatedLikePost);
    localStorage.setItem('likePosts',JSON.stringify(Array.from(updatedLikePost)))

    try {
      await handleLikePost(postId);
      await fetchPost();
    } catch (error) {
       console.error(error);
       toast.error('failed to like or unlike the post')
    }
  }
  
  const handleBack = () =>{
     router.push('/')
  }
  const videoPost = posts?.filter(post => post.mediaType === 'video');

  return (
      <div className='mt-12 min-h-screen'>
         <LeftSideBar/>
         <main className='ml-0 md:ml-64 p-6'>

            <Button variant="ghost" className="mb-4" onClick ={handleBack}>
                 <ChevronLeft className='mr-2 h-4 w-4'/>
                 Back to feed
            </Button>
            <div className='max-w-3xl mx-auto'>
                   {videoPost.map((post) => (
                      <VideoCard
                      key={post?._id}
                       post={post}
                       isLiked = {likePosts.has(post?._id)}
                       onLike={() => handleLike(post?._id)}
                       onComment={async(comment) => {
                         await handleCommentPost(post?._id,comment.text);
                         await fetchPost();
                       }}
                       onShare = {async() =>{
                       await handleSharePost(post?._id)
                       await fetchPost();
                       }}
                       
                      />
                   ))}
            </div>

         </main>
      </div>
  )
}

export default Page