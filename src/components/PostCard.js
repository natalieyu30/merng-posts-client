import React, { useContext } from 'react'
import { Button, Card, Icon, Image, Label, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../utils/MyPopup';

const PostCard = ({post}) => {
  const { body, createdAt, id, username, likeCount, commentCount, likes, comments } = post;
  const { user } = useContext(AuthContext);

  // const likePost = () => {
  //   console.log('Like post')
  // }


  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{id, likes, likeCount}} />
        <MyPopup content="Comment on post" style>
          <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
            <Button basic color='purple'>
              <Icon name='comment' />
            </Button>
            <Label basic color='purple' pointing='left'>{commentCount}</Label>
          </Button>
        </MyPopup>
        { user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  )
}

export default PostCard
