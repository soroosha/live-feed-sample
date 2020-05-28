
import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import settings from "../../constants/settings"
import { apiService } from "../../utils/apiService"

import Card from './Card'
import Hero from './Hero'

import styles from "./styles.module.scss"

let data = []
const isItemLoaded = index => !!data[index];
const loadMoreItems = (startIndex, stopIndex) => {
  // TODO - fetch older items from API
  console.log('load more!')
};

let retryWebsocketTimeout

const Posts = () => {
  const [ wsClient, setWsClient ] = useState(null)
  const [ rowCount, setRowCount ] = useState(data.length)

  useEffect(()=>{
    // data = []
    apiService.get('posts/').then(response => {
      console.log(response.data)
      data = response.data
      setRowCount(response.data.length)
    })
  }, [])

  useEffect(()=>{
    if(!wsClient){
      setWsClient(new WebSocket(`${settings.BACKEND.WS_ROOT_URL}/ws/feed/post/`))
    }else{
      wsClient.onopen = () => {
        console.log('connected')
      }
      wsClient.onmessage = (message) => {
        let new_post = JSON.parse(message.data).post
        console.log('new post', new_post)
        data.splice(0,0, new_post)
        setRowCount(data.length)
      }

      const retryWebsocket = ()=>{
        if(wsClient){
          clearTimeout(retryWebsocketTimeout)
          retryWebsocketTimeout = setTimeout(()=>{
            setWsClient(null)
          },3000)
        }
      }
      wsClient.onclose = () =>{
        retryWebsocket()
      }
      wsClient.onerror = (error) => {
        console.error('web socket error. retrying...',error)
        retryWebsocket()
      }
    }
  }, [wsClient])

  
  return (
    <div>
      <Hero/>
      <div className={styles.feed}>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={1000}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={750}
              itemCount={rowCount}
              itemSize={180}
              onItemsRendered={onItemsRendered}
              ref={ref}
              itemData={data}
            >
              {Card}
            </List>
          )}
        </InfiniteLoader>
      </div>
    </div>
  )
}

export default Posts