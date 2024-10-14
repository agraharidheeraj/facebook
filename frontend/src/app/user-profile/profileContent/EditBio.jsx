import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createOrUpdateUserBio } from '@/service/user.service'
import { Save } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const EditBio = ({isOpen,onClose,initialData,id,fetchProfile}) => {
  const {register,handleSubmit,reset,formState:{isSubmitting}} = useForm({
    defaultValues:initialData,
  })
  const handleEditBio = async(data) =>{
        try {
           await createOrUpdateUserBio(id,data)
           toast.success('user bio updated successfully')
           await fetchProfile()
           onClose();
        } catch (error) {
           console.log('error creating or updating user bio', error)
        }
  }
  return (
     <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className = "sm:max-w-[425px]">
           <DialogHeader>
            Edit Bio
           </DialogHeader>
           <form onSubmit={handleSubmit(handleEditBio)}>
             <div className='grid gap-4 py-4'>
               <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <Textarea
                 id='bioText'
                 className="col-span-3"
                 {...register("bioText")}
                />
               </div>

               <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="liveIn" className="text-right">Live In</Label>
                <Input
                 id='liveIn'
                 className="col-span-3"
                 {...register("liveIn")}
                />
               </div>
               <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="relationship" className="text-right">Relationship</Label>
                <Input
                 id='relationship'
                 {...register("relationship")}
                 className="col-span-3"
                
                />
               </div>

               <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="workPlace" className="text-right">Work Place</Label>
                <Input
                 id='workplace'
                 {...register("workplace")}
                 className="col-span-3"
                
                />
               </div>

               <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="education" className="text-right">Education</Label>
                <Input
                 id='education'
                 {...register("education")}
                 className="col-span-3"
                
                />
               </div>


               <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input
                 id='phone'
                 {...register("phone")}
                 className="col-span-3"
                
                />
               </div>


               <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="hometown" className="text-right">Hometown</Label>
                <Input
                 id='hometown'
                 {...register("hometown")}
                 className="col-span-3"
                
                />
               </div>
             </div>
             <DialogFooter>
             <Button type="submit" disabled={isSubmitting} >
              <Save className="w-4 h-4 mr-2"/>  {isSubmitting ? "Saving..." : "save chnages"}
                </Button>
             </DialogFooter>
           </form>
     </DialogContent>
     </Dialog>
  )
}

export default EditBio