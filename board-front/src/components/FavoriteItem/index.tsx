import React from 'react'
import './style.css'
import { FavoriteListItem } from 'types/interface'
import DefaultProfileImage from 'assets/images/default-profile-image.jpg'

interface Props {
    favoriteListItem: FavoriteListItem;
}
//              component: Favorite List Item 컴포넌트              //
export default function FavoriteItem({  favoriteListItem  }: Props) {
  
  //            properties          //
  const { nickname, profileImage } = favoriteListItem;

  //            render: Favorite List Item 렌더링           //
  return (
    <div className='favorite-list-item'>
        <div className='favorite-list-item-profile-box'>
            <div className='favorite-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : DefaultProfileImage}`}}></div>
        </div>
        <div className='favorite-list-item-nickname'>{nickname}</div>
    </div>
  )
}
