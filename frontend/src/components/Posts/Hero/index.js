import React from "react";

import { ThemeContext } from '../../../App'

import styles from './styles.module.scss'

function PostsHero(){
  return (
    <ThemeContext.Consumer>
    {({theme})=>(
      <div className={styles.hero+' '+styles[theme]}>
        <div>
          <h2>Hello, we’re lfs.</h2>
        </div>
      </div>
    )}
    </ThemeContext.Consumer>
  )
}

export default PostsHero;