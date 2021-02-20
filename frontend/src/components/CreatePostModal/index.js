import React from "react"
import { Modal } from "antd"

function CreatePostModal(props){
  return (
    <Modal
      title="Create New Post"
      visible={props.visible || false}
      onCancel={props.onCancel}
    >
      enter post here...
    </Modal>
  )
}

export default CreatePostModal