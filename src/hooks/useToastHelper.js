import { useState, useEffect, useRef } from "react"

const SUCCESS = "success"
const FAILURE = "failure"

const useToastHelper = () => {
  const [toast, setToast] = useState([])
  const intervalRef = useRef(null)

  // Set up an interval to remove the first toast every minute
  useEffect(() => {
    // Clear any existing intervals when the component using this hook mounts
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Set a new interval to remove the first toast every minute
    intervalRef.current = setInterval(() => { 
      setToast(prev => {
        if (prev.length > 0) {
          return prev.slice(1) // Remove the first toast
        }
        return prev
      })
    }, 15000) // 60000 ms = 1 minute

    // Clean up the interval when the component using this hook unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const showSuccessToast = message => {
    console.log("Show successToast");
    // Check if message is already in the array
    let isExisting = toast?.some(item => item.message === message)
    if (isExisting) return
    
    // setToast(prev => [
    //   ...prev,
    //   {
    //     type: SUCCESS,
    //     message,
    //     title: "Success",
    //   },
    // ])

    setToast(prev => {
      const newToast = [...prev, { type: SUCCESS, message, title: "Success", }];
      console.log('Updated toast state:', newToast);
      return newToast;
    });
  }

  const showFailureToast = message => {
    // Uncomment if you want to prevent duplicate failure messages
    // let isExisting = toast?.some(item => item.message === message)
    // if (isExisting) return
    
    setToast(prev => [
      ...prev,
      {
        type: FAILURE,
        message,
        title: "Failure",
      },
    ])
  }

  const clearAllToasts = () => {
    setToast([])
  }

  const removeToast = index => {
    setToast(prev => prev.filter((_, i) => i !== index))
  }

  return { 
    toast, 
    showSuccessToast, 
    showFailureToast, 
    clearAllToasts, 
    removeToast 
  }
}

export default useToastHelper