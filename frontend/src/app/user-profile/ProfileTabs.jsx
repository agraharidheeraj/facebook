'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import ProfileDetails from './ProfileDetails'

const ProfileTabs = ({  id,
  profileData,
  isOwner,
  setProfileData,
  fetchProfile,
}) => {
    const [activeTab,setActiveTab]= useState("posts")
  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
    <Tabs defaultValue='posts' className='w-full' onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>
        <div className='mt-6'>
           <ProfileDetails
            activeTab={activeTab}
            profileData={profileData}
            id={id}
            isOwner={isOwner}
            setProfileData={setProfileData}
            fetchProfile={fetchProfile}
           />
        </div>
    </Tabs>
    </div>
  )
}

export default ProfileTabs