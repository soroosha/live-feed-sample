import React, { useState } from "react";
import { Layout, Switch, Button } from 'antd';

import { ThemeContext } from '../../App'
import CreatePostModal from "../CreatePostModal"

import styles from './styles.module.scss'

function NavigationBar(){
  const [createModalVisible, setCreateModalVisible] = useState(false)

  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
      <Layout.Header className={styles.navigationBar+' '+styles[theme]}>
        <div>
          lfs.
          <Button
            className={styles.createBtn}
            size="small"
            type="primary"
            onClick={()=> setCreateModalVisible(true)}
          >
            Create Post
          </Button>
          <Switch 
            className={styles.switch}
            checkedChildren='Light'
            unCheckedChildren='Dark'
            onChange={toggleTheme}
          />
          <CreatePostModal visible={createModalVisible}/>
        </div>
      </Layout.Header>
      )}
    </ThemeContext.Consumer>
  )
}

export default NavigationBar;