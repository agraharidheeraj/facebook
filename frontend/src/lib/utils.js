import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import {formatDistanceToNow, parseISO} from 'date-fns'

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formateDate  =(date) =>{
  return formatDistanceToNow(parseISO(date),{addSuffix:true})
}


export const  formatDateInDDMMYYY = (date) =>{
  return new Date(date).toLocaleDateString('en-GB')
}