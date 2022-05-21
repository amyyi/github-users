import React, { useEffect, useState } from 'react'

import { useUserStore } from '../../providers/UserProvider'
import { getUserDetail, getUserList } from '../../stores/user/dispatchers'
import { UserDetailModal } from '../UserDetailModal/UserDetailModal'

const PER_PAGE = 20

const layout = {
  position: 'relative' as const,
}

const title = {
  padding: '15px',
  fontSize: '18px',
  color: '#467fc7',
}

const userContainer = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px 20px',
  lineHeight: '23px',
  color: '#333333',
}

const userRight = {
  marginLeft: '10px',
  textAlign: 'left' as const,
}

const avatar = {
  width: '80px',
  height: '80px',
  borderRadius: '100%',
}

const pageContainer = {
  display: 'flex',
  justifyContent: 'center',
  margin: '20px 0',
}

const pageButton = {
  width: '24px',
  height: '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#5c5454',
  borderRadius: '8px',
  margin: '0 5px',
  cursor: 'pointer',
}

const UserList: React.FC = () => {
  const {
    user: {
      state: { userList },
      dispatch: userDispatch,
    },
  } = useUserStore()

  const {
    data: { data: response },
  } = userList

  const [currentPage, setCurrentPage] = useState(0)
  const [visibleModal, setVisibleModal] = useState(false)

  useEffect(() => {
    userDispatch(
      getUserList({
        since: currentPage * PER_PAGE,
        per_page: PER_PAGE,
      }),
    )
  }, [currentPage])

  const openUserDetailModal = (name: string) => {
    userDispatch(getUserDetail(name))
  }

  return (
    <div style={layout}>
      <div style={title}>UserList</div>
      {!!response &&
        response.map((data, idx) => {
          return (
            <div
              style={{ ...userContainer, background: idx % 2 ? '#fff' : '#dfe6e7' }}
              key={data.id}
              onClick={() => {
                openUserDetailModal(data.login)
                setVisibleModal(true)
              }}
            >
              <img style={avatar} src={data.avatar_url} />
              <div style={userRight}>
                <div>login:{data.login}</div>
                <div>site_admin: {data.site_admin.toString()}</div>
              </div>
            </div>
          )
        })}
      <div style={pageContainer}>
        {[0, 1, 2, 3, 4].map((item) => {
          return (
            <div
              style={{ ...pageButton, background: item === currentPage ? '#a6d92a' : '#dce9f5' }}
              key={item}
              onClick={() => setCurrentPage(item)}
            >
              {item + 1}
            </div>
          )
        })}
      </div>
      {visibleModal && (
        <UserDetailModal visible={visibleModal} onClose={() => setVisibleModal(false)} />
      )}
    </div>
  )
}
export default UserList
