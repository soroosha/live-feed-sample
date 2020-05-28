import React, {useState, useEffect} from "react"
import { Modal } from "antd"

function CreatePostModal(props){
  const [visible, setVisible] = useState(props.visible)

  useEffect(()=>{
    setVisible(props.visible)
  }, [props.visible])

  return (
    <Modal
      title="Create New Post"
      visible={visible}
      onCancel={()=>setVisible(false)}
    >
      enter post here...
    </Modal>
  )
}

export default CreatePostModal