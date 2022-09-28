import { Modal } from "antd"
import { TaskContext } from "../../context/task"
import { useContext, useState, useEffect } from "react"

import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateTask(){
  const [task, setTask] = useContext(TaskContext)
  const [content, setContent] = useState("")

  useEffect(() => {
    setContent(task?.selected?.task)
  }, [task])

  const handleUpdate = async (e) => {
    try{
      e.preventDefault();
      
      const {data} = await axios.put(`/task/${task?.selected?._id}`, {
        task: content
      })
      
      const newList = task?.tasks.map((t) => {
        if(t._id === data._id) return data
        else return t
      })

      setTask((prev) => ({...prev, tasks: newList, selected: null}))
      toast.success('Task updated')
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (e) => {
    try{
      e.preventDefault();
      
      const {data} = await axios.delete(`/task/${task?.selected?._id}`)
      
      setTask((prev) => ({...prev, tasks: prev?.tasks.filter((t) => t._id !== data._id), selected: null}))
      toast.error('Task removed')
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <Modal
        centered
        title="Update Task" 
        open={task?.selected !== null}
        footer={null}
        onCancel={() => setTask({...task, selected: null})}
      >
        <form className="d-flex justify-content" >
        <textarea 
          maxLength={160}
          className="form-control m-1"
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Write something"
        />
        <button className="btn btn-primary m-1" type="submit" onClick={handleUpdate}>Update</button>
        <button className="btn btn-danger m-1" type="submit" onClick={handleDelete}>Delete</button>
      </form>
      </Modal>
    </>
  )
}