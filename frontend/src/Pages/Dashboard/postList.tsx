import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../App/stores/store';
import PostListItem from './postListItem';

// Define props interface
interface Props {
    name: string
}

export default observer(function PostsList({ name }: Props) {
    const { postStore } = useStore();
    const { postsByDate, filter } = postStore;
    
    return (
        <div style={{ marginBottom: '3%' }}>
            {postsByDate.map(post => {
                switch(filter) {
                    case 'default':
                        return <PostListItem key={post.id} name={name} post={post} />
                        break;
                    case 'my tips':
                        if (name === post.posterName) return <PostListItem key={post.id} name={name} post={post} />
                        break;
                    case 'search':
                        if (post.members !== undefined && post.members.filter(member => member.userName === name).length > 0) {
                            return <PostListItem key={post.id} name={name} post={post} />
                        }
                        break;
                }
                return null;
            })}
        </div>
    )
})