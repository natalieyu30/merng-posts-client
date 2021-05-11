import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { Icon, Label, Button } from 'semantic-ui-react';

import MyPopup from '../utils/MyPopup';

const LikeButton = ({ user, post: { id, likeCount, likes}}) => {
  const [liked, setLiked] = useState(false)
  
  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id}
  })

  const likeButton = user ?  (
    liked? (
      <Button color='pink'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button basic color='pink'>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button as={Link} to='/login' basic color='pink'>
        <Icon name='heart' />
      </Button>
  )

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      <MyPopup content={liked? 'Unlike post' : 'Like post'} style>{likeButton}</MyPopup>
      <Label basic color='pink' pointing='left'>{likeCount}</Label>
    </Button>
  )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes{
        id username
      }
      likeCount
    }
  }
`

export default LikeButton
