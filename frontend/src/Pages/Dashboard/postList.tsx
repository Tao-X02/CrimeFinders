import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../App/stores/store';
import PostListItem from './postListItem';

export default observer(function PostsList() {
    const { postStore } = useStore();
    const { postsByDate } = postStore;
    
    return (
        <div style={{ marginBottom: '3%' }}>
            {postsByDate.map(post => (
                <PostListItem key={post.id} post={post} />
            ))}
        </div>
    )
})