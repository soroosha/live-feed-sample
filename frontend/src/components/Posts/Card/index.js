
import React from "react";
import { Skeleton, Card, Tag } from 'antd';

import { ThemeContext } from '../../../App'

import styles from "./styles.module.scss"

const { Meta } = Card

const TYPE_COLORS = {
  'TECHNOLOGY': '#2db7f5',
  'BIOLOGY': '#87d068',
  'FINANCE': '#8238fa'
}

class PostCard extends React.PureComponent {
  render(){
    const {
      index,
      style,
      data
    } = this.props

    const {
      id,
      isLoading,
      title,
      brief,
      type
    } = data[index]

    return (
      <ThemeContext.Consumer>
        {({theme})=>(
          <Card key={`post-${id}`} style={style} className={styles.card+' '+styles[theme]} title={
            isLoading ? null
            :
            (
              <>
                {title}
                <Tag className={styles.tag} color={TYPE_COLORS[type]}>{type}</Tag>
              </>
            )
          }>
            {
            isLoading? (
              <Skeleton loading={true} active>
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Skeleton>
            ) 
            : 
              brief
            }
          </Card>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default PostCard