import React from 'react'

import { useUserStore } from '../../providers/UserProvider'

interface UserDetailModal {
  visible: boolean
  onClose: () => void
}

const modalLayout = {
  position: 'absolute' as const,
  top: 0,
  width: '100%',
  height: '100%',
}

const mask = {
  width: '100%',
  height: '100%',
  background: 'rgb(51 51 51 / 36%)',
}

const content = {
  position: 'fixed' as const,
  background: '#fff',
  borderRadius: '8px',
  zIndex: 3,
  width: '500px',
  height: '304px',
  top: 'calc(50% - 152px)',
  left: 'calc(50% - 250px)',
  overflow: 'auto',
}

const img = {
  width: '100px',
  height: '100px',
  borderRadius: '100%',
  margin: '15px 0',
}

const item = {
  marginBottom: '10px',
}

const button = {
  width: '120px',
  height: '30px',
  border: '0',
  borderRadius: '8px',
  margin: '17px',
}

export const UserDetailModal: React.FC<UserDetailModal> = ({ visible, onClose }) => {
  const {
    user: {
      state: { userDetail },
    },
  } = useUserStore()
  const { data: response } = userDetail

  if (!visible || userDetail.isLoading) {
    return <></>
  }
  return (
    <div style={modalLayout}>
      <div style={mask} onClick={onClose}></div>
      <div style={content}>
        <img style={img} src={response.avatar_url} />
        <div style={item}>name: {response.name.toString()}</div>
        <div style={item}>bio:{response.bio}</div>
        <div style={item}>login: {response.login}</div>
        <div style={item}>site_admin: {response.site_admin.toString()}</div>
        <div style={item}>location: {response.location}</div>
        <div style={item}>blog: {response.blog}</div>
        <button style={button} onClick={onClose}>
          close
        </button>
      </div>
    </div>
  )
}
